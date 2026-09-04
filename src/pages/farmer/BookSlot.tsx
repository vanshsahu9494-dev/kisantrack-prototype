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
    if (booking) {
      setNewToken(booking.tokenNumber);
      setBookingConfirmed(true);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <Card className="border-emerald-100 overflow-hidden">
          <div className="bg-gradient-to-b from-emerald-50 to-white p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900">Booking Confirmed! 🎉</h2>
            <p className="text-sm text-emerald-600/70 mt-1">Your slot has been booked successfully.</p>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="bg-emerald-50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-emerald-600/70">Token Number</span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-4xl font-bold text-emerald-900 tracking-wider mb-4">{newToken}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-emerald-600/60 text-xs">Centre</p><p className="font-medium text-emerald-900">{selectedCenterData?.name}</p></div>
                <div><p className="text-emerald-600/60 text-xs">Date</p><p className="font-medium text-emerald-900">{dates[selectedDate]}</p></div>
                <div><p className="text-emerald-600/60 text-xs">Time</p><p className="font-medium text-emerald-900">{selectedSlot}</p></div>
                <div><p className="text-emerald-600/60 text-xs">Crop</p><p className="font-medium text-emerald-900">{selectedCrop}</p></div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate("/dashboard/token")} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                View My Token
              </Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1 border-emerald-200 text-emerald-700">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-xl font-bold text-emerald-900 mb-4">Book a Slot</h1>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              i < step ? "bg-emerald-600 text-white" : i === step ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-400"
            }`}>
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-emerald-800" : "text-emerald-400"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded ${i < step ? "bg-emerald-600" : "bg-emerald-100"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Crop */}
      {step === 0 && (
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-emerald-900 mb-4">Select Crop</h2>
            <div className="grid grid-cols-3 gap-3">
              {CROPS.map(crop => (
                <button key={crop.name} onClick={() => setSelectedCrop(crop.name)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedCrop === crop.name
                      ? "border-emerald-600 bg-emerald-50 shadow-md"
                      : "border-emerald-100 hover:border-emerald-300"
                  }`}>
                  <span className="text-3xl block mb-2">{crop.icon}</span>
                  <span className="text-sm font-medium text-emerald-800">{crop.name}</span>
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(1)} disabled={!selectedCrop}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Centre */}
      {step === 1 && (
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-emerald-900 mb-4">Select Centre</h2>
            <div className="space-y-3">
              {DEMO_CENTERS.filter(c => c.status !== "closed").map(center => (
                <button key={center.id} onClick={() => setSelectedCenter(center.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedCenter === center.id
                      ? "border-emerald-600 bg-emerald-50 shadow-md"
                      : "border-emerald-100 hover:border-emerald-300"
                  }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-emerald-900">{center.name}</h3>
                      <p className="text-xs text-emerald-600/60 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {center.address} • {center.pincode}
                      </p>
                      <p className="text-xs text-emerald-600/60 mt-0.5">Distance: {center.distance}</p>
                      <p className="text-xs text-emerald-600/60 mt-0.5">Timings: {center.operatingHours}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {center.facilities.map(f => (
                          <span key={f} className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{center.rating}</span>
                      </div>
                      <p className={`text-[10px] font-bold mt-1 ${
                        center.status === "operational" ? "text-emerald-600" : "text-amber-600"
                      }`}>
                        {center.currentQueue} in queue
                      </p>
                      <p className="text-[10px] text-emerald-600/60">~{center.avgWaitTime}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(0)} className="border-emerald-200 text-emerald-700">Back</Button>
              <Button onClick={() => setStep(2)} disabled={!selectedCenter}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Select Date & Slot */}
      {step === 2 && (
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-emerald-900 mb-4">Select Date</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {dates.map((date, i) => (
                <button key={i} onClick={() => setSelectedDate(i)}
                  className={`shrink-0 px-4 py-3 rounded-xl border-2 text-center transition-all min-w-[80px] ${
                    selectedDate === i ? "border-emerald-600 bg-emerald-600 text-white" : "border-emerald-100 hover:border-emerald-300"
                  }`}>
                  <p className={`text-lg font-bold ${selectedDate === i ? "text-white" : "text-emerald-900"}`}>
                    {date.split(" ")[0]}
                  </p>
                  <p className={`text-[10px] ${selectedDate === i ? "text-emerald-100" : "text-emerald-600/60"}`}>
                    {date.split(" ").slice(1, 2).join(" ")}
                  </p>
                  <p className={`text-[10px] ${selectedDate === i ? "text-emerald-100" : "text-emerald-600/60"}`}>
                    {date.split(" ").slice(2).join(" ")}
                  </p>
                </button>
              ))}
            </div>

            <h3 className="text-sm font-bold text-emerald-900 mb-3">Available Slots</h3>
            <div className="space-y-2">
              {availableSlots.map(slot => (
                <button key={slot.id} onClick={() => { setSelectedSlot(slot.time); setStep(3); }}
                  disabled={slot.status === "full"}
                  className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${
                    slot.status === "full"
                      ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                      : "border-emerald-100 hover:border-emerald-300"
                  }`}>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-900">{slot.time}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    slot.status === "available" ? "bg-emerald-100 text-emerald-700" :
                    slot.status === "few_left" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {slot.status === "available" ? "Available" :
                     slot.status === "few_left" ? "Few Left" : "Full"}
                  </span>
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep(1)} className="mt-6 border-emerald-200 text-emerald-700">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirm */}
      {step === 3 && (
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-emerald-900 mb-4">Confirm Booking</h2>
            <div className="bg-emerald-50 rounded-xl p-4 mb-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600/70">Crop</span>
                <span className="font-medium text-emerald-900">{selectedCrop}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600/70">Centre</span>
                <span className="font-medium text-emerald-900">{selectedCenterData?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600/70">Date</span>
                <span className="font-medium text-emerald-900">{dates[selectedDate]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600/70">Time</span>
                <span className="font-medium text-emerald-900">{selectedSlot}</span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div>
                <Label className="text-emerald-800 text-sm font-medium">Estimated Quantity (Quintals)</Label>
                <Input type="number" placeholder="e.g. 20" value={quantity} onChange={e => setQuantity(e.target.value)}
                  className="mt-1 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="border-emerald-200 text-emerald-700">Back</Button>
              <Button onClick={handleConfirm}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                <Truck className="w-4 h-4 mr-2" /> Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
