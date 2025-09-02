'use client';

import { Link, Shield } from "lucide-react";
import { ActionCard } from '@/components/action-card';
import { AuthPageLayout } from '@/components/auth-page-layout';
import { toast } from 'sonner';

export default function AdminPage() {

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback for mobile browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (e) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  };

  const handleCopyViewerLink = async () => {
    // Extract draft ID from URL path
    const pathSegments = window.location.pathname.split('/');
    const draftId = pathSegments[2]; // Assumes /draft/[draftId]/admin/[adminToken]
    
    if (draftId) {
      const viewerUrl = `${window.location.origin}/draft/${draftId}`;
      const success = await copyToClipboard(viewerUrl);
      if (success) {
        toast.success('Viewer link copied to clipboard');
      } else {
        toast.error('Failed to copy link');
      }
    }
  };

  const handleCopyAdminLink = async () => {
    // Copy current admin URL
    const adminUrl = window.location.href;
    const success = await copyToClipboard(adminUrl);
    if (success) {
      toast.success('Admin link copied to clipboard');
    } else {
      toast.error('Failed to copy link');
    }
  };

  return (
    <AuthPageLayout title="Admin">
      <div className="space-y-4">
        <ActionCard
          icon={<Link className="h-5 w-5" />}
          title="Copy Viewer Link"
          description="Share read-only access to this draft"
          buttonText="Copy Link"
          onButtonClick={handleCopyViewerLink}
        />

        <ActionCard
          icon={<Shield className="h-5 w-5" />}
          title="Copy Admin Link"
          description="Share admin access to this draft"
          buttonText="Copy Link"
          onButtonClick={handleCopyAdminLink}
        />
      </div>
    </AuthPageLayout>
  );
}