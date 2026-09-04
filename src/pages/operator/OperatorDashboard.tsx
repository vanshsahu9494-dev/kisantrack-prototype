import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, CheckCircle2, Clock, Users, TrendingUp, ArrowRight, Play, Eye } from "lucide-react";

export default function OperatorDashboard() {
  const { getTodayBookings, getCompletedBookings, updateBookingStatus, centers } = useDemo();
  const navigate = useNavigate();
  const todayBookings = getTodayBookings();
  const completed = getCompletedBookings();
  const inQueue = todayBookings.filter(b => b.status === "in_queue");
  const processing = todayBookings.filter(b => b.status === "processing");
  const center = centers[0]; // Karnal Mandi

  const handleProcessNext = () => {
    const next = inQueue[0];
    if (next) {
      updateBookingStatus(next.id, "processing");
    }
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
          <h1 className="text-xl font-bold text-emerald-900">Operator Dashboard</h1>
          <p className="text-sm text-emerald-600/70">{center?.name} • Live</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Tokens Today", value: "256", icon: Hash, color: "bg-emerald-50 text-emerald-600" },
          { label: "Tokens Completed", value: `${completed.length + 142}`, icon: CheckCircle2, color: "bg-blue-50 text-blue-600" },
          { label: "In Queue", value: `${inQueue.length + 98}`, icon: Users, color: "bg-amber-50 text-amber-600" },
          { label: "Avg. Wait Time", value: "1.5 hrs", icon: Clock, color: "bg-purple-50 text-purple-600" },
        ].map(stat => (
          <Card key={stat.label} className="border-emerald-100">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-emerald-900">{stat.value}</p>
              <p className="text-[10px] text-emerald-600/60">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current Token */}
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-emerald-900 mb-4">Current Token</h3>
            {processing.length > 0 ? (
              <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3a18] rounded-xl p-5 text-white">
                <p className="text-3xl font-bold tracking-wider mb-3">{processing[0].tokenNumber}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-emerald-200">Farmer</span><span className="font-medium">{processing[0].farmerName}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-200">Crop</span><span className="font-medium">{processing[0].crop}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-200">Quantity</span><span className="font-medium">{processing[0].quantity} {processing[0].quantityUnit}</span></div>
                </div>
                <Button onClick={() => handleComplete(processing[0].id)}
                  className="w-full mt-4 bg-white text-emerald-800 hover:bg-emerald-50 font-semibold">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Completed
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-emerald-600/50">
                <Hash className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                <p className="text-sm">No token being processed</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Token */}
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-emerald-900 mb-4">Next Token</h3>
            {inQueue.length > 0 ? (
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <p className="text-3xl font-bold text-emerald-800 tracking-wider mb-3">{inQueue[0].tokenNumber}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-emerald-600/70">Farmer</span><span className="font-medium text-emerald-900">{inQueue[0].farmerName}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-600/70">Crop</span><span className="font-medium text-emerald-900">{inQueue[0].crop}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-600/70">Quantity</span><span className="font-medium text-emerald-900">{inQueue[0].quantity} {inQueue[0].quantityUnit}</span></div>
                </div>
                <Button onClick={handleProcessNext}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  <Play className="w-4 h-4 mr-2" /> Call Next Token
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-emerald-600/50">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                <p className="text-sm">All tokens processed!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-emerald-100">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-emerald-900 mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {[...completed.slice(0, 5), ...inQueue.slice(0, 3)].map((b, i) => (
              <div key={`${b.id}-${i}`} className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    b.status === "completed" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    {b.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-900">{b.tokenNumber}</p>
                    <p className="text-[10px] text-emerald-600/60">{b.farmerName} • {b.crop} - {b.quantity} {b.quantityUnit}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  b.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
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
