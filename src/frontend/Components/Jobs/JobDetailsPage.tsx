import { data, useParams } from "react-router-dom";
import { BackButton } from "../BackButton/BackButton";
import { ReadOnlyTextLabel } from "../ReadOnlyComponents/ReadOnlyTextLabel";
import { InfoCard } from "../Information/InfoCard";
import { ReactNode, useEffect, useState } from "react";
import { getJobData } from "../../../services/job";
import { Job } from "../../types/EntityTypes";
import { themeColors } from "../../Themes/themes";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface JobDetailsPageProps {}

export function JobDetailsPage() {
  const { jobNumber } = useParams<{ jobNumber?: string }>();
  const [jobData, setJobData] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataError, setDataError] = useState<boolean>(true);

  useEffect(() => {
    if (!jobNumber) return; // safeguard

    let mounted = true;
    const fetchJob = async () => {
      setIsLoading(true);
      setDataError(false);
      try {
        const data = await getJobData(jobNumber);
        if (mounted) setJobData(data);
      } catch (err) {
        console.error("Failed to load job data", err);
        if (mounted) setDataError(true);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchJob();
    return () => {
      mounted = false; // cleanup to prevent state updates on unmounted component
    };
  }, [jobNumber]);

  if (isLoading)
    return (
      <div>
        <div>
          <BackButton buttonText="Return to List" to={`/jobs/`} />
        </div>
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingSpinner />
        </div>
      </div>
    );
  if (dataError)
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
        An Error has Occured
      </div>
    );
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
          display: "flex",
          alignItems: "center",
        }}
      >
        Job#{jobData?.jobNumber}: {jobData?.customerName} -{" "}
        {jobData?.customerLocation}: {jobData?.description}
        <div
          style={{
            backgroundColor: "#490404d0",
            height: "30px",
            width: "100px",
            borderRadius: "30px",
            border: "2px solid white",
            fontSize: "16px",
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "20px",
          }}
        >
          {jobData?.status}
        </div>
      </div>
      <InfoCard
        sectionLabel="Job Information"
        data={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginInline: "150px",
            }}
          >
            <ReadOnlyTextLabel label="RMA" value={jobData?.rma || "N/A"} />
            <ReadOnlyTextLabel
              label="Tag No."
              value={jobData?.tagNumber || "N/A"}
            />
            <ReadOnlyTextLabel
              label="Purchase Order No."
              value={jobData?.purchaseOrder || "N/A"}
            />
            <ReadOnlyTextLabel
              label="Difficulty"
              value={jobData?.difficulty || "N/A"}
            />
            <ReadOnlyTextLabel
              label="Priority"
              value={jobData?.priority || "N/A"}
            />
          </div>
        }
      />
    </div>
  );
}
