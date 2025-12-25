import { DataGrid } from "@mui/x-data-grid";

export default function PaperTable({ rows }) {
    const columns = [
        { field: "title", headerName: "Title", flex: 1 },
        { field: "author", headerName: "Author", flex: 1 },
        { field: "domain", headerName: "Domain", flex: 1 },
        { field: "stage", headerName: "Stage", flex: 1 },
        { field: "impact", headerName: "Impact", flex: 1 },
        { field: "citations", headerName: "Citations", flex: 1 },
    ];

    return (
        <div style={{ height: 500 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(r) => r._id || r.id}
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                }}
            />
        </div>
    );
}
