import Layout from "../../../layout/RecruiterLayout";
import { Link } from "react-router-dom";
import {
    Camera,
    Mail,
    Phone,
    MapPin,
    Building2,
    Save,
    Edit,
    UserCircle,
    Globe,
    Loader2,
    ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../services/api";

function RecruiterProfile() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingPic, setIsUploadingPic] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        company_name: "",
        company_website: "",
        phone_number: "",
        city: "",
        about: "",
    });

    const fetchRecruiterProfile = async () => {
        try {
            const response = await api.get('/accounts/profile/');
            setProfile(response.data);
            setFormData({
                fullName: `${response.data.user?.first_name || ""} ${response.data.user?.last_name || ""}`.trim(),
                company_name: response.data.company_name || "",
                company_website: response.data.company_website || "",
                phone_number: response.data.phone_number || "",
                city: response.data.city || "",
                about: response.data.about || "",
            });
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecruiterProfile();
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
                company_name: formData.company_name,
                company_website: formData.company_website,
                phone_number: formData.phone_number,
                city: formData.city,
                about: formData.about,
            };

            const response = await api.patch('/accounts/profile/recruiter/update/', payload);
            setProfile(response.data);
            setFormData({
                fullName: `${response.data.user?.first_name || ""} ${response.data.user?.last_name || ""}`.trim(),
                company_name: response.data.company_name || "",
                company_website: response.data.company_website || "",
                phone_number: response.data.phone_number || "",
                city: response.data.city || "",
                about: response.data.about || "",
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploadingPic(true);
        const data = new FormData();
        data.append("profile_picture", file);

        try {
            const response = await api.patch('/accounts/profile/recruiter/update/', data, {
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
        );

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

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
                
                <div className="flex flex-col gap-4 mb-8">
                    <Link 
                        to="/recruiter/dashboard" 
                        className="w-fit flex items-center gap-2 text-[#2D2C2A]/50 hover:text-[#2c2c2c] font-bold text-[10px] uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft size={16} strokeWidth={2.5} />
                        BACK TO DASHBOARD
                    </Link>
                    <div className="flex flex-col gap-2">
                        <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Company</p>
                        <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
                            Recruiter <span className="text-[#e8c34f]">Profile</span>
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT CARD */}
                    <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-8 h-fit hover:shadow-lg hover:border-[#2D2C2A]/30 transition-all duration-500">
                        <div className="flex flex-col items-center">
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-pic-upload').click()}>
                                {profile?.profile_picture ? (
                                    <img
                                        src={profile.profile_picture.startsWith('/') ? `http://127.0.0.1:8000${profile.profile_picture}` : profile.profile_picture}
                                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105"
                                        alt="Avatar"
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-full bg-[#2c2c2c] border-4 border-white shadow-xl flex items-center justify-center text-[#e8c34f] transition-transform duration-500 group-hover:scale-105">
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

                                <div className="absolute bottom-2 right-2 bg-[#e8c34f] text-[#2c2c2c] p-3 rounded-full shadow-lg hover:bg-[#2c2c2c] hover:text-[#e8c34f] transition-colors cursor-pointer border-4 border-white">
                                    <Camera size={20} strokeWidth={2.5} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mt-6 text-[#2c2c2c] text-center tracking-tight uppercase leading-none">
                                {profile?.user?.first_name} {profile?.user?.last_name}
                            </h2>
                            <p className="text-[#2D2C2A]/50 font-bold text-xs uppercase tracking-widest mt-3">{profile?.company_name || "RECRUITER"}</p>
                        </div>

                        <div className="mt-10 space-y-4">
                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/50 border border-[#2D2C2A]/5">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm">
                                    <Mail size={18} strokeWidth={2.5} />
                                </div>
                                <span className="truncate w-full font-bold text-sm tracking-wide" title={profile?.user?.email}>
                                    {profile?.user?.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/50 border border-[#2D2C2A]/5">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm">
                                    <Phone size={18} strokeWidth={2.5} />
                                </div>
                                <span className="truncate w-full font-bold text-sm tracking-wide" title={profile?.phone_number || "No phone number"}>
                                    {profile?.phone_number || "NOT PROVIDED"}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-[#2D2C2A]/70 w-full p-4 rounded-2xl bg-white/50 border border-[#2D2C2A]/5">
                                <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-xl shadow-sm">
                                    <MapPin size={18} strokeWidth={2.5} />
                                </div>
                                <span className="truncate w-full font-bold text-sm tracking-wide uppercase" title={profile?.city || "No city specified"}>
                                    {profile?.city || "NOT PROVIDED"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="lg:col-span-2 bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 p-8 h-fit hover:shadow-lg hover:border-[#2D2C2A]/30 transition-all duration-500">
                        <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#2D2C2A]/10">
                            <div>
                                <h2 className="text-3xl font-bold text-[#2c2c2c] tracking-tight uppercase leading-none mb-2">
                                    Company Details
                                </h2>
                                <p className="text-[#2D2C2A]/50 font-bold text-xs uppercase tracking-widest">Professional and company information.</p>
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
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Company Name</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <Building2 size={18} className="text-[#e8c34f]" strokeWidth={2.5} />
                                            <p className="text-[#2c2c2c] font-bold text-lg">
                                                {profile?.company_name || <span className="text-[#2D2C2A]/30 italic">Not provided</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 border-b border-[#2D2C2A]/5 pb-4">
                                        <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">Website</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <Globe size={18} className="text-[#e8c34f]" strokeWidth={2.5} />
                                            <p className="text-[#2c2c2c] font-bold text-lg truncate">
                                                {profile?.company_website ? (
                                                    <a href={profile.company_website.startsWith('http') ? profile.company_website : `https://${profile.company_website}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#e8c34f] transition-colors">
                                                        {profile.company_website}
                                                    </a>
                                                ) : (
                                                    <span className="text-[#2D2C2A]/30 italic">Not provided</span>
                                                )}
                                            </p>
                                        </div>
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
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h4 className="text-[#2D2C2A]/40 font-bold text-[10px] uppercase tracking-widest">About Company / Recruiter</h4>
                                    <p className="text-[#2D2C2A]/80 whitespace-pre-line leading-loose font-medium text-sm">
                                        {profile?.about || <span className="text-[#2D2C2A]/30 italic">No summary provided yet. Click edit to add details about yourself or your company!</span>}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-2 focus:border-[#e8c34f] outline-none transition-colors font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="FULL NAME"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Email Address (Read Only)</label>
                                        <input
                                            type="email"
                                            className="w-full bg-transparent border-b-2 border-[#2D2C2A]/10 py-2 outline-none font-bold text-[#2D2C2A]/40 cursor-not-allowed"
                                            value={profile?.user?.email || ""}
                                            disabled
                                            title="Email cannot be changed"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Company Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-2 focus:border-[#e8c34f] outline-none transition-colors font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                            placeholder="ACME CORP"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Company Website</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-2 focus:border-[#e8c34f] outline-none transition-colors font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.company_website}
                                            onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
                                            placeholder="ACME.COM"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Phone Number</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-2 focus:border-[#e8c34f] outline-none transition-colors font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                                            value={formData.phone_number}
                                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">City</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-2 focus:border-[#e8c34f] outline-none transition-colors font-bold text-[#2c2c2c] placeholder-[#2D2C2A]/30 uppercase"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="SAN FRANCISCO"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">About Company</label>
                                    <textarea
                                        rows="5"
                                        className="w-full bg-[#2D2C2A]/5 border border-[#2D2C2A]/10 rounded-2xl p-4 focus:border-[#e8c34f] outline-none transition-colors font-medium text-sm text-[#2c2c2c] placeholder-[#2D2C2A]/30 resize-y"
                                        value={formData.about}
                                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                        placeholder="Write a brief description of your company..."
                                    />
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
                                                company_name: profile?.company_name || "",
                                                company_website: profile?.company_website || "",
                                                phone_number: profile?.phone_number || "",
                                                city: profile?.city || "",
                                                about: profile?.about || "",
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

export default RecruiterProfile;
