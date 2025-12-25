import { api } from "./api";

export async function fetchAnalytics() {
    const res = await api.get("/papers/analytics");
    return res.data;
}
