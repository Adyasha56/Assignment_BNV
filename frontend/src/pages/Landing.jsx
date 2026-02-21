import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import CTA from "../components/landing/CTA";
import FAQ from "../components/landing/FAQ";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;