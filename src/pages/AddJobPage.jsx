import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobArray from "../components/JobArray";

const AddJob = () => {
  const { jobs, setJobs } = JobArray();
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [domain, setDomain] = useState("");
  const [postedDate, setPostedDate] = useState(""); // Date state
  const navigate = useNavigate();

  const handleAddJob = () => {
    const newJob = {
      id: Date.now(), // Unique ID
      companyName,
      category,
      domain,
      postedDate, // Store user-entered date
    };

    console.log("New Job Data:", newJob); // Debugging line

    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Add Job</h2>
      <input 
        type="text" 
        placeholder="Company Name" 
        onChange={(e) => setCompanyName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Category" 
        onChange={(e) => setCategory(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Domain" 
        onChange={(e) => setDomain(e.target.value)} 
      />
      <input 
        type="date" 
        onChange={(e) => setPostedDate(e.target.value)} 
      /> 
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
};

export default AddJob;