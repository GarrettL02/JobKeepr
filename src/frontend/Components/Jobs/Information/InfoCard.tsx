import { themeColors } from "../../../Themes/themes";

interface InfoItem {
  sectionLabel: string;
  data: React.ReactNode;
}

export function InfoCard({ data, sectionLabel }: InfoItem) {
  return (
    <div
      style={{
        backgroundColor: themeColors.darkMode.background2,
        border: "1px solid white",
        borderRadius: "4px",
        width: "90%",
        padding: "20px",
        margin: "auto",
      }}
    >
      <div style={{ fontWeight: "600", fontSize: "20px" }}>{sectionLabel}</div>
      <div>{data}</div>
    </div>
  );
}
