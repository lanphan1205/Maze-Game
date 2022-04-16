const sizes = {
  sm: "4",
  md: "8",
  lg: "16",
};

export default function Spin({ size }) {
  return (
    <div class="flex justify-center items-center">
      <div
        style={{ borderTopColor: `transparent` }}
        class={`spinner-border animate-spin inline-block w-${sizes[size]} h-${sizes[size]} border-4 border-gray-300 rounded-full`}
        role="status"
      >
        <span class="hidden">Loading...</span>
      </div>
    </div>
  );
}

Spin.defaultProps = {
  size: "md",
};
