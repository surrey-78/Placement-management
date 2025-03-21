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
  const filteredJobs = jobs.filter(
    (job) =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (  
    <div>
      <h2 className="center-text">Job Listings</h2>

      <input
        type="text"
        placeholder="Search jobs by company, category, or domain..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <table className="width-adjust">
        <thead>
          <tr>
            <th>Company</th>
            <th>Category</th>
            <th>Posted Date</th>
            <th>Domain</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.companyName}</td>
                <td>{job.category}</td>
                <td>{job.postedDate}</td>
                <td>{job.domain}</td>
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
              <td colSpan="5">No job listings found.</td>
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
