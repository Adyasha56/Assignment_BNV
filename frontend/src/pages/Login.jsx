import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { validateLogin } from "../utils/validators";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    setLoading(true);
    setApiError("");

    try {
      const res = await api.post("/auth/login", form);

      login(res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold text-[#15173D]">
          Demo Credentials
        </h2>
        <p className="text-sm mt-2 text-gray-600">
          Email: admin@bnv.com
        </p>
        <p className="text-sm text-gray-600">
          Password: admin123
        </p>
      </Modal>

      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-[#15173D]">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#15173D]"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#15173D]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          <div className="flex justify-center">
            <Button type="submit" loading={loading} disabled={loading}>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;