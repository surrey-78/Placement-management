import { Link } from "react-router-dom";
import JobArray from "../components/JobArray";
import "../styles.css";

const HomePage = () => {
  const { jobs, setJobs } = JobArray();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const updatedJobs = jobs.filter(job => job.id !== id);
      setJobs(updatedJobs);
    }
  };

  return (
    <div className="container">
      <h2>Job Listings</h2>
      <table>
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
          {jobs.length > 0 ? (
            jobs.map(job => (
              <tr key={job.id}>
                <td>{job.companyName}</td>
                <td>{job.category}</td>
                <td>{job.postedDate}</td> {/* Fixed JDdate issue */}
                <td>{job.domain}</td>
                <td>
                  <Link to={`/edit/${job.id}`} className="edit-btn">Edit</Link>
                  <button onClick={() => handleDelete(job.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No job listings available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/add" className="add-btn">Add New Job</Link>
    </div>
  );
};

export default HomePage;
