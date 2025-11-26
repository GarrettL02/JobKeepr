import { useNavigate } from "react-router-dom";
import { SearchTagSection } from "../Search/SearchTagSection";
import { JobListCard } from "./JobListCard";
import { useState, useEffect } from "react";
import { getFilteredJobsDataByStatus } from "../../../services/job.js";
import { Job } from "../../types/EntityTypes";
import { useTheme } from "../../Themes/ThemeContextType";

interface JobListProps {
  status: string;
}

export function JobList({ status }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { theme } = useTheme();

  //Using fetchJobs function to fetch the job data
  useEffect(() => {
    getFilteredJobsDataByStatus(status).then((fetchedJobs) => {
      setJobs(fetchedJobs);
    });
  }, [status]);

  const handleJobUpdate = (updatedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.job_id === updatedJob.job_id ? updatedJob : job
      )
    );
  };

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  //change te company logo based on customer name
  const companyLogo = (customerName: string) => {
    if (customerName === "AR316") {
      return "/AR316 Logo.png";
    } else if (customerName === "Pegasus Industronics") {
      return "/Pegasus Logo.png";
    } else {
      return "/Unknown Logo.png";
    }
  };

  const handleNewFormCreation = () => {
    navigate(`/jobs/${status}/create`);
  };

  // possibly make the form its own component
  return (
    <div
      style={{
        backgroundColor: theme.background2,
        padding: "10px",
        fontFamily: "'Valera Round', sans-serif",
        fontWeight: "550",
      }}
    >
      <form style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          type="search"
          style={{
            border: "2px solid white",
            borderRadius: "5px",
            height: "35px",
            padding: "8px",
            outline: "none",
            backgroundColor: "transparent",
            color: "white",
            borderColor: "#999999ff",
          }}
          placeholder="Enter Job#, S/N, etc.."
        />
        <button type="submit" style={{ background: "none", border: "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="false"
            role="img"
            style={{ color: "white" }}
          >
            <title>Search</title>
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </g>
          </svg>
        </button>
      </form>
      {status === "incoming" && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleNewFormCreation}
            style={{
              height: "50px",
              fontSize: "15px",
              fontFamily: "'Valera Round', sans-serif",
              fontWeight: "550",
              color: "#afaeaeff",
              backgroundColor: "#490404d0",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            Create New Job
          </button>
        </div>
      )}
      <SearchTagSection />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.background3,
          color: theme.text,
          borderBottom: "1px solid white",
          paddingTop: "10px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: "8%",
          }}
        />
        <div style={{ width: "40%", marginRight: "10px" }}>Job Title</div>
        <div style={{ width: "15%" }}>Difficulty</div>
        <div style={{ width: "15%" }}>Priority</div>
        <div style={{ width: "15%" }}>Date Created</div>
        <div style={{ width: "15%" }}>Assigned To</div>
      </div>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobListCard
            key={job.job_id}
            jobId={job.job_id}
            title={`#${job.jobNumber} - ${job.customerName} ${job.customerLocation} ${job.description}`}
            image={companyLogo(job.customerName)}
            jobData={job}
            onUpdate={handleJobUpdate}
          />
        ))
      ) : (
        <p style={{ display: "flex", justifyContent: "center" }}>
          No jobs in this category!
        </p>
      )}
    </div>
  );
}
