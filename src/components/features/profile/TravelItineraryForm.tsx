'use client';

import React from 'react';
import { useForm, Controller, Resolver, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  travelItinerarySchema,
  type TravelItineraryFormData,
} from '@/lib/validators/profileSchema';

// Parse date strings into Date objects for the mock data
const MOCK_TRAVEL_DATA: Partial<TravelItineraryFormData> = {
  arrival_date: new Date('2024-08-27'),
  arrival_time: 'Afternoon',
  departure_date: new Date('2024-09-03'),
  departure_time: 'Morning',
  mode_of_transport: 'Personal Vehicle',
  origin: 'San Francisco, CA',
  vehicle_pass_status: 'HAVE',
  ride_status: 'HAVE',
  notes: 'Bringing extra water.',
};

export function TravelItineraryForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TravelItineraryFormData>({
    resolver: zodResolver(travelItinerarySchema) as unknown as Resolver<
      TravelItineraryFormData,
      FieldValues
    >,
    defaultValues: {
      arrival_date: MOCK_TRAVEL_DATA.arrival_date ?? null,
      arrival_time: MOCK_TRAVEL_DATA.arrival_time ?? null,
      departure_date: MOCK_TRAVEL_DATA.departure_date ?? null,
      departure_time: MOCK_TRAVEL_DATA.departure_time ?? null,
      mode_of_transport: MOCK_TRAVEL_DATA.mode_of_transport ?? null,
      origin: MOCK_TRAVEL_DATA.origin ?? null,
      vehicle_pass_status: MOCK_TRAVEL_DATA.vehicle_pass_status ?? null,
      ride_status: MOCK_TRAVEL_DATA.ride_status ?? null,
      notes: MOCK_TRAVEL_DATA.notes ?? null,
    },
  });

  const onSubmit = () => {
    // Simulate API call
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(void 0);
      }, 1000)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Travel Itinerary</CardTitle>
          <CardDescription>How are you getting to the Burn?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="arrival_date">Arrival Date</Label>
              <Controller
                control={control}
                name="arrival_date"
                render={({ field }) => (
                  <div className="relative">
                    <DatePicker
                      id="arrival_date"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      placeholderText="Select arrival date"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                )}
              />
              {errors.arrival_date && (
                <p className="text-destructive pt-1 text-sm font-medium">
                  {errors.arrival_date.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrival_time">Arrival Time (Approx)</Label>
              <Input
                id="arrival_time"
                placeholder="e.g., Afternoon"
                {...register('arrival_time')}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="departure_date">Departure Date</Label>
              <Controller
                control={control}
                name="departure_date"
                render={({ field }) => (
                  <div className="relative">
                    <DatePicker
                      id="departure_date"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      placeholderText="Select departure date"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                )}
              />
              {errors.departure_date && (
                <p className="text-destructive pt-1 text-sm font-medium">
                  {errors.departure_date.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="departure_time">Departure Time (Approx)</Label>
              <Input
                id="departure_time"
                placeholder="e.g., Morning"
                {...register('departure_time')}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="mode_of_transport">Mode of Transport</Label>
              <Input
                id="mode_of_transport"
                placeholder="e.g., Personal Vehicle, RV"
                {...register('mode_of_transport')}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                placeholder="e.g., San Francisco, CA"
                {...register('origin')}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="vehicle_pass_status">Vehicle Pass</Label>
              <Controller
                name="vehicle_pass_status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="vehicle_pass_status">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HAVE">Have</SelectItem>
                      <SelectItem value="NEED">Need</SelectItem>
                      <SelectItem value="NA">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ride_status">Ride Status</Label>
              <Controller
                name="ride_status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="ride_status">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HAVE">Have</SelectItem>
                      <SelectItem value="NEED">Need Ride</SelectItem>
                      <SelectItem value="OFFERING">Offering Ride</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="travel_notes">Travel Notes</Label>
            <Textarea
              id="travel_notes"
              placeholder="Anything else organizers should know?"
              {...register('notes')}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Travel Info'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
