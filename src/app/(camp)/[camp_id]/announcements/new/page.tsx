'use client'; // Form needs to be client-side

import { useParams, useRouter } from 'next/navigation';
import { AnnouncementForm } from '@/components/features/announcements/AnnouncementForm';

// Mock current user ID - Replace with actual authentication logic later
const MOCK_CURRENT_USER_ID = 'user-001'; // Alice Ashes (Organizer)

export default function NewAnnouncementPage() {
  const params = useParams();
  const router = useRouter();
  const campId = params.camp_id as string; // Assuming camp_id is always present

  const handleSuccess = () => {
    // Redirect back to the announcements list page on successful creation
    router.push(`/${campId}/announcements`);
    // Optionally, add a toast notification here
  };

  return (
    <div className="container mx-auto p-4">
      <AnnouncementForm
        campId={campId}
        authorUserId={MOCK_CURRENT_USER_ID}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
