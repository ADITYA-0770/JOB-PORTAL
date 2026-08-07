import { BriefcaseBusiness, Search, UserCircle, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

function Navbar() {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSearchTerm(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        
        const role = localStorage.getItem("role");
        const dashboardPath = role === "recruiter" ? "/recruiter/dashboard" : "/candidate/dashboard";
        
        if (location.pathname !== "/candidate/dashboard" && location.pathname !== "/recruiter/dashboard") {
            navigate(`${dashboardPath}?search=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate(`?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleProfileClick = () => {
        const role = localStorage.getItem("role");
        if (role === "recruiter") {
            navigate("/recruiter/profile");
        } else {
            navigate("/candidate/profile");
        }
    };

    return (
        <nav className="h-20 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#2D2C2A]/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 font-sans gap-2 md:gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                <div className="w-10 h-10 rounded-full bg-[#2c2c2c] text-[#e8c34f] flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                    <BriefcaseBusiness size={20} strokeWidth={2.5} />
                </div>
                <h1 className="font-bold text-2xl text-[#2c2c2c] tracking-tighter">
                    JOB<span className="text-[#e8c34f]">NEST</span>
                </h1>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex flex-1 max-w-[420px] items-center bg-[#2D2C2A]/5 border border-[#2D2C2A]/10 focus-within:border-[#e8c34f] focus-within:bg-white focus-within:shadow-[0_4px_20px_rgb(0,0,0,0.05)] transition-all px-3 md:px-5 py-2 md:py-2.5 rounded-full mx-2 md:mx-0">
                <Search size={18} className="text-[#2D2C2A]/40 min-w-[18px]"/>
                <input
                    type="text"
                    placeholder="Search jobs & companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none ml-3 w-full text-[#2D2C2A] font-medium placeholder-[#2D2C2A]/40"
                />
                <button type="submit" className="hidden">Search</button>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-4 text-[#2D2C2A]">
                <div 
                    onClick={handleProfileClick}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-[#2D2C2A]/10 rounded-full cursor-pointer hover:bg-[#e8c34f] hover:border-[#e8c34f] hover:text-[#2c2c2c] transition-all duration-300 shadow-sm"
                    title="Profile"
                >
                    <UserCircle size={24} strokeWidth={2.5} />
                </div>
                <div 
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('role');
                            navigate('/login');
                        }}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-[#2D2C2A]/10 rounded-full cursor-pointer hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 shadow-sm"
                        title="Logout"
                    >
                        <LogOut size={22} strokeWidth={2.5} />
                    </div>
            </div>
        </nav>
    );
}

export default Navbar;