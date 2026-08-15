import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/register.jsx'
import CandidateDashboard from './pages/dashboard/Candidate/candidate.jsx'
import RecruiterDashboard from './pages/dashboard/Recruiter/recruiter.jsx'
import JobDetails from './pages/jobs/jobDetails.jsx'
import CandidateProfile from './pages/dashboard/Candidate/candidateProfile.jsx'
import RecruiterProfile from './pages/dashboard/Recruiter/recruiterProfile.jsx'
import MyApplications from './pages/dashboard/Candidate/MyApplications.jsx'
import PostJob from './pages/dashboard/Recruiter/PostJob.jsx'
import MyJobs from './pages/dashboard/Recruiter/MyJobs.jsx'
import Applications from './pages/dashboard/Recruiter/Applications.jsx'
import ApplicationProfileView from './pages/dashboard/Recruiter/ApplicationProfileView.jsx'
import EditJob from './pages/dashboard/Recruiter/EditJob.jsx'

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      <Route path="/recruiter/post-job" element={<PostJob />} />
      <Route path="/recruiter/edit-job/:id" element={<EditJob />} />
      <Route path="/recruiter/my-jobs" element={<MyJobs />} />
      <Route path="/recruiter/applications" element={<Applications />} />
      <Route path="/recruiter/application/:id" element={<ApplicationProfileView />} />
      <Route path="/recruiter/profile" element={<RecruiterProfile />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/candidate/profile" element={<CandidateProfile />} />
      <Route path="/candidate/applied-jobs" element={<MyApplications />} />
      <Route path="/candidate/myapplications" element={<MyApplications />} />
    </Routes>

  )
}

export default App
