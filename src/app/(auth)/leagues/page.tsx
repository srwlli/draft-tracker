'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { CreateDraft } from '@/components/create-draft';
import { ActionCard } from '@/components/action-card';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Draft } from '@/types';
import { Calendar, Users, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyLeaguesPage() {
  const [recentDrafts, setRecentDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecentDrafts = async () => {
      try {
        const drafts = await api.drafts.list();
        // Take only the last 5 drafts
        setRecentDrafts(drafts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recent drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDrafts();
  }, []);

  const handleDraftClick = (draftId: string) => {
    router.push(`/draft/${draftId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return (
    <AuthPageLayout title="My Leagues">
      <div className="space-y-6">

        {/* Create New Draft */}
        <CreateDraft 
          title="Create New Draft"
          description="Start a new fantasy football draft session"
        />

        {/* Recent Drafts */}
        {loading ? (
          <ActionCard
            icon={<Skeleton className="w-5 h-5 rounded" />}
            title="Recent Drafts"
            description="Your last 5 draft sessions"
            content={
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="w-4 h-4" />
                  </div>
                ))}
              </div>
            }
            buttonText=""
            onButtonClick={() => {}}
            className="[&>div:last-child]:hidden"
          />
        ) : recentDrafts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No drafts found. Create your first draft above!
          </div>
        ) : (
          <ActionCard
            icon={<Users className="w-5 h-5 text-primary" />}
            title="Recent Drafts"
            description="Your last 5 draft sessions"
            content={
              <div className="space-y-3">
                {recentDrafts.map((draft) => (
                  <div 
                    key={draft.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleDraftClick(draft.id)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">
                        {draft.name || `Draft ${draft.id.slice(0, 8)}`}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(draft.created_at)}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            }
            buttonText=""
            onButtonClick={() => {}}
            className="[&>div:last-child]:hidden"
          />
        )}


      </div>
    </AuthPageLayout>
  );
}