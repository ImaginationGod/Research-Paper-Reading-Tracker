import AddPaperForm from "../components/forms/AddPaperForm";
import { Typography } from "@mui/material";

export default function AddPaper() {
    return (
        <div className="space-y-6">
            <Typography variant="h5">Add Research Paper</Typography>
            <AddPaperForm />
        </div>
    );
}
