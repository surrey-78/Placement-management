import { useState } from "react";
import { Link } from "react-router-dom";
import JobArray from "../components/JobArray";
import "../styles.css";

const HomePage = () => {
  const { jobs, setJobs } = JobArray();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const updatedJobs = jobs.filter((job) => job.id !== id);
      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs)); // Persist the data
    }
  };

  // Filter jobs based on search term (case-insensitive)
  const filteredJobs = jobs?.filter(
    (job) =>
      job?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.jobType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.salaryRange?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.domain?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  

  return (
    <div>
      <h2 className="center-text">Job Listings</h2>

      <input
        type="text"
        placeholder="Search jobs by title, company, location, type, category, or domain..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <table className="width-adjust">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Job Type</th>
            <th>Salary</th>
            <th>Category</th>
            <th>Domain</th>
            <th>Posted Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.jobTitle}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>{job.jobType}</td>
                <td>{job.salaryRange}</td>
                <td>{job.category}</td>
                <td>{job.domain}</td>
                <td>{job.JDdte}</td>
                <td className="actions">
                  <Link to={`/edit/${job.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No job listings found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/add">
        <button className="add-btn">Add New Job</button>
      </Link>
    </div>
  );
};

export default HomePage;