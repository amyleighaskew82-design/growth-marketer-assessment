import HomePage from "../page";

export default function MobilePreview() {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-8">
      <div
        style={{ width: 390, minWidth: 390, maxWidth: 390, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
        className="bg-white overflow-hidden relative"
      >
        <HomePage />
      </div>
    </div>
  );
}
