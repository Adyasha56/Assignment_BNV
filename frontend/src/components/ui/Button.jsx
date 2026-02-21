const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  const base =
    "px-4 py-2 text-sm rounded-md transition-all duration-200";

  const styles = {
    primary: "bg-[#15173D] text-white hover:opacity-90",
    outline:
      "border border-[#15173D] text-[#15173D] hover:bg-[#15173D] hover:text-white",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;