import { UUID } from "crypto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Job } from "../../types/EntityTypes";
import { formatDate } from "../../Functions/functions";
import { StarRating } from "../Rating/Rating";
import { useTheme } from "../../Themes/ThemeContextType";
import { AssignedToListSection } from "./AssignedToListSection";

interface JobListCardProps {
  jobId: UUID;
  title: string;
  image: string;
  jobData: Job;
  onUpdate: (updatedJob: Job) => void;
}

export function JobListCard({
  title,
  image,
  jobData,
  onUpdate,
}: JobListCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useTheme();

  const handleClick = () => {
    navigate(`/jobs/${jobData.status}/${jobData.jobNumber}`);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.list,
          color: theme.text,
          padding: "10px",
          border: "2px solid #0f0f0fff",
          transform: isHovered ? "scale(1.005)" : "scale(1)",
          transition: "transform 0.2s ease-in-out",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "7%",
            height: "80px",
            marginRight: "10px",
          }}
        >
          <img src={image} style={{ width: 90 }} alt="Company Logo" />
        </div>
        <div
          style={{
            width: "40%",
            overflow: "hidden",
            whiteSpace: "noWrap",
            textOverflow: "ellipsis",
            marginRight: "10px",
          }}
        >
          {title}
        </div>
        <div style={{ width: "15%" }}>
          {<StarRating value={jobData.priority} />}
        </div>
        <div style={{ width: "15%" }}>
          {<StarRating value={jobData.difficulty} />}
        </div>
        <div style={{ width: "15%" }}>{formatDate(jobData.createdDate)}</div>
        <div style={{ width: "15%" }}>
          <AssignedToListSection
            assignedTo={jobData.assignedTo}
            jobId={jobData.job_id}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </>
  );
}
