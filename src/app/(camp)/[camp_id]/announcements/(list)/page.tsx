import { AnnouncementsClient } from './AnnouncementsClient';

export default async function AnnouncementsPage({
  params,
}: {
  params: Promise<{ camp_id: string }>;
}) {
  const resolvedParams = await params;
  return <AnnouncementsClient campId={resolvedParams.camp_id} />;
}
