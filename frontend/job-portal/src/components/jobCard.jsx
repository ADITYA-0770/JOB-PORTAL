import { Link } from "react-router-dom";
import { MapPin, DollarSign, Briefcase, Star, ArrowUpRight, CheckCircle } from "lucide-react";

function JobCard({ job }) {
    return (
        <div className="bg-white/40 backdrop-blur-md border border-[#2D2C2A]/10 rounded-3xl p-8 hover:shadow-lg hover:border-[#2D2C2A]/30 transition-all duration-500 group cursor-pointer relative overflow-hidden">
            {/* Hover Background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8c34f]/0 to-[#e8c34f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h2 className="font-bold text-3xl text-[#2c2c2c] tracking-tight group-hover:text-[#2c2c2c] transition-colors leading-none mb-2">
                        {job.title}
                    </h2>
                    <p className="text-sm font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                        {job.recruiter?.company_name || 'Top Employer'}
                    </p>
                </div>
                <span className="px-4 py-1.5 bg-[#2c2c2c] text-[#e8c34f] text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                    {job.job_type}
                </span>
            </div>

            <p className="text-[#2D2C2A]/70 text-sm font-medium leading-relaxed mb-8 line-clamp-2 relative z-10">
                {job.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-4 mb-8 relative z-10 border-t border-b border-[#2D2C2A]/5 py-4">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#2D2C2A]/40 uppercase tracking-widest">Location</span>
                    <div className="flex items-center gap-2 text-sm text-[#2D2C2A] font-semibold">
                        <MapPin size={16} strokeWidth={2.5} className="text-[#2D2C2A]/40" />
                        {job.location}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#2D2C2A]/40 uppercase tracking-widest">Salary</span>
                    <div className="flex items-center gap-2 text-sm text-[#2D2C2A] font-semibold">
                        <DollarSign size={16} strokeWidth={2.5} className="text-[#2D2C2A]/40" />
                        ₹{Number(job.salary).toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#2D2C2A]/40 uppercase tracking-widest">Experience</span>
                    <div className="flex items-center gap-2 text-sm text-[#2D2C2A] font-semibold">
                        <Star size={16} strokeWidth={2.5} className="text-[#2D2C2A]/40" />
                        {job.experience_required} Yrs
                    </div>
                </div>
            </div>

            <Link to={`/jobs/${job.id}`} className="block relative z-10">
                <button className={`w-full flex items-center justify-center gap-2 border border-transparent font-bold py-4 rounded-2xl transition-all duration-300 shadow-sm uppercase tracking-widest text-sm group/btn ${job.has_applied ? 'bg-green-500 text-white' : 'bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c]'}`}>
                    {job.has_applied ? (
                        <>
                            Applied
                            <CheckCircle size={18} strokeWidth={3} />
                        </>
                    ) : (
                        <>
                            Apply Now
                            <ArrowUpRight size={18} strokeWidth={3} className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </Link>
        </div>
    );
}

export default JobCard;