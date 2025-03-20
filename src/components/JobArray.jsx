import { useState, useEffect } from "react";

const getStoredJobs = () => {
  const storedJobs = localStorage.getItem("jobs");
  return storedJobs ? JSON.parse(storedJobs) : [];
};

const JobArray = () => {
  const [jobs, setJobs] = useState(getStoredJobs());

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return { jobs, setJobs };
};

export default JobArray;
