import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserTable from "../components/users/UserTable";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isDashboard />
      <div className="px-6 py-10 max-w-6xl mx-auto flex-1">
        <UserTable />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;