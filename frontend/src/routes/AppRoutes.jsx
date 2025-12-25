import { Routes, Route, Navigate } from "react-router-dom";
import Library from "../pages/Library";
import AddPaper from "../pages/AddPaper";
import Analytics from "../pages/Analytics";
import Layout from "../components/layout/Layout";

export default function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/library" />} />
                <Route path="/library" element={<Library />} />
                <Route path="/add" element={<AddPaper />} />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </Layout>
    );
}
