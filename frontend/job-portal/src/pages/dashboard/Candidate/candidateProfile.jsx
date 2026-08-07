import Layout from "../../../layout/CandidateLayout";
import {
    Camera,
    Mail,
    Phone,
    MapPin,
    FileText,
    Save,
    Edit,
    UserCircle,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../services/api";


function CandidateProfile() {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingResume, setIsUploadingResume] = useState(false);
    const [isUploadingPic, setIsUploadingPic] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone_number: "",
        city: "",
        about: "",
        skills: "",
        experience: 0,
        education: ""
    });

    const fetchCandidateProfile = async () => {
        try {
            const response = await api.get('/accounts/profile/')
            setProfile(response.data)
            setFormData({
                fullName: `${response.data.user?.first_name || ""} ${response.data.user?.last_name || ""}`.trim(),
                phone_number: response.data.phone_number || "",
                city: response.data.city || "",
                about: response.data.about || "",
                skills: response.data.skills || "",
                experience: response.data.experience || 0,
                education: response.data.education || ""
            })
        }
        catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCandidateProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const nameParts = formData.fullName.trim().split(/\s+/);
            const first_name = nameParts[0] || "";
            const last_name = nameParts.slice(1).join(" ") || "";

            const payload = {
                first_name,
                last_name,
                phone_number: formData.phone_number,
                city: formData.city,
                about: formData.about,
                skills: formData.skills,
                experience: formData.experience,
                education: formData.education
            };

            const response = await api.patch('/accounts/profile/update/', payload);
            setProfile(response.data);
            setFormData({
                fullName: `${response.data.user?.first_name || ""} ${response.data.user?.last_name || ""}`.trim(),
                phone_number: response.data.phone_number || "",
                city: response.data.city || "",
                about: response.data.about || "",
                skills: response.data.skills || "",
                experience: response.data.experience || 0,
                education: response.data.education || ""
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploadingResume(true);
        const data = new FormData();
        data.append("resume", file);

        try {
            const response = await api.patch('/accounts/profile/update/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProfile(response.data);
            alert("Resume uploaded successfully!");
        } catch (error) {
            console.error("Failed to upload resume", error);
            alert("Failed to upload resume. Please try again.");
        } finally {
            setIsUploadingResume(false);
        }
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploadingPic(true);
        const data = new FormData();
        data.append("profile_picture", file);

        try {
            const response = await api.patch('/accounts/profile/update/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProfile(response.data);
            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Failed to upload profile picture", error);
            alert("Failed to upload profile picture. Please try again.");
        } finally {
            setIsUploadingPic(false);
        }
    };

    if (isLoading)
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] relative z-10">
                    <Loader2 className="animate-spin text-[#2c2c2c]" size={48} strokeWidth={2.5} />
                </div>
            </Layout>
        )

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
                            : "We encountered an error while fetching your profile data. Please try again."}
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
                            onClick={() => window.location.reload()}
                            className="bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-sm w-full"
                        >
                            Retry Request
                        </button>
                    )}
                </div>
            </Layout>
        );
    }

    const skillsList = profile?.skills ? profile.skills.split(',').map(s => s.trim()).filter(s => s !== "") : [];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
                
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Candidate</p>
                    <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
                        Your <span className="text-[#e8c34f]">Profile</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT CARD */}
                    <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-6 md:p-8 h-fit hover:shadow-lg transition-all duration-500 lg:sticky lg:top-28">
                        <div className="flex flex-col items-center">
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-pic-upload').click()}>
                                {profile?.profile_picture ? (
                                    <img
                                        src={profile.profile_picture.startsWith('/') ? `http://127.0.0.1:8000${profile.profile_picture}` : profile.profile_picture}
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105"
                                        alt="Avatar"
                                    />
                                ) : (
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#2c2c2c] border-4 border-white shadow-xl flex items-center justify-center text-[#e8c34f] transition-transform duration-500 group-hover:scale-105">
                                        <UserCircle size={64} strokeWidth={2} />
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="profile-pic-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleProfilePicUpload}
                                    disabled={isUploadingPic}
                                />

                                <div className="absolute bottom-2 right-2 bg-[#e8c34f] text-[#2c2c2c] p-2.5 md:p-3 rounded-full shadow-lg hover:bg-[#2c2c2c] hover:text-[#e8c34f] transition-colors cursor-pointer border-4 border-white">
                                    <Camera size={18} strokeWidth={2.5} />
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold mt-6 text-[#2c2c2c] text-center tracking-tight uppercase leading-none">
                                {profile?.user?.first_name} {profile?.user?.last_name}
                            </h2>
                            <p className="text-[#2D2C2A]/50 font-bold text-xs uppercase tracking-widest mt-3">Candidate</p>
                        </div>

                        <div className="mt-10 space-y-4">
                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/60 border border-[#2D2C2A]/10 hover:border-[#2D2C2A]/20 transition-colors">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm shrink-0">
                                    <Mail size={18} strokeWidth={2.5} />
                                </div>
                                <span className="break-all w-full font-bold text-sm tracking-wide">
                                    {profile?.user?.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/60 border border-[#2D2C2A]/10 hover:border-[#2D2C2A]/20 transition-colors">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm shrink-0">
                                    <Phone size={18} strokeWidth={2.5} />
                                </div>
                                <span className="break-words w-full font-bold text-sm tracking-wide">
                                    {profile?.phone_number || "NOT PROVIDED"}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/60 border border-[#2D2C2A]/10 hover:border-[#2D2C2A]/20 transition-colors">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm shrink-0">
                                    <MapPin size={18} strokeWidth={2.5} />
                                </div>
                                <span className="break-words w-full font-bold text-sm tracking-wide uppercase">
                                    {profile?.city || "NOT PROVIDED"}
                                </span>
                            </div>
                        </div>

                        <hr className="my-8 border-[#2D2C2A]/10 border-dashed" />

                        <div>
                            <h3 className="font-bold text-[#2c2c2c] mb-6 tracking-widest uppercase text-sm">
                                Resume Document
                            </h3>

                            {profile?.resume && (
                                <a
                                    href={profile.resume.startsWith('/') ? `http://127.0.0.1:8000${profile.resume}` : profile.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 p-5 mb-6 bg-[#2D2C2A]/5 border border-[#2D2C2A]/10 rounded-2xl hover:bg-[#2D2C2A]/10 transition-colors group"
                                    title="View Current Resume"
                                >
                                    <div className="bg-[#2c2c2c] text-[#e8c34f] p-3 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                                        <FileText size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="truncate flex-1">
                                        <p className="text-sm font-bold text-[#2c2c2c] truncate">
                                            {profile.resume.substring(profile.resume.lastIndexOf('/') + 1) || "Current_Resume.pdf"}
                                        </p>
                                        <p className="text-[10px] font-bold text-[#2D2C2A]/50 uppercase tracking-widest mt-1">Click to view</p>
                                    </div>
                                </a>
                            )}

                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                            />

                            <button
                                onClick={() => document.getElementById('resume-upload').click()}
                                disabled={isUploadingResume}
                                className="w-full bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 font-bold uppercase tracking-widest text-xs shadow-sm"
                            >
                                <FileText size={18} strokeWidth={2.5} />
                                <span>
                                    {isUploadingResume ? "UPLOADING..." : profile?.resume ? "UPDATE RESUME" : "UPLOAD RESUME"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="lg:col-span-2 bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-8 h-fit hover:shadow-lg hover:border-[#2D2C2A]/30 transition-all duration-500">

                        <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#2D2C2A]/10">
                            <div>
                                <h2 className="text-3xl font-bold text-[#2c2c2c] tracking-tight uppercase leading-none mb-2">
                                    Professional Details
                                </h2>
                                <p className="text-[#2D2C2A]/50 font-bold text-xs uppercase tracking-widest">Experience, education, and skills.</p>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-transparent border border-[#2D2C2A]/20 text-[#2D2C2A]/70 hover:bg-[#2c2c2c] hover:text-[#e8c34f] hover:border-[#2c2c2c] px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
                                >
                                    <Edit size={14} strokeWidth={2.5} />
                                    EDIT PROFILE
                                </button>
                            )}
                        </div>

                        {!isEditing ? (
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-y-8 gap-x-8">
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Full Name</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg">
                                            {profile?.user?.first_name} {profile?.user?.last_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Email Address</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg">
                                            {profile?.user?.email}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Phone</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg">
                                            {profile?.phone_number || <span className="text-[#2D2C2A]/30 italic">Not provided</span>}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">City</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg uppercase">
                                            {profile?.city || <span className="text-[#2D2C2A]/30 italic">Not provided</span>}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Experience</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg">
                                            {profile?.experience !== undefined && profile?.experience !== null ? `${profile?.experience} Year(s)` : <span className="text-[#2D2C2A]/30 italic">Not provided</span>}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Education</h4>
                                        <p className="text-[#2c2c2c] font-bold text-lg">
                                            {profile?.education || <span className="text-[#2D2C2A]/30 italic">Not provided</span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 border-b border-[#2D2C2A]/5 pb-6">
                                    <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">About Me</h4>
                                    <p className="text-[#2D2C2A]/80 whitespace-pre-line leading-loose font-medium text-sm">
                                        {profile?.about || <span className="text-[#2D2C2A]/30 italic">No profile summary provided yet. Click edit to add details about yourself!</span>}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Skills</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {skillsList.length > 0 ? (
                                            skillsList.map((skill, index) => (
                                                <span key={index} className="bg-[#2c2c2c] text-[#e8c34f] px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-[#2D2C2A]/30 font-medium italic">No skills listed yet.</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl px-5 py-3.5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="FULL NAME"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">Email Address (Read Only)</label>
                                        <input
                                            type="email"
                                            className="w-full bg-[#2D2C2A]/5 border border-[#2D2C2A]/5 rounded-2xl px-5 py-3.5 outline-none font-bold text-[#2D2C2A]/40 cursor-not-allowed"
                                            value={profile?.user?.email || ""}
                                            disabled
                                            title="Email cannot be changed"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">Phone Number</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl px-5 py-3.5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.phone_number}
                                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">City</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl px-5 py-3.5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30 uppercase"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="SAN FRANCISCO"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">Experience (Years)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl px-5 py-3.5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                                            placeholder="5"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">Education</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl px-5 py-3.5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.education}
                                            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                            placeholder="B.S. IN COMPUTER SCIENCE"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">About Me</label>
                                    <textarea
                                        rows="5"
                                        className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl p-5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-medium text-sm text-[#2c2c2c] placeholder-[#2D2C2A]/30 resize-y"
                                        value={formData.about}
                                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                        placeholder="Write a brief professional summary..."
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50 ml-1">Skills</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/60 border border-[#2D2C2A]/10 rounded-2xl px-5 py-3.5 focus:border-[#e8c34f] focus:ring-4 focus:ring-[#e8c34f]/10 outline-none transition-all font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30 uppercase"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        placeholder="REACT, PYTHON, DJANGO (COMMA SEPARATED)"
                                    />
                                    <p className="text-[10px] font-bold text-[#2D2C2A]/40 mt-1 ml-2 tracking-widest uppercase">Separate multiple skills with commas.</p>
                                </div>

                                <div className="pt-8 mt-4 border-t border-[#2D2C2A]/10 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] px-8 py-4 rounded-full flex items-center justify-center gap-3 font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-sm flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <Save size={16} strokeWidth={2.5} />
                                        {isSaving ? "SAVING..." : "SAVE CHANGES"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                fullName: `${profile?.user?.first_name || ""} ${profile?.user?.last_name || ""}`.trim(),
                                                phone_number: profile?.phone_number || "",
                                                city: profile?.city || "",
                                                about: profile?.about || "",
                                                skills: profile?.skills || "",
                                                experience: profile?.experience || 0,
                                                education: profile?.education || ""
                                            });
                                        }}
                                        className="bg-transparent border border-[#2D2C2A]/20 text-[#2D2C2A]/60 hover:bg-[#2c2c2c] hover:text-white hover:border-[#2c2c2c] px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-none"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default CandidateProfile;