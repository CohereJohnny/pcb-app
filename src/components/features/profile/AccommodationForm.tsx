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
import { useProfileMutations } from '@/hooks/useProfileMutations';
import type { UpdateProfilePayload } from '@/lib/validators/profileSchema';

// Type for the props, including optional initialData
interface AccommodationFormProps {
  initialData: AccommodationFormData | null;
}

// Removed mock data
// const MOCK_ACCOMMODATION_DATA: Partial<AccommodationFormData> = { ... };

// Accept initialData prop
export function AccommodationForm({ initialData }: AccommodationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<AccommodationFormData>({
    resolver: zodResolver(accommodationSchema),
    // Use initialData for default values
    defaultValues: {
      type: initialData?.type ?? null,
      size_details: initialData?.size_details ?? null,
      power_needs: initialData?.power_needs ?? false,
      power_amps: initialData?.power_amps ?? null,
      sharing_with: initialData?.sharing_with ?? null,
    },
  });

  // Use the mutation hook
  const {
    updateProfile,
    isLoading: isMutating,
    error: mutationError,
  } = useProfileMutations();

  // Reset form when initialData changes
  React.useEffect(() => {
    reset({
      type: initialData?.type ?? null,
      size_details: initialData?.size_details ?? null,
      power_needs: initialData?.power_needs ?? false,
      power_amps: initialData?.power_amps ?? null,
      sharing_with: initialData?.sharing_with ?? null,
    });
  }, [initialData, reset]);

  const powerNeedsValue = watch('power_needs');

  // Update onSubmit to use the hook
  const onSubmit = async (data: AccommodationFormData) => {
    console.log('[AccommodationForm] Submitting:', data);
    // Construct payload for the API (nested structure)
    const payload: UpdateProfilePayload = {
      accommodation_details: data,
    };
    const result = await updateProfile(payload);
    if (result.success) {
      console.log('[AccommodationForm] Update successful!');
      // TODO: Add success feedback (e.g., toast)
    } else {
      console.error('[AccommodationForm] Update failed:', result.error);
      // TODO: Add error feedback (e.g., toast)
    }
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
                <p className="text-destructive pt-1 text-sm font-medium">
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
          {/* Display mutation error near footer */}
          {mutationError && (
            <p className="text-destructive pt-1 text-sm font-medium">
              Error saving accommodation info: {mutationError}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-border flex justify-end border-t px-6 py-4">
          <Button type="submit" disabled={isMutating}>
            {isMutating ? 'Saving...' : 'Save Accommodation Info'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
