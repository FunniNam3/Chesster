export function Play() {
  return (
    <div style={{ justifyItems: "center" }}>
      <div style={styles.container}>
        <h1>Hallo</h1>
      </div>
    </div>
  );
}

export const styles: { container: React.CSSProperties } = {
  container: {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    backgroundColor: "#1a1a1a",
    width: "fit-content",
    height: "fit-content",
    justifyContent: "center",
  },
};
