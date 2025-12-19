const SummaryRow = ({ label, value, highlight }) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded-md text-sm ${
        highlight
          ? "border border-primary bg-primary/5 font-medium"
          : "bg-muted"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default SummaryRow;
