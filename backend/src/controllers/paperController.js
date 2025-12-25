import Paper from "../models/Paper.js";

// CREATE
export async function createPaper(req, res, next) {
    try {
        const paper = await Paper.create(req.body);
        res.status(201).json(paper);
    } catch (err) {
        next(err);
    }
}

// GET (with filters)
export async function getPapers(req, res, next) {
    try {
        const { domain, stage, impact, dateRange } = req.query;
        const query = {};

        if (domain) query.domain = domain;
        if (stage) query.stage = stage;
        if (impact) query.impact = impact;

        // date filters
        if (dateRange && dateRange !== "all") {
            const now = new Date();
            let startDate;

            if (dateRange === "week") {
                startDate = new Date(now.setDate(now.getDate() - 7));
            } else if (dateRange === "month") {
                startDate = new Date(now.setMonth(now.getMonth() - 1));
            } else if (dateRange === "3months") {
                startDate = new Date(now.setMonth(now.getMonth() - 3));
            }

            if (startDate) query.dateAdded = { $gte: startDate };
        }

        const papers = await Paper.find(query).sort({ createdAt: -1 });
        res.json(papers);
    } catch (err) {
        next(err);
    }
}

// ANALYTICS
export async function getAnalytics(req, res, next) {
    try {
        // funnel: count by reading stage
        const stages = await Paper.aggregate([
            { $group: { _id: "$stage", count: { $sum: 1 } } },
        ]);

        // scatter: group by impact + citations
        const scatter = await Paper.find({}, { impact: 1, citations: 1 });

        // stacked bar: domain + stage
        const stacked = await Paper.aggregate([
            { $group: { _id: { domain: "$domain", stage: "$stage" }, count: { $sum: 1 } } },
        ]);

        // summary
        const total = await Paper.countDocuments();
        const fullyRead = await Paper.countDocuments({ stage: "Fully Read" });

        const avgCitations = await Paper.aggregate([
            { $group: { _id: "$domain", avg: { $avg: "$citations" } } },
        ]);

        res.json({
            stages,
            scatter,
            stacked,
            summary: {
                total,
                fullyRead,
                completionRate: total ? (fullyRead / total).toFixed(2) : 0,
                avgCitations,
            },
        });
    } catch (err) {
        next(err);
    }
}
