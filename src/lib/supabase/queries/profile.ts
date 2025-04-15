import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// NOTE: Direct client instantiation needed due to unresolved build issues with server helpers
// See: sprints/tech_debt.md
function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // set/remove omitted for read-only client needed here, matching workaround
      },
    }
  );
}

export async function fetchUserProfile(userId: string) {
  const supabase = createSupabaseServerClient();

  console.log(`Fetching profile for user: ${userId}`);

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        user_id,
        updated_at,
        playa_name,
        contact_info,
        emergency_contact,
        travel_itinerary,
        accommodation_details
      `
      )
      .eq('user_id', userId)
      .single(); // Use single() as user_id is PK, expecting 0 or 1 row

    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116: The result contains 0 rows
        console.log(`No profile found for user ${userId}, returning null.`);
        return { profile: null, error: null };
      } else {
        console.error('Error fetching profile:', error);
        return { profile: null, error };
      }
    }

    console.log(`Profile found for user ${userId}:`, data);
    return { profile: data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching profile:', err);
    // Ensure a consistent return type even on unexpected errors
    const error =
      err instanceof Error ? err : new Error('An unexpected error occurred');
    return { profile: null, error };
  }
}
