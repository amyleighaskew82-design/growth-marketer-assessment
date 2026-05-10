export default function MobilePreview() {
  const src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#d1d5db",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 0 64px",
        gap: 12,
      }}
    >
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 13,
          color: "#6b7280",
          letterSpacing: "0.05em",
        }}
      >
        iPhone 14 Pro — 390 × 844
      </p>
      <iframe
        src={src}
        title="Mobile preview"
        style={{
          width: 390,
          height: 844,
          border: "none",
          display: "block",
          boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
        }}
      />
    </div>
  );
}
