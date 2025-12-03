interface ReadOnlyTextLabelProps {
  label: string;
  value: string | number;
}

export function ReadOnlyTextLabel({ label, value }: ReadOnlyTextLabelProps) {
  return (
    <div style={{ fontFamily: "'Valera Round', sans-serif", padding: "10px" }}>
      <div
        style={{ paddingBottom: "8px", fontSize: "20px", color: "#807c7cff" }}
      >
        {label}
      </div>
      <div style={{ fontWeight: "600", color: "#c7c2c2ff" }}>{value}</div>
    </div>
  );
}
