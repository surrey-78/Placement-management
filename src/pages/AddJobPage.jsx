import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 
import JobArray from "../components/JobArray";

const AddJob = () => {
  const { jobs, setJobs } = JobArray();
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [domain, setDomain] = useState("");
  const [postedDate, setPostedDate] = useState(""); 
  const navigate = useNavigate();

  const handleAddJob = () => {
    const newJob = {
      id: uuidv4(), // Generate a unique ID
      companyName,
      category,
      domain,
      postedDate, 
    };

    console.log("New Job Data:", newJob); 

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
