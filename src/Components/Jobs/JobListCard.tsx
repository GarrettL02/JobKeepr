import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface JobListCardProps {
  title: string;
  dateCreated?: string;
  priority: number;
  jobNumber: number;
  status: string;
  assignedTo?: string;
  difficulty: number;
  image: string;
}

export function JobListCard({
  title,
  priority,
  dateCreated,
  jobNumber,
  status,
  assignedTo,
  difficulty,
  image,
}: JobListCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/jobs/${status}/${jobNumber}`);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#141313ff",
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
          border: "4px solid black",
          marginRight: "10px",
        }}
      >
        <img src={image} style={{ width: "100%" }} alt="Company Logo" />
      </div>
      <div style={{ width: "40%" }}>{title}</div>
      <div style={{ width: "20%" }}>{priority}</div>
      <div style={{ width: "20%" }}>{difficulty}</div>
      <div style={{ width: "30%" }}>{dateCreated}</div>
      <div style={{ width: "10%" }}>{assignedTo}</div>
    </div>
  );
}
