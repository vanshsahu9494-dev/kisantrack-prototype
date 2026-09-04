import { useAuth } from "@/hooks/use-auth";
import { useDemo } from "@/lib/demo-store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { currentUser } = useDemo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth-role");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-emerald-700">Loading dashboard...</div>
    </div>
  );
}
