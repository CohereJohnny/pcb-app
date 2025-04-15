import { z } from 'zod';

// --- Profile Form Schema ---
export const profileFormSchema = z.object({
  name: z.string().min(1, 'Legal name is required.'),
  playa_name: z.string().optional().nullable(),
  contact_info: z.string().optional().nullable(), // Could add .email() or other format later
  emergency_contact: z.string().optional().nullable(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

// --- Travel Itinerary Schema ---
// Proper date handling with preprocess
const zDateOptional = z.preprocess(
  (arg) => {
    if (!arg || (typeof arg === 'string' && arg.trim() === '')) return null;
    return arg instanceof Date ? arg : new Date(arg as string);
  },
  z
    .date()
    .optional()
    .nullable()
    .refine((date) => !date || !isNaN(date.getTime()), {
      message: 'Invalid date format',
    })
);

export const travelItinerarySchema = z.object({
  arrival_date: zDateOptional,
  arrival_time: z.string().optional().nullable(),
  departure_date: zDateOptional,
  departure_time: z.string().optional().nullable(),
  mode_of_transport: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  vehicle_pass_status: z.enum(['HAVE', 'NEED', 'NA']).optional().nullable(),
  ride_status: z.enum(['HAVE', 'NEED', 'OFFERING']).optional().nullable(),
  notes: z.string().optional().nullable(),
});

// Let Zod infer the type directly, as zDateOptional should handle the conversion
export type TravelItineraryFormData = z.infer<typeof travelItinerarySchema>;

// --- Accommodation Schema ---
export const accommodationSchema = z
  .object({
    type: z.string().optional().nullable(),
    size_details: z.string().optional().nullable(),
    power_needs: z.boolean().optional(),
    power_amps: z.number().int().positive().optional().nullable(),
    sharing_with: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      // If power is not needed, amps MUST be null/undefined
      return !data.power_needs ? data.power_amps == null : true;
    },
    {
      message: 'Power amps should only be specified if power is needed.',
      path: ['power_amps'],
    }
  );

export type AccommodationFormData = z.infer<typeof accommodationSchema>;

// --- Combined Schema for PUT Request Body / Database Row ---
// Matches the expected structure for the profiles table
export const updateProfileSchema = z.object({
  // Include fields from profileFormSchema
  name: z.string().min(1, 'Legal name cannot be empty if provided').optional(),
  playa_name: z.string().optional().nullable(),
  contact_info: z.string().optional().nullable(),
  emergency_contact: z.string().optional().nullable(),
  // Embed travel and accommodation schemas
  travel_itinerary: travelItinerarySchema.optional().nullable(),
  accommodation_details: accommodationSchema.optional().nullable(),
  // Note: We don't expect user_id or name in the PUT body,
  // user_id comes from auth, and name might be handled separately if needed.
});

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
