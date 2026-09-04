export type UserRole = "farmer" | "operator" | "admin";

export type BookingStatus = "confirmed" | "in_queue" | "processing" | "completed" | "cancelled";

export type CenterStatus = "operational" | "busy" | "closed";

export type SlotStatus = "available" | "few_left" | "full";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  location: string;
  farmerId?: string;
}

export interface ProcurementCenter {
  id: string;
  name: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  distance: string;
  capacity: number;
  currentQueue: number;
  avgWaitTime: string;
  status: CenterStatus;
  facilities: string[];
  operatingHours: string;
  rating: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  status: SlotStatus;
  booked: number;
  capacity: number;
}

export interface Booking {
  id: string;
  farmerId: string;
  farmerName: string;
  centerId: string;
  centerName: string;
  crop: string;
  quantity: number;
  quantityUnit: string;
  date: string;
  timeSlot: string;
  tokenNumber: string;
  status: BookingStatus;
  queuePosition: number;
  totalInQueue: number;
  estimatedWait: string;
  createdAt: string;
  completedAt?: string;
  weight?: number;
  qualityGrade?: string;
  paymentAmount?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "token" | "queue" | "booking" | "system";
  read: boolean;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time: string;
  status: string;
}

export const CROPS = [
  { name: "Wheat", icon: "🌾", color: "bg-amber-100 text-amber-700" },
  { name: "Paddy", icon: "🌾", color: "bg-green-100 text-green-700" },
  { name: "Mustard", icon: "🌻", color: "bg-yellow-100 text-yellow-700" },
  { name: "Maize", icon: "🌽", color: "bg-orange-100 text-orange-700" },
  { name: "Bajra", icon: "🌾", color: "bg-stone-100 text-stone-700" },
  { name: "Soybean", icon: "🫘", color: "bg-lime-100 text-lime-700" },
];

export const DEMO_CENTERS: ProcurementCenter[] = [
  {
    id: "c1", name: "Karnal Mandi", address: "GT Road, Karnal",
    district: "Karnal", state: "Haryana", pincode: "132001",
    distance: "3.2 km", capacity: 150, currentQueue: 42,
    avgWaitTime: "1.5 hrs", status: "operational",
    facilities: ["Weighing", "Quality Check", "Parking", "Payment", "Storage"],
    operatingHours: "6:00 AM - 6:00 PM", rating: 4.5,
  },
  {
    id: "c2", name: "Panipat Mandi", address: "NH-44, Panipat",
    district: "Panipat", state: "Haryana", pincode: "132103",
    distance: "8.7 km", capacity: 200, currentQueue: 78,
    avgWaitTime: "2.1 hrs", status: "busy",
    facilities: ["Weighing", "Quality Check", "Parking", "Payment"],
    operatingHours: "6:00 AM - 5:00 PM", rating: 4.2,
  },
  {
    id: "c3", name: "Ambala Mandi", address: "GT Road, Ambala Cantt",
    district: "Ambala", state: "Haryana", pincode: "133001",
    distance: "15.4 km", capacity: 120, currentQueue: 15,
    avgWaitTime: "45 min", status: "operational",
    facilities: ["Weighing", "Quality Check", "Payment", "Canteen"],
    operatingHours: "7:00 AM - 4:00 PM", rating: 4.0,
  },
  {
    id: "c4", name: "Kurukshetra Mandi", address: "Pehowa Road, Kurukshetra",
    district: "Kurukshetra", state: "Haryana", pincode: "136118",
    distance: "22.1 km", capacity: 100, currentQueue: 95,
    avgWaitTime: "3.2 hrs", status: "busy",
    facilities: ["Weighing", "Quality Check"],
    operatingHours: "6:00 AM - 6:00 PM", rating: 3.8,
  },
  {
    id: "c5", name: "Sonipat Mandi", address: "Gohana Road, Sonipat",
    district: "Sonipat", state: "Haryana", pincode: "131001",
    distance: "12.5 km", capacity: 180, currentQueue: 0,
    avgWaitTime: "30 min", status: "operational",
    facilities: ["Weighing", "Quality Check", "Parking", "Payment", "Storage", "Canteen"],
    operatingHours: "5:30 AM - 6:00 PM", rating: 4.6,
  },
];

export const DEMO_SLOTS: Record<string, TimeSlot[]> = {
  c1: [
    { id: "s1", time: "06:00 AM - 08:00 AM", status: "available", booked: 12, capacity: 30 },
    { id: "s2", time: "08:00 AM - 10:00 AM", status: "available", booked: 20, capacity: 30 },
    { id: "s3", time: "10:00 AM - 12:00 PM", status: "few_left", booked: 25, capacity: 30 },
    { id: "s4", time: "12:00 PM - 02:00 PM", status: "full", booked: 30, capacity: 30 },
    { id: "s5", time: "02:00 PM - 04:00 PM", status: "available", booked: 8, capacity: 30 },
    { id: "s6", time: "04:00 PM - 06:00 PM", status: "available", booked: 5, capacity: 30 },
  ],
  c2: [
    { id: "s7", time: "06:00 AM - 08:00 AM", status: "few_left", booked: 28, capacity: 40 },
    { id: "s8", time: "08:00 AM - 10:00 AM", status: "full", booked: 40, capacity: 40 },
    { id: "s9", time: "10:00 AM - 12:00 PM", status: "few_left", booked: 35, capacity: 40 },
    { id: "s10", time: "12:00 PM - 02:00 PM", status: "available", booked: 10, capacity: 40 },
    { id: "s11", time: "02:00 PM - 04:00 PM", status: "available", booked: 15, capacity: 40 },
  ],
};

export function generateToken(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const prefix = letters[Math.floor(Math.random() * 26)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${prefix}${num}`;
}

export function getDates(): string[] {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toLocaleDateString("en-IN", { day: "numeric", month: "short", weekday: "short" }));
  }
  return dates;
}
