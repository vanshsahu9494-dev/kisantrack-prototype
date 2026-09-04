import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Hash, Clock, TrendingUp, Activity, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const { centers, bookings, getTodayBookings, getCompletedBookings } = useDemo();
  const navigate = useNavigate();
  const todayBookings = getTodayBookings();
  const completed = getCompletedBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-emerald-900">District Dashboard</h1>
        <p className="text-sm text-emerald-600/70">Haryana • Today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Mandis", value: centers.filter(c => c.status === "operational").length.toString(), icon: MapPin, color: "bg-emerald-50 text-emerald-600" },
          { label: "Total Farmers", value: "2,845", icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "Total Tokens", value: "4,562", icon: Hash, color: "bg-amber-50 text-amber-600" },
          { label: "Avg. Wait Time", value: "1.6 hrs", icon: Clock, color: "bg-purple-50 text-purple-600" },
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

      {/* Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Token Status Chart */}
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-emerald-900 mb-4">Token Status</h3>
            <div className="space-y-3">
              {[
                { label: "Completed", count: completed.length + 3200, color: "bg-emerald-500", percent: 70 },
                { label: "In Queue", count: 892, color: "bg-amber-500", percent: 20 },
                { label: "Processing", count: 340, color: "bg-blue-500", percent: 7 },
                { label: "Cancelled", count: 130, color: "bg-red-400", percent: 3 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-700">{item.label}</span>
                    <span className="font-medium text-emerald-900">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold text-emerald-900">4,562</p>
              <p className="text-[10px] text-emerald-600/60">Total Tokens</p>
            </div>
          </CardContent>
        </Card>

        {/* Tokens Over Time */}
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-emerald-900 mb-4">Tokens Over Time</h3>
            <div className="h-40 flex items-end gap-1.5 px-2">
              {[35, 45, 60, 80, 95, 100, 85, 70, 55, 40, 30, 25].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t transition-all hover:from-emerald-700 hover:to-emerald-500"
                    style={{ height: `${h}%` }} />
                  <span className="text-[8px] text-emerald-500">{6 + i}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-emerald-600/60 text-center mt-2">Hourly tokens (6 AM - 6 PM)</p>
          </CardContent>
        </Card>
      </div>

      {/* Mandi Performance */}
      <Card className="border-emerald-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-emerald-900">Mandi Performance</h3>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/mandis")} className="border-emerald-200 text-emerald-700">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-emerald-100">
                  <th className="text-left py-2 text-[10px] font-semibold text-emerald-600/60 uppercase">Mandi Name</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-emerald-600/60 uppercase">Active Tokens</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-emerald-600/60 uppercase">Completed</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-emerald-600/60 uppercase">Avg. Wait</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-emerald-600/60 uppercase">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {centers.map(center => (
                  <tr key={center.id} className="border-b border-emerald-50 hover:bg-emerald-50/50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${center.status === "operational" ? "bg-emerald-500" : center.status === "busy" ? "bg-amber-500" : "bg-gray-400"}`} />
                        <span className="font-medium text-emerald-900">{center.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-emerald-700">{center.currentQueue}</td>
                    <td className="py-3 text-emerald-700">{Math.floor(center.capacity * 1.5)}</td>
                    <td className="py-3 text-emerald-700">{center.avgWaitTime}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 bg-emerald-100 rounded-full w-20 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(center.currentQueue / center.capacity) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-emerald-600">{Math.round((center.currentQueue / center.capacity) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-900">AI Insights</h3>
            </div>
            <p className="text-sm text-emerald-700">Peak hours: 8-10 AM. Recommend pre-booking slots during off-peak for 40% faster procurement.</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-emerald-900">Trend</h3>
            </div>
            <p className="text-sm text-emerald-700">Wheat procurement up 15% this week. Wheat price: ₹2,450/quintal (+3.2%).</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-gradient-to-br from-amber-50 to-amber-100/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-emerald-900">Alert</h3>
            </div>
            <p className="text-sm text-emerald-700">Kurukshetra Mandi is at 95% capacity. Consider redirecting to Ambala or Sonipat.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
