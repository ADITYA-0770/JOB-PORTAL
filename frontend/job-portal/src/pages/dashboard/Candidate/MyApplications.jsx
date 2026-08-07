import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Layout from "../../../layout/CandidateLayout";
import {
    Briefcase,
    CalendarDays,
    CheckCircle,
    Clock,
    XCircle,
    Loader2
} from "lucide-react";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const res = await api.get("/applications/my-applications/");
            setApplications(res.data);
        } catch (err) {
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] relative z-10">
                    <Loader2 className="animate-spin text-[#2c2c2c]" size={48} strokeWidth={2.5} />
                </div>
            </Layout>
        );
    }

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return (
                    <div className="flex items-center gap-2 bg-[#e8c34f] text-[#2c2c2c] px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-sm">
                        <CheckCircle size={16} strokeWidth={2.5} />
                        Accepted
                    </div>
                );
            case "rejected":
                return (
                    <div className="flex items-center gap-2 bg-transparent border border-red-200 text-red-500 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest">
                        <XCircle size={16} strokeWidth={2.5} />
                        Rejected
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 bg-[#2c2c2c] text-white px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-sm">
                        <Clock size={16} strokeWidth={2.5} />
                        Pending
                    </div>
                );
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
                
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm mb-2">History</p>
                        <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
                            My <span className="text-[#e8c34f]">Applications</span>
                        </h1>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10">
                    {applications.length === 0 ? (
                        <div className="p-16 text-center text-[#2D2C2A]/50 flex flex-col items-center">
                            <div className="w-20 h-20 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <Briefcase size={36} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase mb-2">No Applications Yet</h3>
                            <p className="mb-8 font-medium">Start applying to jobs and they'll appear here.</p>
                            <Link to="/candidate/dashboard" className="bg-[#e8c34f] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#e8c34f] px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-colors shadow-sm">
                                FIND JOBS
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#2D2C2A]/10">
                            {applications.map((application, index) => (
                                <div
                                    key={index}
                                    className="p-6 md:p-8 hover:bg-white/60 transition-colors duration-300 group first:rounded-t-3xl last:rounded-b-3xl"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        
                                        <div className="space-y-4 flex-1">
                                            <h2 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase group-hover:text-[#2D2C2A]/80 transition-colors">
                                                {application.job_title}
                                            </h2>
                                            
                                            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#2D2C2A]/60">
                                                <CalendarDays size={16} strokeWidth={2.5} className="text-[#e8c34f]" />
                                                Applied on {new Date(application.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            {getStatusBadge(application.status)}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
}

export default MyApplications;