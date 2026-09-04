import { useDemo, type UserRole } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Shield, ArrowRight } from "lucide-react";

const ROLES: { role: UserRole; label: string; desc: string; icon: typeof Leaf; path: string }[] = [
  { role: "farmer", label: "Farmer", desc: "Book procurement slots, receive tokens, and track your queue in real-time.", icon: Leaf, path: "/dashboard" },
  { role: "operator", label: "Operator", desc: "Manage token queues, process farmers, and update procurement records.", icon: Users, path: "/operator" },
  { role: "admin", label: "District Administrator", desc: "Monitor mandi operations, view analytics, and access performance reports.", icon: Shield, path: "/admin" },
];

export default function AuthRole() {
  const { login } = useDemo();
  const navigate = useNavigate();

  const handleSelect = (role: UserRole, path: string) => {
    login(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0d0b] flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <Leaf className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">KisanTrack Prototype</h1>
          <p className="text-sm text-zinc-500 mt-2">Select a role to continue into the demo</p>
        </div>

        <div className="space-y-3">
          {ROLES.map(r => (
            <Card key={r.role} className="bg-[#111512] border-white/5 cursor-pointer hover:border-emerald-500/20 hover:bg-[#131815] transition-all group"
              onClick={() => handleSelect(r.role, r.path)}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/10 group-hover:bg-emerald-500/15 transition-colors">
                  <r.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">{r.label}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{r.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-[10px] text-zinc-700 mt-8">
          Smart Farmer Procurement & Queue Management Platform — SIH 2026
        </p>
      </div>
    </div>
  );
}
