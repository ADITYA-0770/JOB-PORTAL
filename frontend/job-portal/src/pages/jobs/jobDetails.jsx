import Layout from "../../layout/CandidateLayout";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasApplied, setHasApplied] = useState(false);
    const [applying, setApplying] = useState(false);

    const fetchJob = async () => {
        try {
            const response = await api.get(`jobs/${id}/`);
            setJob(response.data);
            
            try {
                const appsRes = await api.get("/applications/my-applications/");
                const applied = appsRes.data.some(app => app.job === parseInt(id) || app.job_title === response.data.title);
                setHasApplied(applied);
            } catch(e) {
                console.error("Could not fetch applications", e);
            }
        } catch (err) {
            setError(err.message || "Failed to fetch job details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchJob();
        }
    }, [id]);

    const applyJob = async (jobId) => {
        if (hasApplied) return;
        setApplying(true);
        try {
            await api.post("/applications/apply/", { job: jobId });
            setHasApplied(true);
        }
        catch (error) {
            console.log(error.response?.data);
            // If backend says already applied
            if (error.response?.data?.message?.toLowerCase().includes("already applied") || error.response?.data?.non_field_errors) {
                setHasApplied(true);
            }
        } finally {
            setApplying(false);
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] relative z-10">
                    <div className="animate-spin text-[#2c2c2c] w-12 h-12 border-4 border-[#2c2c2c] border-t-transparent rounded-full" />
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-12 bg-white/40 backdrop-blur-md rounded-3xl border border-[#2D2C2A]/10 shadow-sm max-w-lg mx-auto mt-12 relative overflow-hidden z-10">
                    <h2 className="text-3xl font-bold text-[#2c2c2c] tracking-tight mb-4 text-center">
                        SOMETHING WENT WRONG
                    </h2>
                    <p className="text-[#2D2C2A]/70 text-center mb-10 leading-relaxed font-medium">
                        {error}
                    </p>
                </div>
            </Layout>
        );
    }

    // Default skills since backend might not provide them
    const defaultSkills = ["React", "Redux", "JavaScript", "Tailwind CSS", "REST API"];

    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
                
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Link 
                        to="/candidate/dashboard" 
                        className="w-fit flex items-center gap-2 text-[#2D2C2A]/50 hover:text-[#2c2c2c] font-bold text-[10px] uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft size={16} strokeWidth={2.5} />
                        BACK TO JOBS
                    </Link>
                </div>

                {job && (
                    <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-8 md:p-12 hover:shadow-lg transition-shadow duration-300">
                        
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-[#2c2c2c] tracking-tight uppercase leading-none mb-3">
                                    {job.title}
                                </h1>
                                <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">
                                    {job.company || "Top Employer"}
                                </p>
                            </div>
                            
                            <button
                                onClick={() => applyJob(job.id)}
                                disabled={hasApplied || applying}
                                className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-sm flex items-center justify-center gap-2 min-w-[200px] w-full md:w-auto
                                    ${hasApplied 
                                        ? "bg-green-500 text-white cursor-not-allowed" 
                                        : "bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c]"
                                    }`}
                            >
                                {applying ? (
                                    <span className="animate-pulse">Applying...</span>
                                ) : hasApplied ? (
                                    <>
                                        <CheckCircle size={18} strokeWidth={2.5} />
                                        Applied
                                    </>
                                ) : (
                                    "Apply Now"
                                )}
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 mb-10 text-[11px] font-bold uppercase tracking-widest text-[#2D2C2A]/60 bg-white/50 p-6 rounded-2xl border border-[#2D2C2A]/5">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} strokeWidth={2.5} className="text-[#e8c34f]" />
                                {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase size={18} strokeWidth={2.5} className="text-[#e8c34f]" />
                                {job.job_type}
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={18} strokeWidth={2.5} className="text-[#e8c34f]" />
                                ₹{job.salary} / Year
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} strokeWidth={2.5} className="text-[#e8c34f]" />
                                {job.experience_required || "0"} Years Exp.
                            </div>
                        </div>

                        <div className="space-y-10">
                            <section>
                                <h2 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase mb-4">
                                    About this Job
                                </h2>
                                <p className="text-[#2D2C2A]/70 leading-relaxed font-medium">
                                    {job.description}
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase mb-4">
                                    Skills Required
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {defaultSkills.map(skill => (
                                        <span key={skill} className="bg-[#2c2c2c] text-[#e8c34f] px-5 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                        
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default JobDetails;