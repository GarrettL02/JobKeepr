import { useState } from "react";
import { useTheme } from "../../Themes/ThemeContextType";
import { Modal } from "../Modal/Modal";
import { updateJob } from "../../../services/job";
import { Job } from "../../types/EntityTypes";

export interface AssignedToListSectionProps {
  assignedTo?: string;
  jobId: string;
  onUpdate: (updatedJob: Job) => void;
}

export function AssignedToListSection({
  assignedTo,
  jobId,
  onUpdate,
}: AssignedToListSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { theme } = useTheme();

  const handleAssignEvaluatorModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleAssignEvaluator = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isassigned: boolean
  ) => {
    //stop the parent onclick from taking over
    e.stopPropagation();

    //Depending on if assign or not, it will switch the value
    //-- switch garrett value to account
    const assignValue = isassigned ? "" : "Garrett";

    try {
      const updatedJob = await updateJob(jobId, {
        assignedTo: assignValue,
      });

      onUpdate(updatedJob);
      setModalOpen(false);
    } catch (error) {
      alert("Failed to assign evaluator.");
    }
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => undefined}
        label={`Are you sure you want to ${
          assignedTo ? "unassign" : "assign"
        } this job to you?`}
        options={
          <div style={{ marginBottom: "10px" }}>
            <button
              style={{
                width: 100,
                height: 45,
                borderRadius: "10px",
                cursor: "pointer",
                marginRight: "10px",
                backgroundColor: "#490404d0",
                color: "white",
                border: "1px solid white",
              }}
              onClick={(e) =>
                handleAssignEvaluator(e, assignedTo ? true : false)
              }
            >
              Yes
            </button>
            <button
              style={{
                width: 100,
                height: 45,
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: "#490404d0",
                color: "white",
                border: "1px solid white",
              }}
              onClick={() => setModalOpen(false)}
            >
              No
            </button>
          </div>
        }
      />
      {!assignedTo ? (
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => handleAssignEvaluatorModal(e)}
          style={{
            width: "40%",
            borderRadius: "5px",
            height: "40px",
            fontWeight: 600,
            cursor: "pointer",
            gap: 10,
            backgroundColor: "#490404d0",
            border: "none",
            color: theme.text,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          Assign
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 50,
          }}
        >
          {assignedTo}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => handleAssignEvaluatorModal(e)}
            style={{
              width: "40%",
              borderRadius: "5px",
              height: "40px",
              fontWeight: 600,
              cursor: "pointer",
              gap: 10,
              border: "none",
              color: theme.text,
              backgroundColor: "#490404d0",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            Unassign
          </button>
        </div>
      )}
    </>
  );
}
