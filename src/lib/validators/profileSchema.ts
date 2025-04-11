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
// Temporarily simplifying date handling to avoid type issues
// const zDateOptional = z.preprocess((arg) => {
//   if (!arg || typeof arg === 'string' && arg.trim() === '') return null;
//   const date = new Date(arg as string);
//   return isNaN(date.getTime()) ? null : date;
// }, z.date().optional().nullable());

export const travelItinerarySchema = z.object({
  arrival_date: z.string().optional().nullable(), // Treat as string for now
  arrival_time: z.string().optional().nullable(),
  departure_date: z.string().optional().nullable(), // Treat as string for now
  departure_time: z.string().optional().nullable(),
  mode_of_transport: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  vehicle_pass_status: z.enum(['HAVE', 'NEED', 'NA']).optional().nullable(),
  ride_status: z.enum(['HAVE', 'NEED', 'OFFERING']).optional().nullable(),
  notes: z.string().optional().nullable(),
});

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
