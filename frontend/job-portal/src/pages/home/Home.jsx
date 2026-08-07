import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Search, Building2, Users, ArrowRight, PlayCircle, Star, Zap } from 'lucide-react';

function Home() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#e8c34f] selection:text-[#2c2c2c] overflow-x-hidden">
            
            {/* SVG Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-[#e8c34f]/5 animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.9,-18.1,97.4,-2.5C97.9,13.1,92.8,28.9,83.3,42.1C73.8,55.3,59.9,65.9,44.6,73.1C29.3,80.3,12.6,84.1,-3.5,89.5C-19.6,94.9,-35.1,101.9,-49.2,96.1C-63.3,90.3,-76,71.7,-84.6,54.1C-93.2,36.5,-97.7,19.9,-95.6,4.2C-93.5,-11.5,-84.8,-26.3,-74.6,-39.1C-64.4,-51.9,-52.7,-62.7,-39.5,-70.6C-26.3,-78.5,-11.6,-83.5,2.6,-88C16.8,-92.5,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] text-[#2c2c2c]/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M39.9,-65.7C54.1,-60.5,69.7,-53.8,79.5,-41.7C89.3,-29.6,93.3,-12.1,89.6,4C85.9,20.1,74.5,34.8,62.3,47.2C50.1,59.6,37.1,69.7,21.8,75.1C6.5,80.5,-11.1,81.2,-27.1,76.5C-43.1,71.8,-57.5,61.7,-68.4,48.5C-79.3,35.3,-86.7,19,-87.3,2.4C-87.9,-14.2,-81.7,-31.1,-70.9,-44.1C-60.1,-57.1,-44.7,-66.2,-29.9,-71.1C-15.1,-76,-0.9,-76.7,13.6,-74.1C28.1,-71.5,39.9,-65.7,39.9,-65.7Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Header */}
            <header className="absolute top-0 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#2c2c2c] text-[#e8c34f] p-2.5 rounded-2xl shadow-lg">
                        <BriefcaseBusiness size={28} strokeWidth={2.5} />
                    </div>
                    <h1 className="font-bold text-3xl text-[#2c2c2c] tracking-tighter uppercase">
                        JobNest
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/login" className="hidden md:block font-bold text-[11px] uppercase tracking-widest text-[#2D2C2A]/70 hover:text-[#2c2c2c] transition-colors">
                        Log in
                    </Link>
                    <Link to="/register" className="bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-all duration-300">
                        Sign up
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 md:px-12 flex flex-col items-center text-center">
                
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-[#2D2C2A]/10 text-[#2c2c2c] text-[10px] font-bold uppercase tracking-widest shadow-sm mb-12">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8c34f] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e8c34f]"></span>
                    </span>
                    Over 10,000+ premium jobs available
                </div>

                <h2 className="text-6xl md:text-8xl lg:text-[120px] font-bold text-[#2c2c2c] tracking-tighter uppercase leading-[0.9] max-w-[1200px] mb-8">
                    Discover <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2c2c2c] to-[#2D2C2A]/60">Your True</span> <br/>
                    <span className="relative inline-block">
                        <span className="relative z-10">Calling</span>
                        <span className="absolute bottom-2 md:bottom-4 left-0 w-full h-4 md:h-8 bg-[#e8c34f] -z-10 skew-x-[-12deg]"></span>
                    </span>
                </h2>
                
                <p className="text-lg md:text-xl text-[#2D2C2A]/70 max-w-2xl mb-16 font-medium leading-relaxed">
                    The exclusive portal bridging world-class talent with elite enterprises. Step into the future of career advancement.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center">
                    <Link to="/register" className="group flex justify-center items-center gap-3 bg-[#e8c34f] text-[#2c2c2c] text-sm font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-lg shadow-[#e8c34f]/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e8c34f]/30">
                        Find a Job
                        <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/login" className="group flex justify-center items-center gap-3 bg-white/60 backdrop-blur-md hover:bg-white text-[#2c2c2c] border border-[#2D2C2A]/10 text-sm font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-sm transition-all hover:-translate-y-1">
                        Hire Talent
                        <BriefcaseBusiness size={18} strokeWidth={2.5} className="text-[#2D2C2A]/50 group-hover:text-[#2c2c2c] transition-colors" />
                    </Link>
                </div>

                {/* Video / Graphic Placeholder - Glassmorphism Style */}
                <div className="mt-24 w-full max-w-6xl relative rounded-[40px] overflow-hidden shadow-2xl border border-white/50 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2c2c2c]/5 to-[#2c2c2c]/20 backdrop-blur-sm z-10"></div>
                    <div className="aspect-[21/9] bg-[#2c2c2c] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#e8c34f 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                        <div className="z-20 text-center">
                            <button className="bg-[#e8c34f] text-[#2c2c2c] rounded-full p-6 shadow-xl hover:scale-110 transition-transform duration-300">
                                <PlayCircle size={48} strokeWidth={2} />
                            </button>
                            <p className="mt-6 font-bold text-[10px] uppercase tracking-widest text-[#e8c34f]">See how it works</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features / Marquee Style Section */}
            <section className="py-24 relative z-10 bg-[#2c2c2c] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <p className="text-[#e8c34f] font-bold text-[10px] uppercase tracking-widest mb-4">The JobNest Advantage</p>
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
                                Engineered <br/> for Success
                            </h3>
                        </div>
                        <p className="text-white/60 max-w-md font-medium">
                            We provide state-of-the-art tools designed specifically for high-achieving professionals and industry-leading corporations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-colors group">
                            <div className="w-16 h-16 bg-[#e8c34f] text-[#2c2c2c] rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
                                <Zap size={32} strokeWidth={2.5} />
                            </div>
                            <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">AI Matching</h4>
                            <p className="text-white/60 leading-relaxed font-medium">
                                Our proprietary algorithms connect the exact skills you possess with the specific needs of premium employers, eliminating friction.
                            </p>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-colors group">
                            <div className="w-16 h-16 bg-[#e8c34f] text-[#2c2c2c] rounded-2xl flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
                                <Star size={32} strokeWidth={2.5} />
                            </div>
                            <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Elite Companies</h4>
                            <p className="text-white/60 leading-relaxed font-medium">
                                Bypass the noise. Access verified listings from Fortune 500s and disruptive startups vetted for exceptional culture.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-colors group">
                            <div className="w-16 h-16 bg-[#e8c34f] text-[#2c2c2c] rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
                                <Users size={32} strokeWidth={2.5} />
                            </div>
                            <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Frictionless Hiring</h4>
                            <p className="text-white/60 leading-relaxed font-medium">
                                A streamlined applicant tracking dashboard built specifically for recruiters who demand efficiency and aesthetic perfection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white/40 py-12 px-6 md:px-12 relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <BriefcaseBusiness size={24} className="text-[#e8c34f]" />
                        <span className="font-bold text-xl tracking-tighter uppercase text-white">JobNest</span>
                    </div>
                    <div className="flex gap-8 font-bold text-[10px] uppercase tracking-widest text-white/60">
                        <Link to="/" className="hover:text-[#e8c34f] transition-colors">Privacy</Link>
                        <Link to="/" className="hover:text-[#e8c34f] transition-colors">Terms</Link>
                        <Link to="/" className="hover:text-[#e8c34f] transition-colors">Contact</Link>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} JobNest. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
