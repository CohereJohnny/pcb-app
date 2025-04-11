import { ViewAnnouncementClient } from './ViewAnnouncementClient';

interface ViewAnnouncementPageProps {
  params: Promise<{
    camp_id: string;
    announcement_id: string;
  }>;
}

export default async function ViewAnnouncementPage({
  params: pageParamsPromise,
}: ViewAnnouncementPageProps) {
  const pageParams = await pageParamsPromise;
  return <ViewAnnouncementClient params={pageParams} />;
}
