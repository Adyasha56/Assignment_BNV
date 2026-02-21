import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Info from "../components/ui/Info";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar isDashboard />
        <div className="px-6 py-20 text-center text-[#15173D] flex-1">
          Loading user details...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isDashboard />

      <div className="px-6 py-12 max-w-4xl mx-auto flex-1">
        <div className="bg-white shadow-md rounded-md p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-semibold text-[#15173D]">
                {user.firstName} {user.lastName}
              </h2>

              <Info label="Email" value={user.email} />
              <Info label="Mobile" value={user.mobile} />
              <Info label="Gender" value={user.gender} />
              <Info label="Location" value={user.location} />

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>

            <Link to={`/dashboard/edit/${user._id}`}>
              <Button>Edit</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewUser;