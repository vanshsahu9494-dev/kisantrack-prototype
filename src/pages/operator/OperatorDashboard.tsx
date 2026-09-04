import { useDemo } from "@/lib/demo-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, CheckCircle2, Clock, Users, Play } from "lucide-react";

export default function OperatorDashboard() {
  const { getTodayBookings, getCompletedBookings, updateBookingStatus, centers } = useDemo();
  const todayBookings = getTodayBookings();
  const completed = getCompletedBookings();
  const inQueue = todayBookings.filter(b => b.status === "in_queue");
  const processing = todayBookings.filter(b => b.status === "processing");
  const center = centers[0];

  const handleProcessNext = () => {
    const next = inQueue[0];
    if (next) updateBookingStatus(next.id, "processing");
  };

  const handleComplete = (bookingId: string) => {
    updateBookingStatus(bookingId, "completed", {
      weight: 19.5 + Math.random(),
      qualityGrade: "A",
      paymentAmount: Math.floor(20 * 2350 + Math.random() * 1000),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Operator Dashboard</h1>
          <p className="text-sm text-zinc-500">{center?.name} — Live</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/15">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Live
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Tokens Today", value: "256", icon: Hash, accent: "text-emerald-400 bg-emerald-500/10" },
          { label: "Tokens Completed", value: `${completed.length + 142}`, icon: CheckCircle2, accent: "text-emerald-400 bg-emerald-500/10" },
          { label: "In Queue", value: `${inQueue.length + 98}`, icon: Users, accent: "text-amber-400 bg-amber-500/10" },
          { label: "Avg. Wait Time", value: "1.5 hrs", icon: Clock, accent: "text-blue-400 bg-blue-500/10" },
        ].map(stat => (
          <Card key={stat.label} className="bg-[#111512] border-white/5">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg ${stat.accent} flex items-center justify-center mb-2`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-white font-mono">{stat.value}</p>
              <p className="text-[10px] text-zinc-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current Token */}
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-white mb-4">Current Token</h3>
            {processing.length > 0 ? (
              <div className="bg-gradient-to-br from-[#0f2418] to-[#0a1a10] rounded-xl p-5 border border-emerald-500/10">
                <p className="text-3xl font-bold tracking-wider mb-3 text-white font-mono">{processing[0].tokenNumber}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-400">Farmer</span><span className="font-medium text-white">{processing[0].farmerName}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Crop</span><span className="font-medium text-white">{processing[0].crop}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Quantity</span><span className="font-medium text-white">{processing[0].quantity} {processing[0].quantityUnit}</span></div>
                </div>
                <Button onClick={() => handleComplete(processing[0].id)}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Completed
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-600">
                <Hash className="w-8 h-8 mx-auto mb-2 text-zinc-700" />
                <p className="text-sm">No token being processed</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Token */}
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-white mb-4">Next Token</h3>
            {inQueue.length > 0 ? (
              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <p className="text-3xl font-bold text-white tracking-wider mb-3 font-mono">{inQueue[0].tokenNumber}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-500">Farmer</span><span className="font-medium text-white">{inQueue[0].farmerName}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Crop</span><span className="font-medium text-white">{inQueue[0].crop}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Quantity</span><span className="font-medium text-white">{inQueue[0].quantity} {inQueue[0].quantityUnit}</span></div>
                </div>
                <Button onClick={handleProcessNext}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                  <Play className="w-4 h-4 mr-2" /> Call Next Token
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-600">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-zinc-700" />
                <p className="text-sm">All tokens processed</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-[#111512] border-white/5">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {[...completed.slice(0, 5), ...inQueue.slice(0, 3)].map((b, i) => (
              <div key={`${b.id}-${i}`} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    b.status === "completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
                  }`}>
                    {b.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white font-mono">{b.tokenNumber}</p>
                    <p className="text-[10px] text-zinc-500">{b.farmerName} · {b.crop} — {b.quantity} {b.quantityUnit}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  b.status === "completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
                }`}>
                  {b.status === "completed" ? "Completed" : "In Queue"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
