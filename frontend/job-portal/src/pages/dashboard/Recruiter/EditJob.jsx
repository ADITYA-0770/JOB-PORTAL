import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, FileText, CheckCircle, Loader2 } from 'lucide-react';
import api from '../../../services/api';
import Layout from '../../../layout/RecruiterLayout';

function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    experience_required: '',
    job_type: 'full-time',
    deadline: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}/`);
        const job = response.data;
        // Format deadline for datetime-local input if it exists
        const formattedDeadline = job.deadline ? new Date(job.deadline).toISOString().slice(0, 16) : '';
        setFormData({
          title: job.title || '',
          description: job.description || '',
          location: job.location || '',
          salary: job.salary || '',
          experience_required: job.experience_required || '',
          job_type: job.job_type || 'full-time',
          deadline: formattedDeadline
        });
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to fetch job details. Please go back and try again.');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/jobs/jobs/${id}/`, formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/recruiter/my-jobs');
      }, 2000);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || 'Failed to update job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <Loader2 className="animate-spin text-[#2c2c2c]" size={48} strokeWidth={2.5} />
        </div>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] relative z-10 px-6">
          <div className="bg-white/40 backdrop-blur-md p-12 rounded-3xl shadow-sm border border-[#2D2C2A]/10 text-center max-w-lg w-full relative overflow-hidden">
            <div className="flex justify-center mb-8 relative z-10">
              <div className="bg-[#2c2c2c] text-[#e8c34f] p-5 rounded-full shadow-lg">
                <CheckCircle size={56} strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#2c2c2c] tracking-tight uppercase mb-4 relative z-10">Job Updated Successfully!</h2>
            <p className="text-[#2D2C2A]/60 font-medium mb-8 relative z-10">Your job listing has been updated with the new details.</p>
            <div className="w-full bg-[#2D2C2A]/5 h-2 rounded-full overflow-hidden relative z-10">
              <div className="bg-[#e8c34f] h-full rounded-full animate-pulse" style={{ width: '100%', transition: 'width 2s linear' }}></div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D2C2A]/40 mt-6 relative z-10">Redirecting to My Jobs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="w-fit flex items-center gap-2 text-[#2D2C2A]/50 hover:text-[#2c2c2c] font-bold text-[10px] uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            BACK
          </button>
          <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Update</p>
          <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none">
            Edit <span className="text-[#e8c34f]">Job</span>
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 flex items-center justify-center">
                {error}
              </div>
            )}

            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Job Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase size={18} strokeWidth={2.5} className="text-[#2D2C2A]/30" />
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-12 block w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-3 focus:border-[#e8c34f] outline-none transition-colors font-bold text-xl text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                  placeholder="E.G. SENIOR FRONTEND DEVELOPER"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin size={18} strokeWidth={2.5} className="text-[#2D2C2A]/30" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-12 block w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-3 focus:border-[#e8c34f] outline-none transition-colors font-bold text-lg text-[#2c2c2c] placeholder-[#2D2C2A]/30 uppercase"
                    placeholder="E.G. NEW YORK"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="job_type" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Job Type</label>
                <select
                  name="job_type"
                  id="job_type"
                  required
                  value={formData.job_type}
                  onChange={handleChange}
                  className="block w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-3 focus:border-[#e8c34f] outline-none transition-colors font-bold text-lg text-[#2c2c2c] uppercase"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Salary */}
              <div className="flex flex-col gap-2">
                <label htmlFor="salary" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Salary Range</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign size={18} strokeWidth={2.5} className="text-[#2D2C2A]/30" />
                  </div>
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    required
                    value={formData.salary}
                    onChange={handleChange}
                    className="pl-12 block w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-3 focus:border-[#e8c34f] outline-none transition-colors font-bold text-lg text-[#2c2c2c] placeholder-[#2D2C2A]/30 uppercase"
                    placeholder="E.G. $100K - $120K"
                  />
                </div>
              </div>

              {/* Experience Required */}
              <div className="flex flex-col gap-2">
                <label htmlFor="experience_required" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Experience (Years)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase size={18} strokeWidth={2.5} className="text-[#2D2C2A]/30" />
                  </div>
                  <input
                    type="number"
                    name="experience_required"
                    id="experience_required"
                    required
                    value={formData.experience_required}
                    onChange={handleChange}
                    className="pl-12 block w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-3 focus:border-[#e8c34f] outline-none transition-colors font-bold text-lg text-[#2c2c2c] placeholder-[#2D2C2A]/30"
                    placeholder="3"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="deadline" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Application Deadline</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Clock size={18} strokeWidth={2.5} className="text-[#2D2C2A]/30" />
                  </div>
                  <input
                    type="datetime-local"
                    name="deadline"
                    id="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="pl-12 block w-full bg-transparent border-b-2 border-[#2D2C2A]/20 py-3 focus:border-[#e8c34f] outline-none transition-colors font-bold text-lg text-[#2c2c2c]"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="font-bold text-[10px] uppercase tracking-widest text-[#2D2C2A]/50">Job Description</label>
              <div className="relative">
                <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                  <FileText size={18} strokeWidth={2.5} className="text-[#2D2C2A]/30" />
                </div>
                <textarea
                  name="description"
                  id="description"
                  rows={8}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="pl-12 block w-full bg-[#2D2C2A]/5 border border-[#2D2C2A]/10 rounded-2xl py-4 pr-4 focus:border-[#e8c34f] outline-none transition-colors font-medium text-sm text-[#2c2c2c] placeholder-[#2D2C2A]/30 resize-y"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-8 mt-4 border-t border-[#2D2C2A]/10 flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-transparent border border-[#2D2C2A]/20 text-[#2D2C2A]/60 hover:bg-[#2c2c2c] hover:text-white hover:border-[#2c2c2c] px-8 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-none"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#2c2c2c] hover:bg-[#e8c34f] text-[#e8c34f] hover:text-[#2c2c2c] px-10 py-4 rounded-full flex items-center justify-center gap-3 font-bold text-[10px] tracking-widest uppercase transition-all duration-300 shadow-sm flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    UPDATING...
                  </>
                ) : 'UPDATE JOB'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditJob;
