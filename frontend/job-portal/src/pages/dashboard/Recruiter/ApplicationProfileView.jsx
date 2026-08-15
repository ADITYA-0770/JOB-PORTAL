import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserCircle, Briefcase, GraduationCap, MapPin, Mail, Phone, ExternalLink, Download } from 'lucide-react';
import Layout from '../../../layout/RecruiterLayout';

function ApplicationProfileView() {
    const location = useLocation();
    const navigate = useNavigate();
    const app = location.state?.app;

    if (!app) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] relative z-10 text-center">
                    <h2 className="text-3xl font-bold text-[#2c2c2c] mb-4">No Profile Data Found</h2>
                    <p className="text-[#2D2C2A]/70 mb-8">Please select a profile from the applications page.</p>
                    <button onClick={() => navigate(-1)} className="bg-[#2c2c2c] text-[#e8c34f] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px]">
                        GO BACK
                    </button>
                </div>
            </Layout>
        );
    }

    const getResumeUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('/')) {
            return `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${url}`;
        }
        return url;
    };

    const resumeUrl = getResumeUrl(app.resume);
    const profilePicUrl = getResumeUrl(app.profile_picture);

    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-10 relative z-10 pb-12 font-sans px-4 md:px-8 lg:px-0">
                <div className="flex flex-col gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="w-fit flex items-center gap-2 text-[#2D2C2A]/50 hover:text-[#2c2c2c] font-bold text-[10px] uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft size={16} strokeWidth={2.5} />
                        BACK TO APPLICATIONS
                    </button>
                    <div className="flex flex-col gap-2">
                        <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Applicant Profile</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none break-words">
                            {app.first_name} <span className="text-[#e8c34f]">{app.last_name}</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-6 md:p-8 h-fit">
                        <div className="flex flex-col items-center">
                            {profilePicUrl ? (
                                <img
                                    src={profilePicUrl}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                                    alt="Avatar"
                                />
                            ) : (
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#2c2c2c] border-4 border-white shadow-xl flex items-center justify-center text-[#e8c34f]">
                                    <UserCircle size={64} strokeWidth={2} />
                                </div>
                            )}
                            <h2 className="text-2xl md:text-3xl font-bold mt-6 text-[#2c2c2c] text-center tracking-tight uppercase leading-none break-words">
                                {app.first_name} {app.last_name}
                            </h2>
                            <p className="text-[#2D2C2A]/50 font-bold text-xs uppercase tracking-widest mt-3 text-center">{app.headline || 'CANDIDATE'}</p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/50 border border-[#2D2C2A]/5">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm">
                                    <Mail size={18} strokeWidth={2.5} />
                                </div>
                                <span className="truncate w-full font-bold text-sm tracking-wide" title={app.email}>
                                    {app.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/50 border border-[#2D2C2A]/5">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm">
                                    <Phone size={18} strokeWidth={2.5} />
                                </div>
                                <span className="truncate w-full font-bold text-sm tracking-wide">
                                    {app.phone || "NOT PROVIDED"}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/50 border border-[#2D2C2A]/5">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm">
                                    <MapPin size={18} strokeWidth={2.5} />
                                </div>
                                <span className="truncate w-full font-bold text-sm tracking-wide uppercase">
                                    {app.city || "NOT PROVIDED"}
                                </span>
                            </div>
                        </div>

                        {resumeUrl && (
                            <div className="mt-8 pt-6 border-t border-[#2D2C2A]/10">
                                <a 
                                    href={resumeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#e8c34f] text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 w-full"
                                >
                                    <Download size={16} strokeWidth={2.5} />
                                    DOWNLOAD RESUME
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-6 md:p-8 h-fit">
                            <h3 className="text-xl font-bold text-[#2c2c2c] uppercase tracking-tighter mb-6 flex items-center gap-3 border-b border-[#2D2C2A]/10 pb-4">
                                <UserCircle className="text-[#e8c34f]" /> About Candidate
                            </h3>
                            <p className="text-[#2D2C2A]/80 whitespace-pre-line leading-relaxed font-medium text-sm">
                                {app.about || <span className="text-[#2D2C2A]/30 italic">No summary provided.</span>}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-6 md:p-8">
                                <h3 className="text-xl font-bold text-[#2c2c2c] uppercase tracking-tighter mb-6 flex items-center gap-3 border-b border-[#2D2C2A]/10 pb-4">
                                    <Briefcase className="text-[#e8c34f]" /> Experience & Skills
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest mb-1">Years of Experience</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg">{app.experience || 0} Years</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {app.skills ? app.skills.split(',').map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-[#2D2C2A]/5 border border-[#2D2C2A]/10 rounded-full text-xs font-bold text-[#2D2C2A]/70 uppercase tracking-wider">
                                                    {skill.trim()}
                                                </span>
                                            )) : <span className="text-[#2D2C2A]/30 italic text-sm font-medium">No skills listed</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-6 md:p-8">
                                <h3 className="text-xl font-bold text-[#2c2c2c] uppercase tracking-tighter mb-6 flex items-center gap-3 border-b border-[#2D2C2A]/10 pb-4">
                                    <GraduationCap className="text-[#e8c34f]" /> Education & Links
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest mb-1">Education</h4>
                                        <p className="text-[#2c2c2c] font-bold text-base leading-snug">{app.education || <span className="text-[#2D2C2A]/30 italic font-medium">Not provided</span>}</p>
                                    </div>
                                    <div className="pt-2">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest mb-3">Professional Links</h4>
                                        <div className="flex flex-col gap-3">
                                            {app.github ? (
                                                <a href={app.github.startsWith('http') ? app.github : `https://${app.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2c2c2c] hover:text-[#e8c34f] font-bold text-sm tracking-wide transition-colors">
                                                    <ExternalLink size={16} /> GitHub Profile
                                                </a>
                                            ) : <span className="text-[#2D2C2A]/30 italic text-sm font-medium">No GitHub provided</span>}
                                            
                                            {app.linkedin ? (
                                                <a href={app.linkedin.startsWith('http') ? app.linkedin : `https://${app.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2c2c2c] hover:text-[#e8c34f] font-bold text-sm tracking-wide transition-colors">
                                                    <ExternalLink size={16} /> LinkedIn Profile
                                                </a>
                                            ) : <span className="text-[#2D2C2A]/30 italic text-sm font-medium">No LinkedIn provided</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ApplicationProfileView;
