interface FooterProps {
  options: React.ReactNode;
}

export function Footer({ options }: FooterProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        height: "60px",
        display: "flex",
        backgroundColor: "#131212ff",
        width: "97.5%",
        borderTop: "1px solid #363535ff",
        paddingLeft: "0px",
        fontFamily: "'Valera Round', sans-serif",
        color: "white",
        justifyContent: "right",
      }}
    >
      <div style={{ padding: "20px" }}>{options}</div>
    </div>
  );
}
