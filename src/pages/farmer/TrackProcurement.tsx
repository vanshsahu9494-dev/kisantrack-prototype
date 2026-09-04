import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle, Clock, MapPin } from "lucide-react";

export default function TrackProcurement() {
  const { getActiveBooking } = useDemo();
  const navigate = useNavigate();
  const booking = getActiveBooking();

  if (!booking) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <h2 className="text-lg font-bold text-white mb-2">No Active Procurement</h2>
        <p className="text-sm text-zinc-500 mb-4">Book a slot to start tracking your procurement journey.</p>
        <Button onClick={() => navigate("/dashboard/book")} className="bg-emerald-600 hover:bg-emerald-500 text-white">Book a Slot</Button>
      </div>
    );
  }

  const steps = [
    { label: "Booking Confirmed", time: booking.createdAt, done: true },
    { label: "Token Generated", time: `Token ${booking.tokenNumber}`, done: true },
    { label: "Reached Mandi", time: "Pending", done: ["in_queue", "processing", "completed"].includes(booking.status) },
    { label: "Verification", time: "Pending", done: ["processing", "completed"].includes(booking.status) },
    { label: "Weighing", time: "Pending", done: ["processing", "completed"].includes(booking.status) },
    { label: "Quality Check", time: booking.qualityGrade ? `Grade ${booking.qualityGrade}` : "Pending", done: booking.status === "completed" },
    { label: "Payment", time: booking.paymentAmount ? `₹${booking.paymentAmount.toLocaleString()}` : "Pending", done: booking.status === "completed" },
    { label: "Completed", time: booking.completedAt || "Pending", done: booking.status === "completed" },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <Card className="bg-[#111512] border-white/5 mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm text-zinc-500">Tracking Procurement</h2>
              <p className="text-lg font-bold text-white">{booking.crop} · {booking.quantity} {booking.quantityUnit}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              booking.status === "completed" ? "bg-emerald-500/15 text-emerald-400" :
              booking.status === "processing" ? "bg-blue-500/15 text-blue-400" :
              "bg-amber-500/15 text-amber-400"
            }`}>
              {booking.status === "completed" ? "Completed" : booking.status === "processing" ? "In Progress" : "In Queue"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{booking.centerName}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Token: {booking.tokenNumber}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111512] border-white/5">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-white mb-5">Procurement Timeline</h3>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  ) : i === steps.findIndex(s => !s.done) ? (
                    <div className="w-7 h-7 rounded-full bg-amber-500/15 border-2 border-amber-500/40 flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Circle className="w-3 h-3 text-zinc-600" />
                    </div>
                  )}
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[32px] ${step.done ? "bg-emerald-600" : "bg-white/10"}`} />
                  )}
                </div>
                <div className="pb-6 flex-1">
                  <p className={`text-sm font-medium ${step.done ? "text-white" : "text-zinc-600"}`}>{step.label}</p>
                  <p className={`text-xs ${step.done ? "text-zinc-500" : "text-zinc-700"}`}>{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 mt-6">
        <Button onClick={() => navigate("/dashboard/token")} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white">View Token</Button>
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1 border-white/10 text-zinc-300 hover:bg-white/5">Dashboard</Button>
      </div>
    </div>
  );
}
