import { Typography, Card, CardContent } from "@mui/material";
import FunnelChart from "../components/charts/FunnelChart";
import ScatterPlot from "../components/charts/ScatterPlot";
import StackedBar from "../components/charts/StackedBar";
import SummaryStats from "../components/charts/SummaryStats";

export default function Analytics() {
    return (
        <div className="space-y-6">
            <Typography variant="h5">Reading Analytics</Typography>

            <Card variant="outlined">
                <CardContent>
                    <FunnelChart />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <ScatterPlot />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <StackedBar />
                </CardContent>
            </Card>

            <SummaryStats />
        </div>
    );
}
