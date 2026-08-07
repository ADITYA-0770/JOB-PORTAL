import Layout from "../../../layout/CandidateLayout";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import JobCard from "../../../components/jobCard";
import { SearchX, Loader2 } from "lucide-react";

function Dashboard(){
    const [jobs, setJob] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const fetchJobs = async () => {
        try{
            setIsLoading(true);
            const response = await api.get("/jobs/", {
                params: {
                    search: searchQuery || undefined,
                }
            })
            setJob(response.data)
        }
        catch(error){
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchJobs();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    if (error) {
        const isUnauthorized = error.response?.status === 401;
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-12 bg-white/40 backdrop-blur-md rounded-3xl border border-[#2D2C2A]/10 shadow-sm max-w-lg mx-auto mt-12 relative overflow-hidden z-10">
                    <div className="w-20 h-20 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mb-8 shadow-lg">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#2c2c2c] tracking-tight mb-4 text-center">
                        {isUnauthorized ? "SESSION EXPIRED" : "SOMETHING WENT WRONG"}
                    </h2>
                    <p className="text-[#2D2C2A]/70 text-center mb-10 leading-relaxed font-medium">
                        {isUnauthorized 
                            ? "Your session has expired or you are not authorized to view this page. Please log in again." 
                            : "We encountered an error while fetching jobs. Please try again."}
                    </p>
                    {isUnauthorized ? (
                        <a 
                            href="/login" 
                            className="bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-sm w-full text-center"
                        >
                            Go to Login
                        </a>
                    ) : (
                        <button 
                            onClick={() => fetchJobs()} 
                            className="bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-sm w-full"
                        >
                            Retry Request
                        </button>
                    )}
                </div>
            </Layout>
        );
    }

    return (    
        <Layout>
            <div className="max-w-4xl mx-auto space-y-10 pb-12">
                
                <div className="flex flex-col gap-2 mb-12 relative z-10">
                    <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
                        Recommended <span className="text-[#e8c34f]">Jobs</span>
                    </h1>
                    <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm mt-2">
                        Curated opportunities based on your profile
                    </p>
                </div>

                {isloading ? (
                    <div className="flex justify-center items-center py-24 relative z-10">
                        <Loader2 className="animate-spin text-[#2c2c2c]" size={48} strokeWidth={2.5} />
                    </div>
                ) : jobs?.results?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 relative z-10">
                        {jobs.results.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-24 bg-white/40 backdrop-blur-md rounded-3xl border border-[#2D2C2A]/10 shadow-sm relative z-10">
                        <div className="w-20 h-20 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <SearchX size={32} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight mb-3">NO JOBS FOUND</h3>
                        <p className="text-[#2D2C2A]/70 font-medium max-w-sm">We couldn't find any jobs matching your search "{searchQuery}". Try using different keywords.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}   

export default Dashboard;