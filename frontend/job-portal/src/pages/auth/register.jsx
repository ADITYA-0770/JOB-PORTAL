import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";

function Register() {
    const [role, setRole] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        city: "",
        company_name: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMsg("");
    };

    const endpoint = () => {
        return role === "candidate" ?
         "/accounts/register/candidate/" :
          "/accounts/register/recruiter/"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setErrorMsg("");
            const data = { 
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                phone_number: formData.phone_number,
                city: formData.city,
                company_name: formData.company_name,
             };
            await api.post(endpoint(), data);
            navigate("/login");
        }
        catch (error) {
            if (error.response?.data?.email) {
                setErrorMsg(error.response.data.email[0]);
            } else {
                setErrorMsg("Something went wrong with your registration.");
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D2C2A] relative overflow-x-hidden font-sans flex items-center justify-center py-16">
            
            {/* Abstract Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full border-[1px] border-[#2D2C2A]/5 opacity-50 pointer-events-none"></div>
            
            {/* SVG Graph/Line Element (Abstract) */}
            <svg className="absolute bottom-[-10%] right-[10%] w-[60%] h-[60%] opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path d="M0,500 L200,200 L400,350 L600,50 L800,150 L1000,0" fill="none" stroke="#2D2C2A" strokeWidth="4" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Geometric Accent */}
            <div className="absolute top-[15%] left-[25%] w-16 h-16 rounded-full border-[6px] border-[#e8c34f] opacity-80 pointer-events-none"></div>
            <div className="absolute top-[20%] left-[28%] w-12 h-2 bg-[#423a35] rounded-full opacity-80 pointer-events-none"></div>

            {/* Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="absolute top-8 left-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-[#2D2C2A]/10 hover:bg-[#e8c34f] hover:border-[#e8c34f] transition-all duration-300 font-medium z-50 shadow-sm"
            >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
            </button>

            <div className="max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10">
                
                {/* Left Side: Typography */}
                <div className="hidden lg:flex flex-col pt-12 sticky top-24 animate-fade-in-up">
                    <p className="text-sm font-semibold tracking-widest uppercase text-[#2D2C2A]/60 mb-6">Create Account</p>
                    <h1 className="font-bold text-6xl xl:text-7xl leading-[0.9] tracking-tighter text-[#423a35]">
                        JOIN THE<br/>
                        <span className="text-[#e8c34f]">NETWORK.</span>
                    </h1>
                    <p className="mt-8 text-lg font-medium text-[#2D2C2A]/70 max-w-md leading-relaxed">
                        Whether you're looking for your dream job or searching for top-tier talent, your journey begins right here.
                    </p>
                </div>

                {/* Right Side: Form */}
                <div className="w-full max-w-xl mx-auto lg:mx-0 bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                    
                    <div className="lg:hidden mb-8 text-center">
                        <h1 className="font-bold text-5xl tracking-tighter text-[#423a35]">
                            JOIN THE <span className="text-[#e8c34f]">NETWORK.</span>
                        </h1>
                    </div>

                    {/* Role Selector */}
                    <div className="mb-10">
                        <p className="text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest mb-4 text-center">
                            I am a...
                        </p>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setRole("candidate")}
                                className={`flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-300 border-2 ${role === "candidate" ? "bg-[#2c2c2c] text-white border-[#2c2c2c] shadow-md" : "bg-transparent text-[#2D2C2A] border-[#2D2C2A]/10 hover:border-[#2D2C2A]/30"}`}
                            >
                                Candidate
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("recruiter")}
                                className={`flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-300 border-2 ${role === "recruiter" ? "bg-[#2c2c2c] text-white border-[#2c2c2c] shadow-md" : "bg-transparent text-[#2D2C2A] border-[#2D2C2A]/10 hover:border-[#2D2C2A]/30"}`}
                            >
                                Recruiter
                            </button>
                        </div>
                    </div>

                    {!role ? (
                        <div className="text-center py-12 px-4 border border-dashed border-[#2D2C2A]/10 rounded-[1.5rem] bg-[#2D2C2A]/[0.02]">
                            <p className="text-[#2D2C2A]/50 font-medium">Please select your role above to continue.</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up">
                            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                                
                                {errorMsg && (
                                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                                        {errorMsg}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            required
                                            className="w-full px-0 py-2 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                            placeholder="Jane"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            required
                                            className="w-full px-0 py-2 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                            placeholder="Doe"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-0 py-2 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                        placeholder="hello@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {role === "recruiter" && (
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            required
                                            className="w-full px-0 py-2 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                            placeholder="Acme Corp"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            required
                                            className="w-full px-0 py-2 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                            placeholder="+1 234 567 8900"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            className="w-full px-0 py-2 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                            placeholder="New York"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                required
                                                className="w-full px-0 py-2 pr-10 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2D2C2A]/40 hover:text-[#e8c34f] transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirm_password"
                                                required
                                                className="w-full px-0 py-2 pr-10 border-b-2 border-[#2D2C2A]/10 bg-transparent outline-none focus:border-[#e8c34f] transition-colors text-[#2D2C2A] text-base font-medium placeholder-[#2D2C2A]/30"
                                                placeholder="••••••••"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2D2C2A]/40 hover:text-[#e8c34f] transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 rounded-full font-bold text-white bg-[#2c2c2c] hover:bg-[#e8c34f] hover:text-[#2c2c2c] hover:shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? "Creating account..." : "Create Account"}
                                    </button>
                                </div>

                                <div className="text-center pt-4">
                                    <p className="text-[#2D2C2A]/60 font-medium">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-[#2D2C2A] font-bold underline decoration-2 decoration-[#e8c34f]/40 hover:decoration-[#e8c34f] transition-all underline-offset-4">
                                            Login here
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Register;