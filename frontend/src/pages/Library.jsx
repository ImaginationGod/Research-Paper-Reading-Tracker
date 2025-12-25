import { usePapers } from "../context/PapersContext";
import { CircularProgress, Typography } from "@mui/material";
import PaperTable from "../components/common/PaperTable";
import Filters from "../components/common/Filters";

export default function Library() {
    const { papers, loading } = usePapers();

    return (
        <div className="space-y-6">
            <Typography variant="h5">Paper Library</Typography>

            <Filters />

            {loading ? (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) : (
                <PaperTable rows={papers} />
            )}
        </div>
    );
}
