import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Users, Edit, Trash2, Search, PlusCircle, MoreHorizontal, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import api from '../../../services/api';
import Layout from '../../../layout/RecruiterLayout';

function MyJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          api.get('/jobs/recruiter-jobs/'),
          api.get('/applications/applications/')
        ]);
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobsData();
  }, []);

  const getStatusBadge = (isOpen) => {
    return isOpen ? 
      <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-[#e8c34f]/20 text-[#2c2c2c] rounded-full border border-[#e8c34f]/50">Active</span> :
      <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-[#2D2C2A]/10 text-[#2D2C2A]/60 rounded-full border border-[#2D2C2A]/20">Closed</span>;
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      try {
        await api.delete(`/jobs/${jobId}/delete/`); 
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  const handleToggleStatus = async (jobId) => {
    try {
      await api.patch(`/jobs/jobs/${jobId}/toggle/`);
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, is_open: !job.is_open } : job
      ));
    } catch (error) {
      console.error('Error toggling job status:', error);
      alert('Failed to change job status. Please try again.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <Loader2 className="animate-spin text-[#2c2c2c]" size={48} strokeWidth={2.5} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => navigate('/recruiter/dashboard')} 
              className="w-fit flex items-center gap-2 text-[#2D2C2A]/50 hover:text-[#2c2c2c] font-bold text-[10px] uppercase tracking-widest transition-colors mb-2"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              BACK TO DASHBOARD
            </button>
            <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Manage</p>
            <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
              My <span className="text-[#e8c34f]">Jobs</span>
            </h1>
          </div>
          
          <Link 
            to="/recruiter/post-job" 
            className="flex items-center justify-center gap-2 bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
          >
            <PlusCircle size={18} strokeWidth={2.5} />
            Post New Job
          </Link>
        </div>

        {/* Jobs List */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10">
          {jobs.length === 0 ? (
            <div className="p-16 text-center text-[#2D2C2A]/50 flex flex-col items-center">
              <div className="w-20 h-20 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Briefcase size={36} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase mb-2">No jobs found</h3>
              <p className="mb-8 font-medium">You haven't posted any jobs yet.</p>
              <Link to="/recruiter/post-job" className="bg-[#e8c34f] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#e8c34f] px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-colors shadow-sm">
                POST YOUR FIRST JOB
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#2D2C2A]/10">
              {jobs.map(job => {
                const applicantsCount = applications.filter(app => app.job_title === job.title).length;
                return (
                  <div key={job.id} className="p-6 md:p-8 hover:bg-white/60 transition-colors duration-300 group first:rounded-t-3xl last:rounded-b-3xl">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                          <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase">{job.title}</h3>
                          {getStatusBadge(job.is_open)}
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-[#2D2C2A]/60">
                          <div className="flex items-center gap-2">
                            <Briefcase size={16} strokeWidth={2.5} className="text-[#e8c34f]" />
                            {job.job_type}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} strokeWidth={2.5} className="text-[#e8c34f]" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} strokeWidth={2.5} className="text-[#e8c34f]" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 border-t border-[#2D2C2A]/5 lg:border-t-0 pt-6 lg:pt-0">
                        <div className="flex items-center gap-3 bg-[#2c2c2c] text-[#e8c34f] px-5 py-2.5 rounded-2xl mr-4 shadow-sm">
                          <Users size={18} strokeWidth={2.5} />
                          <span className="font-bold text-xl">{applicantsCount}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">Applicants</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleToggleStatus(job.id)}
                            className={`p-3 rounded-full transition-all duration-300 ${job.is_open ? 'text-[#e8c34f] hover:bg-[#e8c34f] hover:text-[#2c2c2c] bg-[#2c2c2c]' : 'text-[#2D2C2A]/40 hover:bg-[#2c2c2c] hover:text-[#e8c34f] border border-[#2D2C2A]/10'}`}
                            title={job.is_open ? "Deactivate Job" : "Activate Job"}
                          >
                            {job.is_open ? <ToggleRight size={20} strokeWidth={2.5} /> : <ToggleLeft size={20} strokeWidth={2.5} />}
                          </button>
                          <Link to={`/recruiter/edit-job/${job.id}`}
                            className="p-3 text-[#2D2C2A]/50 hover:text-[#e8c34f] hover:bg-[#2c2c2c] border border-[#2D2C2A]/10 rounded-full transition-all duration-300"
                            title="Edit Job"
                          >
                            <Edit size={18} strokeWidth={2.5} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(job.id)}
                            className="p-3 text-[#2D2C2A]/50 hover:text-white hover:bg-red-500 border border-[#2D2C2A]/10 rounded-full transition-all duration-300"
                            title="Delete Job"
                          >
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                          <Link 
                            to={`/recruiter/applications?jobTitle=${encodeURIComponent(job.title)}`}
                            className="ml-2 px-6 py-3 bg-transparent border-2 border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#e8c34f] text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300"
                          >
                            View Applicants
                          </Link>
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
    </Layout>
  );
}

export default MyJobs;
