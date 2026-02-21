const SelectField = ({ label, name, value, onChange, error, options }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md text-sm mt-1 focus:ring-1 focus:ring-[#15173D]"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default SelectField;
