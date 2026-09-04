import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  FARMER: "farmer",
  OPERATOR: "operator",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.FARMER),
  v.literal(ROLES.OPERATOR),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
      phone: v.optional(v.string()),
      location: v.optional(v.string()),
    }).index("email", ["email"]),

    procurementCenters: defineTable({
      name: v.string(),
      address: v.string(),
      district: v.string(),
      state: v.string(),
      pincode: v.string(),
      latitude: v.number(),
      longitude: v.number(),
      capacity: v.number(),
      currentQueue: v.number(),
      avgWaitTime: v.number(),
      status: v.union(v.literal("operational"), v.literal("busy"), v.literal("closed")),
      facilities: v.array(v.string()),
      operatingHours: v.string(),
      contactPhone: v.string(),
    }).index("by_district", ["district"]),

    bookings: defineTable({
      farmerId: v.string(),
      farmerName: v.string(),
      centerId: v.string(),
      centerName: v.string(),
      crop: v.string(),
      quantity: v.number(),
      quantityUnit: v.string(),
      date: v.string(),
      timeSlot: v.string(),
      tokenNumber: v.string(),
      status: v.union(
        v.literal("confirmed"),
        v.literal("in_queue"),
        v.literal("processing"),
        v.literal("completed"),
        v.literal("cancelled")
      ),
      queuePosition: v.number(),
      estimatedWait: v.string(),
      createdAt: v.number(),
      completedAt: v.optional(v.number()),
      weight: v.optional(v.number()),
      qualityGrade: v.optional(v.string()),
      paymentAmount: v.optional(v.number()),
    }).index("by_farmer", ["farmerId"])
      .index("by_center", ["centerId"])
      .index("by_status", ["status"]),

    notifications: defineTable({
      userId: v.string(),
      title: v.string(),
      message: v.string(),
      type: v.union(
        v.literal("token"),
        v.literal("queue"),
        v.literal("booking"),
        v.literal("system")
      ),
      read: v.boolean(),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    timeSlots: defineTable({
      centerId: v.string(),
      date: v.string(),
      slot: v.string(),
      capacity: v.number(),
      booked: v.number(),
      status: v.union(v.literal("available"), v.literal("few_left"), v.literal("full")),
    }).index("by_center_date", ["centerId", "date"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
