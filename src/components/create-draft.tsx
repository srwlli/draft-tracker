'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { ActionCard } from '@/components/action-card';
import { DraftForm } from '@/components/draft-form';
import { Plus } from 'lucide-react';

interface CreateDraftProps {
  /**
   * Size variant for the ActionCard
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Optional custom icon
   */
  icon?: React.ReactNode;
  /**
   * Custom title text
   */
  title?: string;
  /**
   * Custom description text
   */
  description?: string;
  /**
   * Custom button text
   */
  buttonText?: string;
  /**
   * Callback when draft is successfully created
   */
  onDraftCreated?: (draft: { id: string; admin_token: string; name?: string }) => void;
}

export function CreateDraft({
  size = 'md',
  icon = <Plus className="w-5 h-5 text-primary" />,
  title = 'Create New Draft',
  description = 'Start a new fantasy football draft',
  buttonText = 'Create Draft',
  onDraftCreated
}: CreateDraftProps) {
  const [draftName, setDraftName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const createDraft = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating draft - User state:', { user: user?.email, id: user?.id });
    }
    
    if (!user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No user found, returning');
      }
      toast.error('Please log in to create a draft');
      return;
    }
    
    if (!draftName.trim()) {
      toast.error('Please enter a draft name');
      return;
    }
    
    setIsLoading(true);
    try {
      const draft = await api.drafts.create(draftName.trim());
      
      // Call optional callback first
      onDraftCreated?.(draft);
      
      // Navigate to admin page; server sets HttpOnly admin cookie
      router.push(`/draft/${draft.id}/admin`);
      
      // Clear form
      setDraftName('');
      
      toast.success('Draft created successfully!');
    } catch (error) {
      console.error('Error creating draft:', error);
      toast.error('Failed to create draft');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActionCard
      size={size}
      icon={icon}
      title={title}
      description={description}
      content={
        <DraftForm 
          draftName={draftName} 
          onDraftNameChange={setDraftName} 
        />
      }
      buttonText={buttonText}
      onButtonClick={createDraft}
      loading={isLoading}
    />
  );
}
