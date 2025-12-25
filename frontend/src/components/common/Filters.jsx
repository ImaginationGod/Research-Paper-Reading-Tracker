import { usePapers } from "../../context/PapersContext";
import { useState } from "react";
import {
    DOMAINS,
    READING_STAGES,
    IMPACT_SCORES,
} from "../../utils/constants";
import { MenuItem, TextField, Button } from "@mui/material";

export default function Filters() {
    const { fetchPapers } = usePapers();

    const [filters, setFilters] = useState({
        domain: "",
        stage: "",
        impact: "",
        dateRange: "",
    });

    function handleChange(e) {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    function applyFilters() {
        fetchPapers(filters);
    }

    return (
        <div className="grid md:grid-cols-5 gap-4">
            <TextField select name="domain" label="Domain" value={filters.domain} onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                {DOMAINS.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
            </TextField>

            <TextField select name="stage" label="Stage" value={filters.stage} onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                {READING_STAGES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
            </TextField>

            <TextField select name="impact" label="Impact" value={filters.impact} onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                {IMPACT_SCORES.map((i) => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
            </TextField>

            <TextField select name="dateRange" label="Date Added" value={filters.dateRange} onChange={handleChange}>
                <MenuItem value="">All time</MenuItem>
                <MenuItem value="week">This week</MenuItem>
                <MenuItem value="month">This month</MenuItem>
                <MenuItem value="3months">Last 3 months</MenuItem>
            </TextField>

            {/* <Button variant="outlined" onClick={applyFilters}> */}
            <Button variant="contained" onClick={applyFilters}>
                Apply
            </Button>
        </div>
    );
}
