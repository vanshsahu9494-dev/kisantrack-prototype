import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Hash, Users, TrendingUp } from "lucide-react";

export default function MyToken() {
  const { getActiveBooking, centers } = useDemo();
  const navigate = useNavigate();
  const booking = getActiveBooking();
  const center = booking ? centers.find(c => c.id === booking.centerId) : null;

  if (!booking) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Hash className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-lg font-bold text-emerald-900 mb-2">No Active Token</h2>
        <p className="text-sm text-emerald-600/70 mb-4">You don't have an active booking right now.</p>
        <Button onClick={() => navigate("/dashboard/book")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Book a Slot
        </Button>
      </div>
    );
  }

  const progressPercent = Math.max(5, ((booking.totalInQueue - booking.queuePosition) / booking.totalInQueue) * 100);

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Token Card */}
      <Card className="border-emerald-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3a18] p-6 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs text-emerald-200">Your Token</span>
            <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {booking.status === "completed" ? "Completed" : booking.status === "processing" ? "Processing" : "Active"}
            </span>
          </div>
          <p className="text-5xl font-bold tracking-wider mb-3">{booking.tokenNumber}</p>
          <div className="flex items-center justify-center gap-2 text-emerald-200 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{booking.centerName}</span>
          </div>
          <p className="text-xs text-emerald-300/60 mt-1">{booking.date}, {booking.timeSlot}</p>
        </div>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-emerald-800">{booking.queuePosition}</p>
              <p className="text-[10px] text-emerald-600/60 mt-0.5">Position in Queue</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-amber-800">{booking.totalInQueue}</p>
              <p className="text-[10px] text-amber-600/60 mt-0.5">Total in Queue</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-emerald-600/70">Queue Progress</span>
              <span className="text-xs font-bold text-emerald-800">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2.5 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-blue-600/70">Estimated Wait Time</p>
              <p className="text-lg font-bold text-blue-800">{booking.estimatedWait}</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-800">AI Prediction</span>
            </div>
            <p className="text-sm text-emerald-700">Based on current processing speed, you'll likely be called in approximately <strong>{booking.estimatedWait}</strong>. We recommend arriving 15 minutes before your expected turn.</p>
          </div>

          <p className="text-xs text-center text-emerald-600/60 mb-4">We will notify you when your turn is near.</p>

          <div className="flex gap-3">
            <Button onClick={() => navigate("/dashboard/track")} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              Track Live
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1 border-emerald-200 text-emerald-700">
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
