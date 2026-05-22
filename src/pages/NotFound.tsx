import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Page Not Found | Wishly AI</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <Navbar />
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="text-center">
        <div className="font-display text-[100px] font-extrabold leading-none text-orange/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-ink mb-2">Page not found</h1>
        <p className="text-mid text-[15px] mb-8">This page doesn't exist or was moved.</p>
        <Link to="/" className="bg-orange text-white px-7 py-3.5 rounded-full text-[14px] font-bold no-underline hover:bg-orange-dark transition-all">
          Back to home
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
