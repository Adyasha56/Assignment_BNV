const Footer = () => {
  return (
    <footer className="bg-[#15173D] text-white text-center py-6 mt-auto">
      <p className="text-sm">
        © {new Date().getFullYear()} User Management System. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;