import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../services/analytics";
import { Typography, useMediaQuery } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function FunnelChart() {
    const [data, setData] = useState([]);

    // const isMobile = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
        fetchAnalytics().then((res) => {
            setData(
                res.stages.map((s) => ({
                    stage: s._id,
                    count: s.count,
                }))
            );
        });
    }, []);

    function StageTick({ x, y, payload }) {
        const words = payload.value.split(" ");

        return (
            <g transform={`translate(${x},${y + 14})`}>
                {words.map((word, index) => (
                    <text
                        key={index}
                        x={0}
                        y={index * 12}
                        textAnchor="middle"
                        fontSize={10}
                    >
                        {word}
                    </text>
                ))}
            </g>
        );
    }

    return (
        <>
            <Typography variant="h6" className="mb-3">
                Reading Stage Funnel
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="stage"
                        interval={0}
                        tick={<StageTick />}
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                    <Bar dataKey="count" fill="#42A5F5" barSize={80} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
