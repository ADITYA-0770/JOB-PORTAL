import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../services/api";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post("/accounts/login/", formData);
            const { role } = response.data;
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email", response.data.email);
            
            navigate(role === 'candidate' ? "/candidate/dashboard" : "/recruiter/dashboard");
        }
        catch (error) {
            setErrorMsg("Invalid credentials or account does not exist.");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D2C2A] relative overflow-hidden font-sans flex items-center justify-center">
            
            {/* Abstract Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50"></div>
            <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50"></div>
            
            {/* SVG Graph/Line Element (Abstract) */}
            <svg className="absolute top-[15%] left-[20%] w-[60%] h-[60%] opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path d="M0,500 L200,300 L400,450 L600,100 L800,200 L1000,0" fill="none" stroke="#2D2C2A" strokeWidth="4" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Geometric Accent */}
            <div className="absolute top-[25%] right-[30%] w-16 h-16 rounded-full border-[6px] border-[#e8c34f] opacity-80"></div>
            <div className="absolute top-[28%] right-[38%] w-12 h-2 bg-[#423a35] rounded-full opacity-80"></div>
            <div className="absolute top-[32%] right-[36%] w-8 h-2 bg-[#423a35] rounded-full opacity-80"></div>

            {/* Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="absolute top-8 left-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-[#2D2C2A]/10 hover:bg-[#e8c34f] hover:border-[#e8c34f] transition-all duration-300 font-medium z-50 shadow-sm"
            >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
            </button>

            <div className="max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                
                {/* Left Side: Typography */}
                <div className="hidden lg:flex flex-col justify-center animate-fade-in-up">
                    <p className="text-sm font-semibold tracking-widest uppercase text-[#2D2C2A]/60 mb-6">Welcome Back</p>
                    <h1 className="font-bold text-7xl xl:text-8xl leading-[0.9] tracking-tighter text-[#423a35]">
                        ACCESS YOUR<br/>
                        <span className="text-[#e8c34f]">FUTURE.</span>
                    </h1>
                    <p className="mt-8 text-lg font-medium text-[#2D2C2A]/70 max-w-md leading-relaxed">
                        Sign in to connect with top employers, manage your applications, and take the next step in your career journey.
                    </p>
                </div>

                {/* Right Side: Form */}
                <div className="w-full max-w-md mx-auto lg:mx-0 bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                    
                    <div className="lg:hidden mb-8 text-center">
                        <h1 className="font-bold text-4xl tracking-tighter text-[#423a35]">
                            ACCESS YOUR <span className="text-[#e8c34f]">FUTURE.</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                        
                        {errorMsg && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                                {errorMsg}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-0 py-3 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-lg font-medium placeholder-[#2D2C2A]/30"
                                placeholder="hello@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-0 py-3 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-lg font-medium placeholder-[#2D2C2A]/30"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-full font-bold text-white bg-[#2c2c2c] hover:bg-[#e8c34f] hover:text-[#2c2c2c] hover:shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? "Signing in..." : "Sign in securely"}
                            </button>
                        </div>

                        <div className="text-center pt-6">
                            <p className="text-[#2D2C2A]/60 font-medium">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-[#2D2C2A] font-bold underline decoration-2 decoration-[#e8c34f]/40 hover:decoration-[#e8c34f] transition-all underline-offset-4">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;