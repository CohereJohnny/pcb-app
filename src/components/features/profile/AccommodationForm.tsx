'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  accommodationSchema,
  type AccommodationFormData,
} from '@/lib/validators/profileSchema';

// Mock initial data
const MOCK_ACCOMMODATION_DATA: Partial<AccommodationFormData> = {
  type: 'Tent',
  size_details: '10x10',
  power_needs: false,
  power_amps: undefined,
  sharing_with: '',
};

export function AccommodationForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AccommodationFormData>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      type: MOCK_ACCOMMODATION_DATA.type ?? null,
      size_details: MOCK_ACCOMMODATION_DATA.size_details ?? null,
      power_needs: MOCK_ACCOMMODATION_DATA.power_needs ?? false,
      power_amps: MOCK_ACCOMMODATION_DATA.power_amps ?? null,
      sharing_with: MOCK_ACCOMMODATION_DATA.sharing_with ?? null,
    },
  });

  const powerNeedsValue = watch('power_needs');

  const onSubmit = (/* data: AccommodationFormData */) => {
    // const submissionData = data.power_needs
    //   ? data
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Accommodation</CardTitle>
          <CardDescription>
            What are your sleeping arrangements?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                placeholder="e.g., Tent, RV, Yurt, Car"
                {...register('type')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size_details">Size Details</Label>
              <Input
                id="size_details"
                placeholder="e.g., 10x10 Tent, 25ft RV"
                {...register('size_details')}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-center space-x-2 pt-2">
              <Controller
                name="power_needs"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="power_needs"
                    checked={field.value === true}
                    onCheckedChange={(checkedState) =>
                      field.onChange(checkedState === true)
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
              <Label
                htmlFor="power_needs"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Need Camp Power?
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="power_amps">Power Amps (if needed)</Label>
              <Input
                type="number"
                id="power_amps"
                placeholder="e.g., 30, 50"
                {...register('power_amps', { valueAsNumber: true })}
                disabled={!powerNeedsValue}
              />
              {errors.power_amps && (
                <p className="text-sm font-medium text-destructive pt-1">
                  {errors.power_amps.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sharing_with">Sharing With</Label>
            <Input
              id="sharing_with"
              placeholder="Names of people sharing structure/power"
              {...register('sharing_with')}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border px-6 py-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Accommodation Info'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
