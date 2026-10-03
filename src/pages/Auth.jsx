import { useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth_components/AuthCard";
import { cartNotice } from "../components/auth_components/authData";

// The /login page (and /register, which opens on the Register tab).
//
// If someone is sent here with  navigate("/login", { state: { from: "/cart" } })
// they see a short note, and after signing in they go back to where they came from.
export default function Auth({ initialTab = "login" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";
  const comesFromCart = from === "/cart";

  function handleSuccess() {
    navigate(from, { replace: true });
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#18120f] px-4 py-10 font-body text-[#ede0da] sm:px-8 sm:py-16">
      <AuthCard
        initialTab={initialTab}
        notice={comesFromCart ? cartNotice : ""}
        onSuccess={handleSuccess}
      />
    </main>
  );
}
