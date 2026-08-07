import { useState, useEffect } from "react";
import api from "../services/api";

function Rightbar(){
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ appliedJobs: 0 });

    useEffect(() => {
        const fetchRightbarData = async () => {
            try {
                const profileRes = await api.get('/accounts/profile/');
                setProfile(profileRes.data.user);

                const appsRes = await api.get('/applications/my-applications/');
                setStats({ appliedJobs: appsRes.data.length });
            } catch (error) {
                console.error("Failed to fetch rightbar data:", error);
            }
        };

        fetchRightbarData();
    }, []);

    return (
        <div className="hidden xl:flex w-80 bg-transparent border-l border-[#2D2C2A]/10 h-full p-6 flex-col gap-6 font-sans backdrop-blur-sm z-10 relative">
            <div className="bg-white/40 backdrop-blur-md border border-[#2D2C2A]/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-[#2D2C2A]/50 uppercase tracking-widest mb-1">
                    Your Profile
                </p>
                <h2 className="font-bold text-2xl text-[#423a35] tracking-tight leading-none mb-4 capitalize">
                    {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
                </h2>
                
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#2c2c2c] text-[#e8c34f] text-xs font-bold tracking-widest uppercase">
                    {profile ? profile.role : "..."}
                </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-[#2D2C2A]/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-[#2D2C2A]/50 uppercase tracking-widest mb-4">
                    Quick Stats
                </p>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end border-b border-[#2D2C2A]/5 pb-3">
                        <span className="text-sm font-semibold text-[#2D2C2A]/70">Applied Jobs</span>
                        <span className="font-bold text-3xl text-[#423a35] leading-none">{stats.appliedJobs}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightbar;