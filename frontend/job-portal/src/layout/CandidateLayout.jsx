import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Rightbar from "../components/rightbar";

function Layout({children}){
    return(
        <div className="h-screen flex flex-col overflow-hidden bg-[#FDFBF7] text-[#2D2C2A] font-sans relative">
            
            {/* Abstract Background Elements (Fixed to background) */}
            <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50 pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50 pointer-events-none z-0"></div>
            <svg className="fixed top-[20%] left-[10%] w-[80%] h-[60%] opacity-[0.03] pointer-events-none z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path d="M0,400 L300,100 L500,300 L800,50 L1000,200" fill="none" stroke="#2D2C2A" strokeWidth="4" vectorEffect="non-scaling-stroke" />
            </svg>

            <Navbar/>
            <div className="flex flex-1 overflow-hidden relative z-10">
                <Sidebar/>
                <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8 overflow-y-auto">
                    {children}
                </main>
                <Rightbar/> 
            </div>
        </div>
    )
}

export default Layout;