import { useState } from "react";
import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowLeft, ArrowRight, MapPin, Clock, Star, Truck } from "lucide-react";
import { CROPS, DEMO_CENTERS, DEMO_SLOTS, getDates } from "@/lib/demo-data";

const STEPS = ["Crop", "Centre", "Slot", "Confirm"];

export default function BookSlot() {
  const { createBooking } = useDemo();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [quantity, setQuantity] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [newToken, setNewToken] = useState("");
  const dates = getDates();

  const selectedCenterData = DEMO_CENTERS.find(c => c.id === selectedCenter);
  const availableSlots = DEMO_SLOTS[selectedCenter] || DEMO_SLOTS.c1;

  const handleConfirm = () => {
    const qty = parseFloat(quantity) || 10;
    const booking = createBooking(selectedCenter, selectedCrop, qty, "Quintal", dates[selectedDate], selectedSlot);
    if (booking) { setNewToken(booking.tokenNumber); setBookingConfirmed(true); }
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <Card className="bg-[#111512] border-white/5 overflow-hidden">
          <div className="p-8 text-center border-b border-white/5">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Booking Confirmed</h2>
            <p className="text-sm text-zinc-500 mt-1">Your slot has been reserved and your token has been issued.</p>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Token Number</span>
                <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-4xl font-bold text-white tracking-wider font-mono mb-4">{newToken}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-zinc-500 text-xs">Centre</p><p className="font-medium text-white">{selectedCenterData?.name}</p></div>
                <div><p className="text-zinc-500 text-xs">Date</p><p className="font-medium text-white">{dates[selectedDate]}</p></div>
                <div><p className="text-zinc-500 text-xs">Time Window</p><p className="font-medium text-white">{selectedSlot}</p></div>
                <div><p className="text-zinc-500 text-xs">Crop</p><p className="font-medium text-white">{selectedCrop}</p></div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate("/dashboard/token")} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white">View My Token</Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1 border-white/10 text-zinc-300 hover:bg-white/5">Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-xl font-bold text-white tracking-tight mb-4">Book a Slot</h1>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              i <= step ? "bg-emerald-600 text-white" : "bg-white/5 text-zinc-600"
            }`}>
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-white" : "text-zinc-600"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded ${i < step ? "bg-emerald-600" : "bg-white/5"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Crop */}
      {step === 0 && (
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-white mb-4">Select Crop</h2>
            <div className="grid grid-cols-3 gap-3">
              {CROPS.map(crop => (
                <button key={crop.name} onClick={() => setSelectedCrop(crop.name)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedCrop === crop.name
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-white/5 hover:border-white/10"
                  }`}>
                  <span className="text-3xl block mb-2">{crop.icon}</span>
                  <span className="text-sm font-medium text-white">{crop.name}</span>
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(1)} disabled={!selectedCrop}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Centre */}
      {step === 1 && (
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-white mb-4">Select Centre</h2>
            <div className="space-y-3">
              {DEMO_CENTERS.filter(c => c.status !== "closed").map(center => (
                <button key={center.id} onClick={() => setSelectedCenter(center.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedCenter === center.id
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-white/5 hover:border-white/10"
                  }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{center.name}</h3>
                      <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {center.address} · {center.pincode}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">Distance: {center.distance}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Hours: {center.operatingHours}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {center.facilities.map(f => (
                          <span key={f} className="text-[10px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded-full border border-white/5">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{center.rating}</span>
                      </div>
                      <p className={`text-[10px] font-bold mt-1 ${center.status === "operational" ? "text-emerald-400" : "text-amber-400"}`}>
                        {center.currentQueue} in queue
                      </p>
                      <p className="text-[10px] text-zinc-500">~{center.avgWaitTime}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(0)} className="border-white/10 text-zinc-300 hover:bg-white/5">Back</Button>
              <Button onClick={() => setStep(2)} disabled={!selectedCenter}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Select Date & Slot */}
      {step === 2 && (
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-white mb-4">Select Date</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {dates.map((date, i) => (
                <button key={i} onClick={() => setSelectedDate(i)}
                  className={`shrink-0 px-4 py-3 rounded-xl border text-center transition-all min-w-[80px] ${
                    selectedDate === i ? "border-emerald-500 bg-emerald-600 text-white" : "border-white/5 text-zinc-400 hover:border-white/10"
                  }`}>
                  <p className={`text-lg font-bold font-mono ${selectedDate === i ? "text-white" : "text-zinc-300"}`}>{date.split(" ")[0]}</p>
                  <p className={`text-[10px] ${selectedDate === i ? "text-emerald-100" : "text-zinc-600"}`}>{date.split(" ").slice(1, 2).join(" ")}</p>
                  <p className={`text-[10px] ${selectedDate === i ? "text-emerald-100" : "text-zinc-600"}`}>{date.split(" ").slice(2).join(" ")}</p>
                </button>
              ))}
            </div>

            <h3 className="text-sm font-bold text-white mb-3">Available Slots</h3>
            <div className="space-y-2">
              {availableSlots.map(slot => (
                <button key={slot.id} onClick={() => { setSelectedSlot(slot.time); setStep(3); }}
                  disabled={slot.status === "full"}
                  className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${
                    slot.status === "full" ? "border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed" : "border-white/5 hover:border-white/10"
                  }`}>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-white font-mono">{slot.time}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    slot.status === "available" ? "bg-emerald-500/15 text-emerald-400" :
                    slot.status === "few_left" ? "bg-amber-500/15 text-amber-400" :
                    "bg-red-500/15 text-red-400"
                  }`}>
                    {slot.status === "available" ? "Available" : slot.status === "few_left" ? "Few Left" : "Full"}
                  </span>
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep(1)} className="mt-6 border-white/10 text-zinc-300 hover:bg-white/5">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirm */}
      {step === 3 && (
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-white mb-4">Confirm Booking</h2>
            <div className="bg-white/[0.03] rounded-xl p-4 mb-4 space-y-3 border border-white/5">
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Crop</span><span className="font-medium text-white">{selectedCrop}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Centre</span><span className="font-medium text-white">{selectedCenterData?.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Date</span><span className="font-medium text-white">{dates[selectedDate]}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Time Window</span><span className="font-medium text-white font-mono">{selectedSlot}</span></div>
            </div>
            <div className="space-y-3 mb-6">
              <div>
                <Label className="text-zinc-300 text-sm font-medium">Estimated Quantity (Quintals)</Label>
                <Input type="number" placeholder="e.g. 20" value={quantity} onChange={e => setQuantity(e.target.value)}
                  className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="border-white/10 text-zinc-300 hover:bg-white/5">Back</Button>
              <Button onClick={handleConfirm} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                <Truck className="w-4 h-4 mr-2" /> Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
