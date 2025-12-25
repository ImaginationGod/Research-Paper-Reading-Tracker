import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const PapersContext = createContext();

export function PapersProvider({ children }) {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchPapers(filters = {}) {
        try {
            setLoading(true);
            const res = await api.get("/papers", { params: filters });
            setPapers(res.data);
        } finally {
            setLoading(false);
        }
    }

    async function addPaper(data) {
        const res = await api.post("/papers", data);
        setPapers((prev) => [...prev, res.data]);
    }

    useEffect(() => {
        fetchPapers();
    }, []);

    return (
        <PapersContext.Provider
            value={{
                papers,
                loading,
                fetchPapers,
                addPaper,
            }}
        >
            {children}
        </PapersContext.Provider>
    );
}

export function usePapers() {
    return useContext(PapersContext);
}
