const Info = ({ label, value }) => (
  <p className="text-sm text-gray-700">
    <span className="font-medium text-[#15173D]">{label}:</span>{" "}
    {value || "N/A"}
  </p>
);

export default Info;
