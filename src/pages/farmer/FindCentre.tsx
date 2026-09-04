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

  const selected = DEMO_CENTERS.find(c => c.id === selectedCenter);

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-xl font-bold text-emerald-900 mb-1">Find Centre</h1>
      <p className="text-sm text-emerald-600/70 mb-4">Locate nearby procurement centres</p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
        <Input placeholder="Search mandi or district..." value={search} onChange={e => setSearch(e.target.value)}
          className="pl-9 border-emerald-200 focus:border-emerald-500" />
      </div>

      {/* Map placeholder */}
      <Card className="border-emerald-100 mb-4 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center relative">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm text-emerald-600">Interactive map</p>
            <p className="text-xs text-emerald-500/60">Showing centres near Karnal, Haryana</p>
          </div>
          {DEMO_CENTERS.slice(0, 4).map((c, i) => (
            <div key={c.id}
              className="absolute bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg cursor-pointer hover:bg-emerald-700"
              style={{ top: `${20 + i * 25}%`, left: `${15 + i * 20}%` }}
              onClick={() => setSelectedCenter(c.id)}>
              {c.name.split(" ")[0]}
            </div>
          ))}
        </div>
      </Card>

      {/* Centre list */}
      <div className="space-y-3">
        {filtered.map(center => (
          <Card key={center.id}
            className={`border-emerald-100 cursor-pointer transition-all hover:shadow-md ${
              selectedCenter === center.id ? "ring-2 ring-emerald-500" : ""
            }`}
            onClick={() => setSelectedCenter(center.id)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-emerald-900">{center.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      center.status === "operational" ? "bg-emerald-100 text-emerald-700" :
                      center.status === "busy" ? "bg-amber-100 text-amber-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {center.status === "operational" ? "Operational" : center.status === "busy" ? "Busy" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600/60 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {center.address} • {center.pincode}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-xs font-medium text-emerald-800">{center.rating}</span>
                    </div>
                    <span className="text-xs text-emerald-600/60 flex items-center gap-1">
                      <Navigation className="w-3 h-3" /> {center.distance}
                    </span>
                    <span className="text-xs text-emerald-600/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{center.avgWaitTime}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {center.facilities.slice(0, 4).map(f => (
                      <span key={f} className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-2xl font-bold text-emerald-800">{center.currentQueue}</p>
                  <p className="text-[10px] text-emerald-600/60">in queue</p>
                </div>
              </div>
              {selectedCenter === center.id && (
                <div className="mt-3 pt-3 border-t border-emerald-100 flex gap-3">
                  <Button onClick={(e) => { e.stopPropagation(); navigate("/dashboard/book"); }}
                    size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Book Slot
                  </Button>
                  <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700">
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
