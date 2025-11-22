import { useParams } from "react-router-dom";
import { BackButton } from "../BackButton/BackButton";
import { ReadOnlyTextLabel } from "../ReadOnlyComponents/ReadOnlyTextLabel";
import { InfoCard } from "./Information/InfoCard";
import { useEffect, useState } from "react";
import { getJobData } from "../../../services/getJobData";
import { Job } from "../../types/EntityTypes";
import { themeColors } from "../../Themes/themes";

interface JobDetailsPageProps {}

export function JobDetailsPage() {
  const { jobNumber } = useParams<{ jobNumber?: string }>();
  const [jobData, setJobData] = useState<Job | null>(null);

  useEffect(() => {
    if (!jobNumber) return; // safeguard

    getJobData(jobNumber).then((data) => setJobData(data));
  }, [jobNumber]);

  console.log("JobData: " + jobData);

  return (
    <div
      style={{
        paddingTop: "100px",
        backgroundColor: themeColors.darkMode.background1,
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
        Job#{jobData?.jobNumber}: {jobData?.customerName} -{" "}
        {jobData?.customerLocation}
      </div>
      <InfoCard
        sectionLabel="Job Information"
        data={<ReadOnlyTextLabel label="label" value="value" />}
      />
    </div>
  );
}
