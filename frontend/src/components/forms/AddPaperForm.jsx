import { useState } from "react";
import { usePapers } from "../../context/PapersContext";
import {
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
} from "@mui/material";

import {
    DOMAINS,
    READING_STAGES,
    IMPACT_SCORES,
} from "../../utils/constants";

export default function AddPaperForm() {
    const { addPaper } = usePapers();
    const [form, setForm] = useState({
        title: "",
        author: "",
        domain: "",
        stage: "",
        citations: "",
        impact: "",
        dateAdded: "",
    });

    const isMobile = useMediaQuery("(max-width:900px)");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addPaper(form);
        setForm({
            title: "",
            author: "",
            domain: "",
            stage: "",
            citations: "",
            impact: "",
            dateAdded: "",
        });
    };

    const inputHeight = isMobile ? 56 : 56; // can be adjusted if needed

    return (
        <Paper variant="outlined"
            className="w-full"
            sx={{
                p: 4,
                minHeight: isMobile ? "100vh" : "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: isMobile ? "center" : "flex-start",
            }}
        >
            <form style={{ width: isMobile ? "100%" : "auto" }} onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        flexWrap: "wrap",
                        "& .MuiGrid-item": { minWidth: 220 },
                    }}
                >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Paper Title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            sx={{ height: inputHeight }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="First Author Name"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            required
                            sx={{ height: inputHeight }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth sx={{ minWidth: 240, height: inputHeight }}>
                            <InputLabel>Research Domain</InputLabel>
                            <Select
                                name="domain"
                                value={form.domain}
                                label="Research Domain"
                                onChange={handleChange}
                                required
                                sx={{ height: inputHeight }}
                            >
                                {DOMAINS.map((d) => (
                                    <MenuItem key={d} value={d}>
                                        {d}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth sx={{ minWidth: 240, height: inputHeight }}>
                            <InputLabel>Reading Stage</InputLabel>
                            <Select
                                name="stage"
                                value={form.stage}
                                label="Reading Stage"
                                onChange={handleChange}
                                required
                                sx={{ height: inputHeight }}
                            >
                                {READING_STAGES.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        {s}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth sx={{ minWidth: 240, height: inputHeight }}>
                            <InputLabel>Impact Score</InputLabel>
                            <Select
                                name="impact"
                                value={form.impact}
                                label="Impact Score"
                                onChange={handleChange}
                                required
                                sx={{ height: inputHeight }}
                            >
                                {IMPACT_SCORES.map((i) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            type="number"
                            fullWidth
                            label="Citation Count"
                            name="citations"
                            value={form.citations}
                            onChange={handleChange}
                            required
                            sx={{ height: inputHeight }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            type="date"
                            fullWidth
                            label="Date Added"
                            name="dateAdded"
                            value={form.dateAdded}
                            onChange={handleChange}
                            required
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            sx={{ height: inputHeight }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md="auto"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ height: inputHeight, width: isMobile ? "100%" : "auto" }}
                        >
                            Save Paper
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
