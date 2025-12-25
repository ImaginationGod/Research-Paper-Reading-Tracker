import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../services/analytics";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Divider,
    Chip,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PercentIcon from "@mui/icons-material/Percent";

export default function SummaryStats() {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetchAnalytics().then((res) => setSummary(res.summary));
    }, []);

    if (!summary) return null;

    return (
        <Card className="mt-6" variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Summary
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Box className="p-3 rounded-xl border flex items-center gap-3">
                            <InsertDriveFileIcon color="primary" />
                            <div>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Total Papers
                                </Typography>
                                <Typography variant="h6">{summary.total}</Typography>
                            </div>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box className="p-3 rounded-xl border flex items-center gap-3">
                            <DoneAllIcon color="success" />
                            <div>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Fully Read
                                </Typography>
                                <Typography variant="h6">{summary.fullyRead}</Typography>
                            </div>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box className="p-3 rounded-xl border flex items-center gap-3">
                            <PercentIcon color="secondary" />
                            <div>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Completion Rate
                                </Typography>
                                <Typography variant="h6">
                                    {summary.completionRate}%
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                {/* <Divider className="my-4" /> */}
                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle1" className="mb-2">
                    Average Citations by Domain
                </Typography>

                <Grid container spacing={1}>
                    {summary.avgCitations.map((d) => (
                        <Grid item key={d._id}>
                            <Chip
                                label={`${d._id}: ${d.avg.toFixed(1)}`}
                                variant="outlined"
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
