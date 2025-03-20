import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobArray from "../components/JobArray";

const EditJobPage = () => {
  const { jobs, setJobs } = JobArray();
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobData, setJobData] = useState({ companyName: "", category: "", JDdate: "", domain: "" });

  useEffect(() => {
    const job = jobs.find(job => job.id === parseInt(id));
    if (job) setJobData(job);
  }, [id, jobs]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobs = jobs.map(job => job.id === parseInt(id) ? jobData : job);
    setJobs(updatedJobs);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="companyName" value={jobData.companyName} onChange={handleChange} required />
        <input type="text" name="category" value={jobData.category} onChange={handleChange} required />
        <input type="date" name="JDdate" value={jobData.JDdate} onChange={handleChange} required />
        <input type="text" name="domain" value={jobData.domain} onChange={handleChange} required />
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;
