import { useNavigate } from "react-router-dom";
import { SearchTagSection } from "../Search/SearchTagSection";
import { JobListCard } from "./JobListCard";
import { useState, useEffect } from "react";
import { fetchJobs } from "../../api/fetchJobs.js";
import { Job } from "../../entities/job";

interface JobListProps {
  status: string;
}

export function JobList({ status }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  //Using fetchJobs function to fetch the job data
  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  const filtered = jobs.filter((job) => job.status === status);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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
        backgroundColor: "#1f1d1dff",
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
              border: "2px solid black",
              borderRadius: "10px",
              cursor: "pointer",
              transform: isHovered ? "scale(1.005)" : "scale(1)",
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
          backgroundColor: "#141313ff",
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
        <div style={{ width: "40%" }}>Job Title</div>
        <div style={{ width: "20%" }}>Difficulty</div>
        <div style={{ width: "20%" }}>Priority</div>
        <div style={{ width: "30%" }}>Date Created</div>
        <div style={{ width: "10%" }}>Assigned To</div>
      </div>
      {filtered.length > 0 ? (
        filtered.map((job) => (
          <JobListCard
            key={job.job_id}
            title={`Job#${job.job_id} ${job.customerName} ${job.customerLocation}`}
            priority={job.priority}
            difficulty={job.difficulty}
            dateCreated={job.createdDate}
            jobNumber={job.job_id}
            status={job.status}
            assignedTo={job.assignedTo}
            image={companyLogo(job.customerName)}
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
