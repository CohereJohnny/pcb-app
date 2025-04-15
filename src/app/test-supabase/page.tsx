// import { createClient } from '@/lib/supabase/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PostgrestError } from '@supabase/supabase-js';

// Define a minimal Camp type for this test
interface Camp {
  id: string;
  created_at: string;
  name: string;
}

export default async function TestSupabasePage() {
  // --- Client creation logic moved here ---
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  // --- End client creation logic ---

  let data: Camp[] | null = null;
  let error: PostgrestError | Error | null = null;

  try {
    // Attempt to fetch camps. RLS is active, so this will likely return an empty array
    // for an unauthenticated user, but a successful connection means no error.
    const result = await supabase.from('camps').select('*').returns<Camp[]>(); // Specify return type
    data = result.data;
    error = result.error;
  } catch (e) {
    error = e instanceof Error ? e : new Error(String(e)); // Ensure it's an Error object
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Supabase Connection Test</h1>
      <p>Attempting to fetch from the &apos;camps&apos; table...</p>{' '}
      {/* Escaped quote */}
      <div className="mt-4 rounded border bg-gray-50 p-2 dark:bg-gray-800">
        <h2 className="font-semibold">Result:</h2>
        {error ? (
          <pre className="text-red-500">
            Error: {JSON.stringify(error, null, 2)}
          </pre>
        ) : (
          <pre className="text-green-500">
            Success! Data: {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Note: An empty array `[]` in data is expected if RLS is correctly
        blocking access for unauthenticated users. The key is the absence of an
        error.
      </p>
    </div>
  );
}
