const InputField = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md text-sm mt-1 focus:ring-1 focus:ring-[#15173D]"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
