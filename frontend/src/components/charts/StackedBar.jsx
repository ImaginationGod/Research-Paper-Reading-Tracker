import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../services/analytics";
import { Typography, useMediaQuery } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function StackedBar() {
    const [data, setData] = useState([]);

    const isMobile = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
        fetchAnalytics().then((res) => {
            const map = {};

            res.stacked.forEach((item) => {
                const domain = item._id.domain;
                const stage = item._id.stage;

                if (!map[domain]) map[domain] = { domain };
                map[domain][stage] = item.count;
            });

            setData(Object.values(map));
        });
    }, []);

    return (
        <>
            <Typography variant="h6" className="mb-3">
                Papers by Domain & Reading Stage
            </Typography>

            <ResponsiveContainer key={isMobile ? "mobile" : "desktop"} width="100%" height={380}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                >
                    <XAxis
                        dataKey="domain"
                        interval={0}
                        tick={{
                            angle: isMobile ? -35 : 0,
                            textAnchor: isMobile ? "end" : "middle",
                            fontSize: isMobile ? 10 : 12,
                        }}
                    />

                    <YAxis />
                    <Tooltip />
                    {!isMobile && <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: 12 }}
                    />}

                    <Bar stackId="a" dataKey="Abstract Read" fill="#BBDEFB" />
                    <Bar stackId="a" dataKey="Introduction Done" fill="#64B5F6" />
                    <Bar stackId="a" dataKey="Methodology Done" fill="#42A5F5" />
                    <Bar stackId="a" dataKey="Results Analyzed" fill="#1E88E5" />
                    <Bar stackId="a" dataKey="Fully Read" fill="#1565C0" />
                    <Bar stackId="a" dataKey="Notes Completed" fill="#0D47A1" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
