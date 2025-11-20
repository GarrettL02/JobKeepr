import { useParams } from "react-router-dom";
import { BackButton } from "../BackButton/BackButton";
import { ReadOnlyTextLabel } from "../ReadOnlyComponents/ReadOnlyTextLabel";
import { InfoCard } from "./Information/InfoCard";

interface JobDetailsPageProps {}

export function JobDetailsPage() {
  const { jobNumber } = useParams<{ jobNumber?: string }>();

  return (
    <div
      style={{
        paddingTop: "100px",
        backgroundColor: "rgba(14, 12, 12, 0.9)",
        fontFamily: "'Valera Round', sans-serif",
        color: "white",
        width: "97.5%",
        minHeight: "100vh",
        boxSizing: "border-box",
        margin: 0,
        position: "absolute",
        paddingLeft: "10px",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <div>
        <BackButton buttonText="Return to List" to={`/jobs/`} />
      </div>
      <div
        style={{
          paddingLeft: "80px",
          paddingBottom: "10px",
          paddingTop: "20px",
          fontSize: "35px",
        }}
      >
        Job#0000: Job Title
      </div>
      <InfoCard
        sectionLabel="Job Information"
        data={<ReadOnlyTextLabel label="label" value="value" />}
      />
    </div>
  );
}
