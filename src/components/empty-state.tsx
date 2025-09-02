'use client';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-4 text-muted-foreground">
      <p className="text-sm">{message}</p>
    </div>
  );
}