import Button from "../ui/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="px-6 py-20 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-[#15173D]">
        Manage Users Efficiently
      </h1>

      <p className="mt-4 text-gray-600 max-w-xl mx-auto">
        A simple and powerful admin dashboard to manage users, export data,
        and handle records seamlessly.
      </p>

      <div className="mt-8 flex justify-center">
        <Link to="/login">
          <Button>Get Started</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;