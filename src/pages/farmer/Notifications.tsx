import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Hash, Calendar, Clock, CheckCheck, Settings } from "lucide-react";

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
    token: "bg-emerald-500/15 text-emerald-400",
    queue: "bg-amber-500/15 text-amber-400",
    booking: "bg-blue-500/15 text-blue-400",
    system: "bg-purple-500/15 text-purple-400",
  };

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Notifications</h1>
          <p className="text-sm text-zinc-500">{unread} unread</p>
        </div>
        {unread > 0 && (
          <Button onClick={markAllNotificationsRead} variant="outline" size="sm" className="border-white/10 text-zinc-400 hover:bg-white/5">
            <CheckCheck className="w-4 h-4 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => (
          <Card key={n.id}
            className={`bg-[#111512] border-white/5 cursor-pointer transition-all hover:border-white/10 ${
              !n.read ? "border-l-2 border-l-emerald-500" : ""
            }`}
            onClick={() => markNotificationRead(n.id)}>
            <CardContent className="p-4 flex gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorMap[n.type]}`}>
                {iconMap[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-zinc-600 mt-1">{n.createdAt}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
