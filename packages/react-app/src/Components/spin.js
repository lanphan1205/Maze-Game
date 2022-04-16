const sizes = {
  sm: "4",
  md: "8",
  lg: "16",
};

export default function Spin({ size }) {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ borderTopColor: `transparent` }}
        className={`spinner-border animate-spin inline-block w-${sizes[size]} h-${sizes[size]} border-4 border-gray-500 rounded-full`}
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
}

Spin.defaultProps = {
  size: "md",
};
