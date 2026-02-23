const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false, loading = false }) => {
  const base =
    "px-4 py-2 text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2";

  const styles = {
    primary: "bg-[#15173D] text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed",
    outline:
      "border border-[#15173D] text-[#15173D] hover:bg-[#15173D] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed",
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled || loading} 
      className={`${base} ${styles[variant]}`}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
};

export default Button;