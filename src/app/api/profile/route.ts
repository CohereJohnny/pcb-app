import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { updateProfileSchema } from '@/lib/validators/profileSchema';

export const dynamic = 'force-dynamic'; // Ensure this route is always dynamic

export async function GET(request: NextRequest) {
  const response = NextResponse.next(); // Base response for potential cookie setting

  let supabase;
  try {
    // Create client using request cookies - reliable pattern in Route Handlers
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          // We might need set/remove if getUser refreshes the token
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            // response = NextResponse.next({ request: { headers: request.headers } }); // Re-evaluate if needed
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            // response = NextResponse.next({ request: { headers: request.headers } }); // Re-evaluate if needed
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );
  } catch (error) {
    console.error(
      '[API GET /api/profile] Error creating Supabase client:',
      error
    );
    return NextResponse.json(
      { error: 'Internal Server Error (Client Creation)' },
      { status: 500 }
    );
  }

  try {
    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.warn('[API GET /api/profile] Unauthorized access attempt.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[API GET /api/profile] User ${user.id} authenticated.`);

    // Fetch profile data
    const { data: profile, error: profileError } = await supabase
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
      .eq('user_id', user.id)
      .maybeSingle(); // maybeSingle returns null if not found, no error

    if (profileError) {
      console.error(
        '[API GET /api/profile] Error fetching profile:',
        profileError
      );
      return NextResponse.json(
        { error: 'Internal Server Error (Profile Fetch)' },
        { status: 500 }
      );
    }

    if (!profile) {
      console.log(
        `[API GET /api/profile] Profile not found for user ${user.id}, returning null.`
      );
      // Return 200 OK with null data, page component can handle creating one
      return NextResponse.json(null, {
        status: 200,
        headers: response.headers,
      });
    }

    console.log(`[API GET /api/profile] Profile found for user ${user.id}.`);
    return NextResponse.json(profile, {
      status: 200,
      headers: response.headers,
    });
  } catch (error) {
    console.error('[API GET /api/profile] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const response = NextResponse.next(); // Base response for potential cookie setting

  let supabase;
  try {
    // Create client using request cookies
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );
  } catch (error) {
    console.error(
      '[API PUT /api/profile] Error creating Supabase client:',
      error
    );
    return NextResponse.json(
      { error: 'Internal Server Error (Client Creation)' },
      { status: 500 }
    );
  }

  try {
    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const requestData = await request.json();

    // Validate request body
    const validationResult = updateProfileSchema.safeParse(requestData);

    if (!validationResult.success) {
      console.error(
        '[API PUT /api/profile] Validation failed:',
        validationResult.error.flatten()
      );
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Perform upsert operation
    const { error: upsertError } = await supabase.from('profiles').upsert(
      {
        user_id: user.id, // Set the user_id from authenticated user
        ...validatedData, // Spread the validated fields
        // updated_at is handled by the database trigger
      },
      { onConflict: 'user_id' }
    ); // Specify the conflict target

    if (upsertError) {
      console.error('[API PUT /api/profile] Upsert error:', upsertError);
      return NextResponse.json(
        { error: 'Internal Server Error (Database Update)' },
        { status: 500 }
      );
    }

    console.log(
      `[API PUT /api/profile] Profile updated successfully for user ${user.id}.`
    );
    // Return success, maybe return the updated profile? For now, just success.
    return NextResponse.json(
      { success: true },
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.error('[API PUT /api/profile] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
