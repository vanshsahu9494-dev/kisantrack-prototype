import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf, MapPin, Clock, Hash, CheckCircle2, ArrowRight,
  Users, TrendingUp, Shield, Smartphone, BarChart3, Zap
} from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "Find Nearest Mandi", desc: "Locate procurement centres near you with real-time crowd status" },
  { icon: Hash, title: "Digital Token", desc: "Get a unique token number and skip physical queues" },
  { icon: Clock, title: "Live Queue Tracking", desc: "See your position and estimated wait time in real-time" },
  { icon: TrendingUp, title: "AI Insights", desc: "Smart predictions for best times to visit and centre recommendations" },
  { icon: Shield, title: "Transparent Process", desc: "End-to-end tracking from booking to payment" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "District-level monitoring and mandi performance reports" },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Book Slot", desc: "Choose crop, centre, date & time", icon: Smartphone },
  { step: "2", title: "Get Token", desc: "Receive digital token number", icon: Hash },
  { step: "3", title: "Track Queue", desc: "Check position & estimated wait", icon: Clock },
  { step: "4", title: "Arrive at Mandi", desc: "Easy entry with digital token", icon: MapPin },
  { step: "5", title: "Procurement", desc: "Weighing, quality check & approval", icon: CheckCircle2 },
  { step: "6", title: "Get Payment", desc: "Track payment status", icon: TrendingUp },
];

const STATS = [
  { value: "50+", label: "Procurement Centres" },
  { value: "10,000+", label: "Farmers Served" },
  { value: "40%", label: "Reduced Wait Time" },
  { value: "99%", label: "Token Accuracy" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f2] via-white to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-emerald-900 leading-none">KisanTrack</h1>
              <p className="text-[9px] text-emerald-500/70 leading-none">Smart Procurement</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/auth-role")} className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 text-sm">
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth-role")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">Smart India Hackathon 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 leading-tight mb-4">
                Empowering Farmers with{" "}
                <span className="text-emerald-600">Information</span>,{" "}
                <span className="text-emerald-600">Transparency</span> and{" "}
                <span className="text-emerald-600">Time</span>.
              </h1>
              <p className="text-lg text-emerald-600/70 mb-8 max-w-lg">
                Smart Farmer Procurement & Queue Management Platform. Book slots, skip queues, track procurement — all in real-time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate("/auth-role")} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                  Start as Farmer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button onClick={() => navigate("/auth-role")} size="lg" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6">
                  Explore Demo
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative">
              <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3a18] rounded-3xl p-6 shadow-2xl shadow-emerald-900/20 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm font-semibold">KisanTrack</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 mb-4">
                  <p className="text-xs text-emerald-200 mb-1">Your Token</p>
                  <p className="text-4xl font-bold tracking-wider">KT5621</p>
                  <p className="text-xs text-emerald-200 mt-2">Karnal Mandi</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-lg font-bold">12/128</p>
                    <p className="text-[10px] text-emerald-200">Queue Position</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-lg font-bold">1h 20m</p>
                    <p className="text-[10px] text-emerald-200">Est. Wait</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg p-3 border border-emerald-100 hidden md:block">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Booking Confirmed!</p>
                    <p className="text-[10px] text-emerald-500">Slot reserved</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg p-3 border border-emerald-100 hidden md:block">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Live Tracking</p>
                    <p className="text-[10px] text-emerald-500">Real-time updates</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-emerald-100 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-3xl font-bold text-emerald-800">{stat.value}</p>
                <p className="text-xs text-emerald-600/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900">Key Features</h2>
            <p className="text-sm text-emerald-600/70 mt-2 max-w-md mx-auto">
              Accessible • Simple • Reliable — For Every Farmer
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <Card className="border-emerald-100 hover:shadow-lg hover:border-emerald-200 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 border border-emerald-100">
                      <f.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-bold text-emerald-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-emerald-600/70">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900">How It Works?</h2>
            <p className="text-sm text-emerald-600/70 mt-2">6 simple steps to hassle-free procurement</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-200">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-bold text-emerald-700">{step.step}</span>
                </div>
                <h3 className="text-sm font-bold text-emerald-900">{step.title}</h3>
                <p className="text-[11px] text-emerald-600/60 mt-1">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900">Built For Everyone</h2>
            <p className="text-sm text-emerald-600/70 mt-2">Three roles, one seamless platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Farmers", icon: Leaf, desc: "Book slots, get tokens, track queue, receive payment", color: "from-emerald-500 to-green-600" },
              { title: "Operators", icon: Users, desc: "Manage tokens, process farmers, update queue", color: "from-emerald-600 to-teal-700" },
              { title: "Admin", icon: Shield, desc: "Monitor centres, analytics, performance reports", color: "from-emerald-700 to-green-800" },
            ].map((role, i) => (
              <Card key={i} className="border-emerald-100 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                    <role.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-emerald-600/70">{role.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3a18] rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">Ready to Transform Mandi Experience?</h2>
            <p className="text-emerald-200 mb-8 max-w-md mx-auto">
              Join thousands of farmers who have already experienced hassle-free procurement.
            </p>
            <Button onClick={() => navigate("/auth-role")} size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50 px-8">
              Get Started Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-100 py-8 bg-white/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-emerald-900">KisanTrack</span>
              <span className="text-xs text-emerald-500">• Better Mandi. A Stronger Tomorrow.</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-emerald-600/60">
              <span>Digitally Connected</span>
              <span>•</span>
              <span>Transparently Managed</span>
              <span>•</span>
              <span>Farmers First</span>
            </div>
            <p className="text-[10px] text-emerald-400">© 2026 KisanTrack • SIH 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
