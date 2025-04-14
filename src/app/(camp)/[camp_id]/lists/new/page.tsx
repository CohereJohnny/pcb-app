'use client';

import { useParams, useRouter } from 'next/navigation';
import { ListForm } from '@/components/features/lists/ListForm';

// Mock current user ID - Replace with actual authentication logic later
const MOCK_CURRENT_USER_ID = 'user-001'; // Alice Ashes (Organizer)

export default function NewListPage() {
  const params = useParams();
  const router = useRouter();
  const campId = params.camp_id as string;

  const handleSuccess = () => {
    // Redirect back to the lists overview page on successful creation
    router.push(`/${campId}/lists`);
    // Optionally, add a toast notification here
  };

  return (
    <div className="container mx-auto p-4">
      {/* Add a back button? Maybe later */}
      <ListForm
        campId={campId}
        authorUserId={MOCK_CURRENT_USER_ID}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
