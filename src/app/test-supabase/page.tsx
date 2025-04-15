import { createClient } from '@/lib/supabase/server'; // Use the re-created helper
import { PostgrestError } from '@supabase/supabase-js';

// Define a minimal Camp type for this test
interface Camp {
  id: string;
  created_at: string;
  name: string;
}

export default async function TestSupabasePage() {
  const supabase = createClient(); // Call the helper

  let data: Camp[] | null = null;
  let error: PostgrestError | Error | null = null;

  try {
    // Use the client from the helper
    const result = await supabase.from('camps').select('*').returns<Camp[]>();
    data = result.data;
    error = result.error;
  } catch (e) {
    error = e instanceof Error ? e : new Error(String(e));
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">
        Supabase Connection Test (Tech Debt Investigation)
      </h1>
      <p>
        Attempting to fetch from the &apos;camps&apos; table using server
        helper...
      </p>
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
        blocking access for unauthenticated users. Build error investigation
        focuses on preventing the Type Error during `pnpm run build`.
      </p>
    </div>
  );
}
