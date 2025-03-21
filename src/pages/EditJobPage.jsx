import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobArray from "../components/JobArray";

const EditJobPage = () => {
  const { jobs, setJobs } = JobArray();
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryRange: "",
    category: "",
    domain: "",
    JDdate: "",
  });

  useEffect(() => {
    const job = jobs.find((job) => job.id === parseInt(id));
    if (job) {
      setJobData(job);
    } else {
      alert("Job not found!");
      navigate("/");
    }
  }, [id, jobs, navigate]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobs = jobs.map((job) =>
      job.id === parseInt(id) ? jobData : job
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs)); // Persist the data
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={jobData.jobTitle}
          onChange={handleChange}
          required
        />

        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={jobData.companyName}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          required
        />

        <label>Job Type</label>
        <input
          type="text"
          name="jobType"
          value={jobData.jobType}
          onChange={handleChange}
          required
        />

        <label>Salary Range</label>
        <input
          type="text"
          name="salaryRange"
          value={jobData.salaryRange}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={jobData.category}
          onChange={handleChange}
          required
        />

        <label>Domain</label>
        <input
          type="text"
          name="domain"
          value={jobData.domain}
          onChange={handleChange}
          required
        />

        <label>Job Posting Date</label>
        <input
          type="date"
          name="JDdate"
          value={jobData.JDdate}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;
