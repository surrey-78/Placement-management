import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 
import JobArray from "../components/JobArray";
import './AddJob.css';

const AddJob = () => {
  const { jobs, setJobs } = JobArray();
  const navigate = useNavigate();

  // State to manage form fields
  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryRange: "",
    category: "",
    domain: "",
    postedDate: "",
  });

  // Handles input change
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleAddJob = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    for (const field in jobData) {
      if (!jobData[field]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, " $1")}.`);
        return;
      }
    }

    const newJob = { id: uuidv4(), ...jobData };
    console.log("New Job Data:", newJob);

    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Add Job</h2>
      <form onSubmit={handleAddJob}>
        <input 
          type="text" 
          name="jobTitle" 
          placeholder="Job Title" 
          value={jobData.jobTitle} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="companyName" 
          placeholder="Company Name" 
          value={jobData.companyName} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="location" 
          placeholder="Location" 
          value={jobData.location} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="jobType" 
          placeholder="Job Type (e.g., Full-time, Part-time)" 
          value={jobData.jobType} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="salaryRange" 
          placeholder="Salary Range (e.g., $50,000 - $60,000)" 
          value={jobData.salaryRange} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={jobData.category} 
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="domain" 
          placeholder="Domain" 
          value={jobData.domain} 
          onChange={handleChange} 
          required
        />
        <input 
          type="date" 
          name="postedDate" 
          value={jobData.postedDate} 
          onChange={handleChange} 
          required
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
