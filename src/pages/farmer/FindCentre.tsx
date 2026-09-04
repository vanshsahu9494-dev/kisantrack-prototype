import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, ArrowLeft, Search, Navigation } from "lucide-react";
import { DEMO_CENTERS } from "@/lib/demo-data";

export default function FindCentre() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  const filtered = DEMO_CENTERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-xl font-bold text-white tracking-tight mb-1">Find Centre</h1>
      <p className="text-sm text-zinc-500 mb-4">Locate nearby procurement centres with live crowd data</p>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
        <Input placeholder="Search mandi or district..." value={search} onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50" />
      </div>

      {/* Map placeholder */}
      <Card className="bg-[#111512] border-white/5 mb-4 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-[#0f2418] to-[#0a1a10] flex items-center justify-center relative border-b border-emerald-500/10">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-emerald-500/30 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">Interactive map view</p>
            <p className="text-xs text-zinc-600">Centres near Karnal, Haryana</p>
          </div>
          {DEMO_CENTERS.slice(0, 4).map((c, i) => (
            <button key={c.id}
              className="absolute bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg hover:bg-emerald-500 transition-colors"
              style={{ top: `${20 + i * 25}%`, left: `${15 + i * 20}%` }}
              onClick={() => setSelectedCenter(c.id)}>
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        {filtered.map(center => (
          <Card key={center.id}
            className={`bg-[#111512] border-white/5 cursor-pointer transition-all hover:border-white/10 ${
              selectedCenter === center.id ? "ring-1 ring-emerald-500/30" : ""
            }`}
            onClick={() => setSelectedCenter(center.id)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{center.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      center.status === "operational" ? "bg-emerald-500/15 text-emerald-400" :
                      center.status === "busy" ? "bg-amber-500/15 text-amber-400" :
                      "bg-zinc-500/15 text-zinc-500"
                    }`}>
                      {center.status === "operational" ? "Operational" : center.status === "busy" ? "Busy" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {center.address} · {center.pincode}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-xs font-medium text-zinc-300">{center.rating}</span>
                    </div>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3" /> {center.distance}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{center.avgWaitTime}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {center.facilities.slice(0, 4).map(f => (
                      <span key={f} className="text-[10px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded-full border border-white/5">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-2xl font-bold text-white font-mono">{center.currentQueue}</p>
                  <p className="text-[10px] text-zinc-500">in queue</p>
                </div>
              </div>
              {selectedCenter === center.id && (
                <div className="mt-3 pt-3 border-t border-white/5 flex gap-3">
                  <Button onClick={(e) => { e.stopPropagation(); navigate("/dashboard/book"); }}
                    size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">Book Slot</Button>
                  <Button variant="outline" size="sm" className="border-white/10 text-zinc-300 hover:bg-white/5">View Details</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
