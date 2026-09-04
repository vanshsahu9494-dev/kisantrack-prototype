import { useDemo, type UserRole } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Tractor, Shield, ArrowRight } from "lucide-react";

const ROLES: { role: UserRole; label: string; desc: string; icon: typeof Leaf; color: string; path: string }[] = [
  { role: "farmer", label: "Farmer", desc: "Book slots, track procurement, manage tokens", icon: Leaf, color: "from-emerald-500 to-green-600", path: "/dashboard" },
  { role: "operator", label: "Operator", desc: "Manage tokens, process farmers, update queue", icon: Tractor, color: "from-emerald-600 to-teal-700", path: "/operator" },
  { role: "admin", label: "District Admin", desc: "Monitor centres, analytics, reports", icon: Shield, color: "from-emerald-700 to-green-800", path: "/admin" },
];

export default function AuthRole() {
  const { login } = useDemo();
  const navigate = useNavigate();

  const handleSelect = (role: UserRole, path: string) => {
    login(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f2] via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-emerald-900">Welcome to KisanTrack</h1>
          <p className="text-sm text-emerald-600/70 mt-2">Select your role to continue</p>
        </div>

        <div className="space-y-3">
          {ROLES.map(r => (
            <Card key={r.role} className="border-emerald-100 cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all group"
              onClick={() => handleSelect(r.role, r.path)}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <r.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-emerald-900">{r.label}</h3>
                  <p className="text-xs text-emerald-600/70">{r.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-[10px] text-emerald-400 mt-8">
          Smart Farmer Procurement & Queue Management Platform • SIH 2026
        </p>
      </div>
    </div>
  );
}
