import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  PlusCircle, 
  Search,
  MoreHorizontal,
  MapPin,
  DollarSign,
  Loader2
} from 'lucide-react';
import api from '../../../services/api';
import Layout from '../../../layout/RecruiterLayout';

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || '';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          api.get('/jobs/recruiter-jobs/'),
          api.get('/applications/applications/')
        ]);
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const activeJobs = jobs.filter(job => job.is_open).length;
  const totalApplicants = applications.length;
  const accepted = applications.filter(app => app.status === 'accepted').length;
  const pendingReview = applications.filter(app => app.status === 'pending').length;

  const stats = [
    { title: 'Active Jobs', value: activeJobs.toString(), icon: Briefcase },
    { title: 'Applicants', value: totalApplicants.toString(), icon: Users },
    { title: 'Accepted', value: accepted.toString(), icon: CheckCircle },
    { title: 'Pending', value: pendingReview.toString(), icon: Clock },
  ];

  const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredApps = applications.filter(app => 
    app.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentJobs = [...filteredJobs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  const recentApplications = [...filteredApps].sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at)).slice(0, 4);

  const getStatusBadge = (status) => {
    if (typeof status === 'boolean') {
      return status ? 
        <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#2c2c2c] text-[#e8c34f] rounded-full border border-transparent shadow-sm">Active</span> :
        <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-transparent text-[#2D2C2A]/60 rounded-full border border-[#2D2C2A]/20">Closed</span>;
    }
    
    switch(status?.toLowerCase()) {
      case 'accepted': return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#e8c34f] text-[#2c2c2c] rounded-full shadow-sm">Accepted</span>;
      case 'pending': return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#2c2c2c] text-white rounded-full shadow-sm">Pending</span>;
      case 'rejected': return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-transparent text-red-500 border border-red-200 rounded-full">Rejected</span>;
      default: return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-transparent text-[#2D2C2A]/60 rounded-full border border-[#2D2C2A]/20">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'NA';
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <Loader2 className="animate-spin text-[#2c2c2c]" size={48} strokeWidth={2.5} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-10 relative z-10 pb-12">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Dashboard</p>
            <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
              Welcome <span className="text-[#e8c34f]">Back</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              {/* Search bar removed as per request */}
            </div>
            <Link to="/recruiter/post-job" className="flex items-center gap-2 bg-[#2c2c2c] text-[#e8c34f] px-6 py-3.5 rounded-full hover:bg-[#e8c34f] hover:text-[#2c2c2c] transition-all shadow-sm font-bold uppercase tracking-widest text-sm">
              <PlusCircle size={18} strokeWidth={2.5} />
              Post Job
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-[#2D2C2A]/10 hover:shadow-lg hover:border-[#2D2C2A]/30 transition-all group">
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded-full bg-[#2c2c2c] text-[#e8c34f] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <stat.icon size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter leading-none mb-2">{stat.value}</h3>
                  <p className="text-xs font-bold text-[#2D2C2A]/50 uppercase tracking-widest">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#2c2c2c] tracking-tight uppercase">Recent Postings</h2>
              <Link to="/recruiter/my-jobs" className="text-xs font-bold text-[#2D2C2A]/60 uppercase tracking-widest hover:text-[#2c2c2c] transition-colors">View All</Link>
            </div>
            
            <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10">
              {recentJobs.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-20 h-20 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Briefcase size={32} strokeWidth={2.5} />
                  </div>
                  <p className="text-xl font-bold text-[#2c2c2c] mb-2">NO JOBS POSTED</p>
                  <Link to="/recruiter/post-job" className="text-sm font-bold text-[#2D2C2A]/60 hover:text-[#e8c34f] uppercase tracking-widest transition-colors">Create your first</Link>
                </div>
              ) : (
                <div className="divide-y divide-[#2D2C2A]/5">
                  {recentJobs.map(job => {
                    const applicantsCount = applications.filter(app => app.job_title === job.title).length;
                    return (
                      <div key={job.id} className="p-8 hover:bg-white/60 transition-colors cursor-pointer group first:rounded-t-3xl last:rounded-b-3xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight group-hover:text-[#2D2C2A]/80 transition-colors">{job.title}</h3>
                              {getStatusBadge(job.is_open)}
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-[#2D2C2A]/50 uppercase tracking-widest">
                              <div className="flex items-center gap-2">
                                <Briefcase size={14} strokeWidth={2.5} />
                                {job.job_type}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} strokeWidth={2.5} />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign size={14} strokeWidth={2.5} />
                                {job.salary}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-8">
                            <div className="text-center sm:text-right">
                              <p className="text-4xl font-bold text-[#2c2c2c]">{applicantsCount}</p>
                              <p className="text-[10px] font-bold text-[#2D2C2A]/40 uppercase tracking-widest mt-1">Applicants</p>
                            </div>
                            <div className="relative">
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDropdown(activeDropdown === job.id ? null : job.id);
                                }}
                                className="w-10 h-10 rounded-full border border-[#2D2C2A]/10 flex items-center justify-center text-[#2D2C2A]/40 hover:text-[#2c2c2c] hover:bg-white transition-all shadow-sm"
                              >
                                <MoreHorizontal size={20} strokeWidth={2.5} />
                              </button>
                              
                              {activeDropdown === job.id && (
                                <div className="absolute right-0 top-12 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-[#2D2C2A]/10 py-2 z-50 animate-fade-in-up">
                                  <Link 
                                    to={`/recruiter/edit-job/${job.id}`} 
                                    className="flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2D2C2A]/70 hover:text-[#2c2c2c] hover:bg-[#2D2C2A]/5 transition-colors"
                                  >
                                    Edit Job
                                  </Link>
                                  <Link 
                                    to={`/recruiter/applications?jobTitle=${encodeURIComponent(job.title)}`} 
                                    className="flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2D2C2A]/70 hover:text-[#e8c34f] hover:bg-[#2c2c2c] transition-colors"
                                  >
                                    View Applicants
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Applications Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#2c2c2c] tracking-tight uppercase">Applicants</h2>
            </div>
            
            <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-[#2D2C2A]/10">
              {recentApplications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Users size={24} strokeWidth={2.5} />
                  </div>
                  <p className="font-bold text-lg text-[#2c2c2c]">NO APPLICANTS</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map(app => (
                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-[#2D2C2A]/5">
                      <div className="w-12 h-12 rounded-full bg-[#2c2c2c] text-[#e8c34f] flex items-center justify-center font-bold text-sm tracking-widest flex-shrink-0 shadow-sm">
                        {getInitials(app.first_name, app.last_name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#2c2c2c] truncate tracking-wide">{app.first_name} {app.last_name}</h4>
                        <p className="text-[10px] font-bold text-[#2D2C2A]/50 uppercase tracking-widest truncate mt-1">for <span className="text-[#2D2C2A]">{app.job_title}</span></p>
                        <div className="flex items-center justify-between mt-3">
                          {getStatusBadge(app.status)}
                          <span className="text-[10px] font-bold text-[#2D2C2A]/40 tracking-widest uppercase">{formatDate(app.applied_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Link to="/recruiter/applications" className="w-full mt-6 py-4 bg-transparent border border-[#2D2C2A]/10 text-[#2D2C2A]/60 font-bold text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#2c2c2c] hover:text-[#e8c34f] hover:border-transparent transition-all block text-center">
                View All Applications
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export default RecruiterDashboard;