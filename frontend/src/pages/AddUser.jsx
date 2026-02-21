import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserForm from "../components/users/UserForm";
import { useToast } from "../components/ui/Toast";

const AddUser = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      await api.post("/users", formData);
      navigate("/dashboard");
    } catch (error) {
      showToast("Error creating user", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isDashboard />
      <div className="px-6 py-10 flex-1">
        <UserForm onSubmit={handleSubmit} />
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;