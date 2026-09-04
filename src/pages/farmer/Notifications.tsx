import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Hash, Calendar, Clock, CheckCheck, Settings } from "lucide-react";

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDemo();
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  const iconMap = {
    token: <Hash className="w-4 h-4" />,
    queue: <Clock className="w-4 h-4" />,
    booking: <Calendar className="w-4 h-4" />,
    system: <Settings className="w-4 h-4" />,
  };

  const colorMap = {
    token: "bg-emerald-100 text-emerald-600",
    queue: "bg-amber-100 text-amber-600",
    booking: "bg-blue-100 text-blue-600",
    system: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-900">Notifications</h1>
          <p className="text-sm text-emerald-600/70">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <Button onClick={markAllNotificationsRead} variant="outline" size="sm" className="border-emerald-200 text-emerald-700">
            <CheckCheck className="w-4 h-4 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <Card key={n.id}
            className={`border-emerald-100 cursor-pointer transition-all hover:shadow-sm ${
              !n.read ? "bg-emerald-50/50 border-l-4 border-l-emerald-500" : ""
            }`}
            onClick={() => markNotificationRead(n.id)}>
            <CardContent className="p-4 flex gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorMap[n.type]}`}>
                {iconMap[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-emerald-900">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />}
                </div>
                <p className="text-xs text-emerald-600/70 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-emerald-400 mt-1">{n.createdAt}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
