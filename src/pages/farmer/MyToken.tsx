import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Hash, TrendingUp } from "lucide-react";

export default function MyToken() {
  const { getActiveBooking } = useDemo();
  const navigate = useNavigate();
  const booking = getActiveBooking();

  if (!booking) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
          <Hash className="w-8 h-8 text-zinc-600" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">No Active Token</h2>
        <p className="text-sm text-zinc-500 mb-4">You don't have an active booking right now.</p>
        <Button onClick={() => navigate("/dashboard/book")} className="bg-emerald-600 hover:bg-emerald-500 text-white">Book a Slot</Button>
      </div>
    );
  }

  const progressPercent = Math.max(5, ((booking.totalInQueue - booking.queuePosition) / booking.totalInQueue) * 100);

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <Card className="bg-[#111512] border-white/5 overflow-hidden mb-6">
        <div className="bg-gradient-to-br from-[#0f2418] to-[#0a1a10] p-6 text-center border-b border-emerald-500/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs text-zinc-400">Your Token</span>
            <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {booking.status === "completed" ? "Completed" : booking.status === "processing" ? "Processing" : "Active"}
            </span>
          </div>
          <p className="text-5xl font-bold tracking-wider mb-3 text-white font-mono">{booking.tokenNumber}</p>
          <div className="flex items-center justify-center gap-2 text-zinc-300 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{booking.centerName}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">{booking.date}, {booking.timeSlot}</p>
        </div>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-emerald-500/10 border border-emerald-500/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white font-mono">{booking.queuePosition}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Position in Queue</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white font-mono">{booking.totalInQueue}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Total in Queue</p>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-4 mb-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Queue Progress</span>
              <span className="text-xs font-bold text-white font-mono">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/10 rounded-xl p-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/15 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Estimated Wait Time</p>
              <p className="text-lg font-bold text-white font-mono">{booking.estimatedWait}</p>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-4 mb-4 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-white">AI Prediction</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Based on current processing speed, your estimated wait is approximately <strong className="text-white">{booking.estimatedWait}</strong>. We recommend arriving at the centre 15 minutes before your expected turn.
            </p>
          </div>

          <p className="text-xs text-center text-zinc-600 mb-4">We'll notify you when your turn is approaching.</p>

          <div className="flex gap-3">
            <Button onClick={() => navigate("/dashboard/track")} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white">Track Live</Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1 border-white/10 text-zinc-300 hover:bg-white/5">Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
