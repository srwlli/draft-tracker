'use client';

import { Input } from "@/components/ui/input";

interface DraftFormProps {
  draftName: string;
  onDraftNameChange: (value: string) => void;
}

export function DraftForm({ draftName, onDraftNameChange }: DraftFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="draftName" className="text-sm font-medium">Draft Name *</label>
        <Input
          id="draftName"
          placeholder="My Fantasy Draft 2025"
          value={draftName}
          onChange={(e) => onDraftNameChange(e.target.value)}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}