import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, FileText, Loader2, Download } from 'lucide-react';
import api from '../../../services/api';
import Layout from '../../../layout/RecruiterLayout';

function Applications() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobTitleFilter = searchParams.get('jobTitle');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationsData = async () => {
      try {
        const appsRes = await api.get('/applications/applications/');
        setApplications(appsRes.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicationsData();
  }, []);

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'accepted': return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-green-100 text-green-800 rounded-full border border-green-200">Accepted</span>;
      case 'pending': return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#e8c34f]/20 text-[#2c2c2c] rounded-full border border-[#e8c34f]/50">Pending</span>;
      case 'rejected': return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-red-100 text-red-800 rounded-full border border-red-200">Rejected</span>;
      default: return <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-gray-100 text-gray-800 rounded-full border border-gray-200">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'NA';
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await api.patch(`/applications/applications/${appId}/status/`, { status: newStatus });
      // Update local state to reflect change immediately
      setApplications(applications.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
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

  const filteredApps = jobTitleFilter 
    ? applications.filter(app => app.job_title === jobTitleFilter) 
    : applications;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10 relative z-10 pb-12 font-sans">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="w-fit flex items-center gap-2 text-[#2D2C2A]/50 hover:text-[#2c2c2c] font-bold text-[10px] uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            BACK
          </button>
          <p className="text-[#2D2C2A]/60 font-bold uppercase tracking-widest text-sm">Applications</p>
          <h1 className="text-5xl font-bold text-[#2c2c2c] tracking-tighter uppercase leading-none max-w-2xl">
            {jobTitleFilter ? <><span className="text-[#e8c34f]">Applicants</span> for {jobTitleFilter}</> : <>All <span className="text-[#e8c34f]">Applications</span></>}
          </h1>
        </div>

        {/* Applications List */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-[#2D2C2A]/10">
          {filteredApps.length === 0 ? (
            <div className="p-16 text-center text-[#2D2C2A]/50 flex flex-col items-center">
              <div className="w-20 h-20 bg-[#2c2c2c] text-[#e8c34f] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <FileText size={36} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase mb-2">No applications yet</h3>
              <p className="font-medium text-[#2D2C2A]/60">Candidates haven't applied to this job yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#2D2C2A]/10">
              {filteredApps.map(app => (
                <div key={app.id} className="p-6 md:p-8 hover:bg-white/60 transition-colors duration-300 first:rounded-t-3xl last:rounded-b-3xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="flex items-start gap-5 flex-1">
                      <div className="w-14 h-14 rounded-full bg-[#2c2c2c] text-[#e8c34f] flex items-center justify-center font-bold text-xl flex-shrink-0 mt-1 shadow-sm">
                        {getInitials(app.first_name, app.last_name)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2c2c2c] tracking-tight uppercase">{app.first_name} {app.last_name}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#2D2C2A]/50 mt-1 mb-3">Applied for <span className="text-[#e8c34f]">{app.job_title}</span></p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#2D2C2A]/70">
                          <span className="bg-white/50 px-3 py-1.5 rounded-lg border border-[#2D2C2A]/10">{app.email}</span>
                          {app.phone && <span className="bg-white/50 px-3 py-1.5 rounded-lg border border-[#2D2C2A]/10">{app.phone}</span>}
                          {app.city && <span className="bg-white/50 px-3 py-1.5 rounded-lg border border-[#2D2C2A]/10">{app.city}</span>}
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          {getStatusBadge(app.status)}
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2D2C2A]/40">
                            <Clock size={12} strokeWidth={2.5} />
                            <span>{formatDate(app.applied_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 border-t border-[#2D2C2A]/10 md:border-t-0 pt-6 md:pt-0">
                      {app.resume && (
                        <a 
                          href={app.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#e8c34f] text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300"
                        >
                          <Download size={16} strokeWidth={2.5} />
                          RESUME
                        </a>
                      )}
                      {app.status !== 'accepted' && (
                        <button 
                          onClick={() => handleUpdateStatus(app.id, 'accepted')}
                          className="flex items-center gap-2 px-6 py-3 bg-[#2c2c2c] text-[#e8c34f] hover:bg-[#e8c34f] hover:text-[#2c2c2c] text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm"
                        >
                          <CheckCircle size={16} strokeWidth={2.5} />
                          ACCEPT
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button 
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                          className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm"
                        >
                          <XCircle size={16} strokeWidth={2.5} />
                          REJECT
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}

export default Applications;
