import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#0a0d0b]"
    >
      <div className="text-center">
        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/15">
          <Leaf className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight mb-2 font-mono">404</h1>
        <p className="text-sm text-zinc-500 mb-6">This page could not be found.</p>
        <Button onClick={() => navigate("/")} className="bg-emerald-600 hover:bg-emerald-500 text-white">
          Return to Home
        </Button>
      </div>
    </motion.div>
  );
}
