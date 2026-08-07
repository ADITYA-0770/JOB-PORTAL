import { Link, useNavigate, useLocation } from "react-router-dom";

import {
    House,
    FileText,
    User,
    LogOut
} from "lucide-react";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const menus = [
        { icon: <House size={20} strokeWidth={2.5} />, name: "Dashboard", link: "/candidate/dashboard" },
        { icon: <FileText size={20} strokeWidth={2.5} />, name: "My Applications", link: "/candidate/applied-jobs" },
        { icon: <User size={20} strokeWidth={2.5} />, name: "Profile", link: "/candidate/profile" },
    ]

    return (
        <div className="fixed bottom-0 left-0 w-full md:w-64 md:relative bg-[#FDFBF7] md:bg-transparent border-t md:border-t-0 md:border-r border-[#2D2C2A]/10 h-16 md:h-full p-2 md:p-6 flex flex-row md:flex-col font-sans backdrop-blur-md z-50 justify-around md:justify-start shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none">
            <div className="flex flex-row md:flex-col flex-grow md:space-y-3 md:mt-4 justify-around md:justify-start items-center md:items-stretch w-full">
                {menus.map((menu, index) => {
                    const isActive = location.pathname === menu.link;
                    return (
                        <Link
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 py-2 md:px-5 md:py-3.5 rounded-xl md:rounded-full font-bold text-[10px] md:text-sm transition-all duration-300 ${
                                isActive 
                                ? "text-[#e8c34f] md:bg-[#2c2c2c] md:text-[#e8c34f] md:shadow-md md:transform md:scale-105" 
                                : "text-[#2D2C2A]/60 hover:bg-[#2D2C2A]/5 hover:text-[#2D2C2A]"
                            }`}
                            to={menu.link || "#"}
                        >
                            {menu.icon}
                            <span className={`${isActive ? "text-[#2c2c2c] md:text-[#e8c34f]" : ""} hidden sm:inline md:inline`}>{menu.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar;