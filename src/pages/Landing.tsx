import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf, MapPin, Clock, Hash, CheckCircle2, ArrowRight,
  Users, TrendingUp, Shield, Smartphone, BarChart3
} from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "Locate Nearest Mandi", desc: "Browse procurement centres with live crowd density and real-time slot availability." },
  { icon: Hash, title: "Digital Token Issuance", desc: "Receive a unique token number the moment your booking is confirmed — no paper slips." },
  { icon: Clock, title: "Live Queue Tracking", desc: "Monitor your queue position and estimated wait time from anywhere, at any time." },
  { icon: TrendingUp, title: "AI-Powered Insights", desc: "Predicted crowd levels, optimal visit windows, and centre recommendations driven by data." },
  { icon: Shield, title: "End-to-End Transparency", desc: "Track every step — from slot booking through weighing, grading, and payment settlement." },
  { icon: BarChart3, title: "District Analytics", desc: "Administrative dashboards with centre performance, throughput metrics, and trend reports." },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Book a Slot", desc: "Choose crop, centre, date and time window" },
  { step: "2", title: "Get Token", desc: "Receive your digital token instantly" },
  { step: "3", title: "Track Queue", desc: "Monitor position and estimated wait" },
  { step: "4", title: "Arrive at Mandi", desc: "Enter with your digital token" },
  { step: "5", title: "Procurement", desc: "Weighing, quality check and approval" },
  { step: "6", title: "Get Paid", desc: "Track payment settlement status" },
];

const STATS = [
  { value: "50+", label: "Procurement Centres" },
  { value: "10,000+", label: "Farmers Onboarded" },
  { value: "40%", label: "Shorter Wait Times" },
  { value: "99.8%", label: "Token Accuracy" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0d0b] text-zinc-100">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0a0d0b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none tracking-tight">KisanTrack</h1>
              <p className="text-[9px] text-zinc-500 leading-none">Smart Procurement Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/auth-role")} className="text-zinc-400 hover:text-white hover:bg-white/5 text-sm hidden sm:flex">
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth-role")} className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">Smart India Hackathon 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
                Smarter Procurement.{" "}
                <span className="text-emerald-400">Shorter Queues.</span>{" "}
                Better Tomorrow.
              </h1>
              <p className="text-base text-zinc-400 mb-8 max-w-lg leading-relaxed">
                KisanTrack is a real-time procurement and queue management platform built for Indian
                agricultural mandis. Farmers book slots, receive digital tokens, and track their queue
                position — eliminating hours of uncertainty and physical wait time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate("/auth-role")} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6">
                  Start as Farmer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button onClick={() => navigate("/auth-role")} size="lg" variant="outline" className="border-white/10 text-zinc-300 hover:bg-white/5 px-6">
                  Explore Demo
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative">
              <div className="bg-[#111512] rounded-2xl border border-white/5 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-zinc-300">KisanTrack</span>
                  </div>
                  <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 mb-4">
                  <p className="text-[10px] text-emerald-400/60 uppercase tracking-wider mb-1">Your Token</p>
                  <p className="text-4xl font-bold text-white tracking-wider font-mono">KT5621</p>
                  <p className="text-xs text-zinc-400 mt-2">Karnal Mandi — Haryana</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xl font-bold text-white font-mono">12/128</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Queue Position</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xl font-bold text-white font-mono">1h 20m</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Estimated Wait</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-[#111512] rounded-xl border border-white/5 p-3 shadow-xl hidden md:block">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">Booking Confirmed</p>
                    <p className="text-[10px] text-zinc-500">Slot reserved successfully</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#111512] rounded-xl border border-white/5 p-3 shadow-xl hidden md:block">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">Live Tracking</p>
                    <p className="text-[10px] text-zinc-500">Real-time updates</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight">Key Features</h2>
            <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
              Built to be accessible, simple, and reliable — for every farmer in India.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <Card className="bg-[#111512] border-white/5 hover:border-emerald-500/20 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors">
                      <f.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight">How It Works</h2>
            <p className="text-sm text-zinc-500 mt-2">Six steps to hassle-free procurement</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }} className="text-center">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-emerald-400 font-mono">{step.step}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight">Built For Every Stakeholder</h2>
            <p className="text-sm text-zinc-500 mt-2">Three roles. One unified platform.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Farmers", icon: Leaf, desc: "Book slots, receive tokens, track procurement progress, and get paid — all from a single interface.", accent: "emerald" },
              { title: "Operators", icon: Users, desc: "Manage the token queue, verify farmers, record weights and grades, and close procurement entries.", accent: "emerald" },
              { title: "Administrators", icon: Shield, desc: "Monitor mandi operations, analyse throughput, and access district-level performance reports.", accent: "emerald" },
            ].map((role, i) => (
              <Card key={i} className="bg-[#111512] border-white/5 hover:border-emerald-500/20 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <role.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{role.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#111512] border border-white/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Ready to Modernise Mandi Operations?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              KisanTrack eliminates guesswork from agricultural procurement. Book your first slot
              and experience the platform in under two minutes.
            </p>
            <Button onClick={() => navigate("/auth-role")} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8">
              Launch Prototype <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-sm text-white">KisanTrack</span>
              <span className="text-xs text-zinc-600">— Smart Procurement Platform</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-zinc-600">
              <span>Digitally Connected</span>
              <span>·</span>
              <span>Transparently Managed</span>
              <span>·</span>
              <span>Farmers First</span>
            </div>
            <p className="text-[10px] text-zinc-600">© 2026 KisanTrack — SIH 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
