import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../services/analytics";
import { Typography, useMediaQuery } from "@mui/material";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const IMPACT_MAP = {
    "Low Impact": 1,
    "Medium Impact": 2,
    "High Impact": 3,
};

const REVERSE_MAP = {
    1: "Low Impact",
    2: "Medium Impact",
    3: "High Impact",
};

export default function ScatterPlot() {
    const [data, setData] = useState([]);
    const isMobile = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
        fetchAnalytics().then((res) => {
            // console.log(res.scatter);
            setData(
                res.scatter.map((p) => ({
                    citations: Number(p.citations),
                    impactValue: IMPACT_MAP[p.impact],
                }))
            );
        });
    }, []);

    return (
        <>
            <Typography variant="h6" className="mb-3">
                Citations vs Impact
            </Typography>

            <ResponsiveContainer
                key={isMobile ? "m" : "d"}
                width="100%"
                height={isMobile ? 260 : 330}
            >
                <ScatterChart margin={{ top: 20, right: 10, left: 0, bottom: 25 }}>
                    <XAxis
                        type="number"
                        dataKey="citations"
                        name="Citations"
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                    />

                    <YAxis
                        type="number"
                        dataKey="impactValue"
                        domain={[0.5, 3.5]}
                        ticks={[1, 2, 3]}
                        tickFormatter={(v) => REVERSE_MAP[v]}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                    />

                    <Tooltip
                        formatter={(value, name) => {
                            if (name === "citations") return [`${value}`, "Citations"];
                            if (name === "impactValue") return [REVERSE_MAP[value], "Impact"];
                            return value;
                        }}
                    />

                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

                    <Scatter
                        data={data}
                        fill="#7C4DFF"
                        opacity={0.9}
                        r={isMobile ? 4 : 6}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </>
    );
}
