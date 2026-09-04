import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type UserRole,
  type User,
  type ProcurementCenter,
  type Booking,
  type Notification,
  type TimeSlot,
  DEMO_CENTERS,
  DEMO_SLOTS,
  generateToken,
} from "./demo-data";
export type { UserRole } from "./demo-data";

interface DemoState {
  currentUser: User | null;
  centers: ProcurementCenter[];
  bookings: Booking[];
  notifications: Notification[];
  slots: Record<string, TimeSlot[]>;
  allTokens: string[];
}

interface DemoContextType extends DemoState {
  login: (role: UserRole) => void;
  logout: () => void;
  createBooking: (centerId: string, crop: string, qty: number, unit: string, date: string, slot: string) => Booking | null;
  updateBookingStatus: (bookingId: string, status: Booking["status"], extra?: Partial<Booking>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  getActiveBooking: () => Booking | null;
  getFarmerBookings: () => Booking[];
  getCenterBookings: (centerId: string) => Booking[];
  getTodayBookings: () => Booking[];
  getCompletedBookings: () => Booking[];
  getCenterById: (id: string) => ProcurementCenter | undefined;
}

const DemoContext = createContext<DemoContextType | null>(null);

const DEMO_USERS: Record<UserRole, User> = {
  farmer: {
    id: "u1", name: "Ramesh Kumar", role: "farmer",
    phone: "+91 98765 43210", location: "Karnal, Haryana", farmerId: "KT12345",
  },
  operator: {
    id: "u2", name: "Suresh Verma", role: "operator",
    phone: "+91 98765 43211", location: "Karnal Mandi",
  },
  admin: {
    id: "u3", name: "District Admin", role: "admin",
    phone: "+91 98765 43212", location: "Karnal, Haryana",
  },
};

const DEMO_BOOKINGS: Booking[] = [
  {
    id: "b1", farmerId: "u1", farmerName: "Ramesh Kumar",
    centerId: "c1", centerName: "Karnal Mandi",
    crop: "Wheat", quantity: 20, quantityUnit: "Quintal",
    date: "28 May 2025", timeSlot: "08:00 AM - 10:00 AM",
    tokenNumber: "KT5621", status: "in_queue",
    queuePosition: 12, totalInQueue: 128,
    estimatedWait: "1h 20m", createdAt: "28 May 2025, 10:30 AM",
  },
];

function generateInitialNotifications(): Notification[] {
  return [
    { id: "n1", title: "Token Generated", message: "Your token KT5621 has been generated for Karnal Mandi", type: "token", read: false, createdAt: "28 May 2025, 10:31 AM" },
    { id: "n2", title: "Queue Update", message: "You are at position 12 of 128 in the queue", type: "queue", read: false, createdAt: "28 May 2025, 10:32 AM" },
    { id: "n3", title: "Slot Confirmed", message: "Your booking at Karnal Mandi for 28 May is confirmed", type: "booking", read: true, createdAt: "28 May 2025, 10:30 AM" },
    { id: "n4", title: "System Update", message: "Weather alert: Partly cloudy today. Carry rain protection.", type: "system", read: false, createdAt: "28 May 2025, 08:00 AM" },
  ];
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(DEMO_BOOKINGS);
  const [notifications, setNotifications] = useState<Notification[]>(generateInitialNotifications);
  const [allTokens, setAllTokens] = useState<string[]>(["KT5621", "KT5610", "KT5611", "KT5609", "KT5608"]);

  const login = useCallback((role: UserRole) => {
    setCurrentUser(DEMO_USERS[role]);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const getActiveBooking = useCallback(() => {
    return bookings.find(b => b.farmerId === currentUser?.id && ["confirmed", "in_queue", "processing"].includes(b.status)) || null;
  }, [bookings, currentUser]);

  const createBooking = useCallback((
    centerId: string, crop: string, qty: number, unit: string, date: string, slot: string
  ): Booking | null => {
    if (!currentUser) return null;
    const center = DEMO_CENTERS.find(c => c.id === centerId);
    if (!center) return null;

    const token = generateToken();
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      centerId,
      centerName: center.name,
      crop,
      quantity: qty,
      quantityUnit: unit,
      date,
      timeSlot: slot,
      tokenNumber: token,
      status: "confirmed",
      queuePosition: center.currentQueue + 1,
      totalInQueue: center.currentQueue + 1,
      estimatedWait: `${Math.floor(1 + Math.random() * 3)}h ${Math.floor(Math.random() * 59)}m`,
      createdAt: new Date().toLocaleString("en-IN"),
    };

    setBookings(prev => [newBooking, ...prev]);
    setAllTokens(prev => [token, ...prev]);

    const newNotification: Notification = {
      id: `n${Date.now()}`,
      title: "Booking Confirmed! 🎉",
      message: `Your token ${token} has been generated for ${center.name}`,
      type: "token",
      read: false,
      createdAt: new Date().toLocaleString("en-IN"),
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Simulate queue progression
    setTimeout(() => {
      setBookings(prev => prev.map(b =>
        b.id === newBooking.id ? { ...b, status: "in_queue" as const } : b
      ));
    }, 2000);

    return newBooking;
  }, [currentUser]);

  const updateBookingStatus = useCallback((bookingId: string, status: Booking["status"], extra?: Partial<Booking>) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      const updated = { ...b, status, ...extra };
      if (status === "completed") {
        updated.completedAt = new Date().toLocaleString("en-IN");
        updated.weight = b.quantity * (0.95 + Math.random() * 0.1);
        updated.qualityGrade = "A";
        updated.paymentAmount = Math.floor(b.quantity * (2000 + Math.random() * 500));
      }
      return updated;
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const getFarmerBookings = useCallback(() => {
    return bookings.filter(b => b.farmerId === currentUser?.id);
  }, [bookings, currentUser]);

  const getCenterBookings = useCallback((centerId: string) => {
    return bookings.filter(b => b.centerId === centerId);
  }, [bookings]);

  const getTodayBookings = useCallback(() => {
    return bookings.filter(b => ["in_queue", "processing", "confirmed"].includes(b.status));
  }, [bookings]);

  const getCompletedBookings = useCallback(() => {
    return bookings.filter(b => b.status === "completed");
  }, [bookings]);

  const getCenterById = useCallback((id: string) => {
    return DEMO_CENTERS.find(c => c.id === id);
  }, []);

  return (
    <DemoContext.Provider value={{
      currentUser, centers: DEMO_CENTERS, bookings, notifications,
      slots: DEMO_SLOTS, allTokens,
      login, logout, createBooking, updateBookingStatus,
      markNotificationRead, markAllNotificationsRead,
      getActiveBooking, getFarmerBookings, getCenterBookings,
      getTodayBookings, getCompletedBookings, getCenterById,
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
