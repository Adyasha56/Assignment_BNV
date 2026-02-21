import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserForm from "../components/users/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`/users/${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await api.put(`/users/${id}`, formData);
      navigate("/dashboard");
    } catch (error) {
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isDashboard />
      <div className="px-6 py-10 flex-1">
        <UserForm
          initialData={user}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <Footer />
    </div>
  );
};

export default EditUser;