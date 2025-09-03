'use client';

import { useState } from 'react';
import { PlayerWithStatus, Position } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DraftedPlayersTableProps {
  players: PlayerWithStatus[];
  isAdmin: boolean;
  onUndraft: (playerId: number) => void;
  selectedPosition?: Position | 'ALL';
}

export function DraftedPlayersTable({ players, isAdmin, onUndraft, selectedPosition = 'ALL' }: DraftedPlayersTableProps) {
  const [confirmUndraft, setConfirmUndraft] = useState<PlayerWithStatus | null>(null);
  
  // Filter drafted players by selected position
  const draftedPlayers = players
    .filter(p => p.is_drafted)
    .filter(p => selectedPosition === 'ALL' || p.position === selectedPosition);

  const handleConfirmUndraft = () => {
    if (confirmUndraft) {
      onUndraft(confirmUndraft.id);
      setConfirmUndraft(null);
    }
  };

  if (draftedPlayers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground rounded-md border min-h-screen flex items-center justify-center">
        No {selectedPosition === 'ALL' ? '' : selectedPosition} players drafted yet
      </div>
    );
  }

  return (
    <div className="rounded-md border min-h-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Pick</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Position</TableHead>
              {isAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {draftedPlayers.map((player, index) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">
                  #{index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {player.name}
                </TableCell>
                <TableCell>
                  {player.team}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {player.position}
                  </Badge>
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmUndraft(player)}
                    >
                      Undo
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

      <AlertDialog open={!!confirmUndraft} onOpenChange={() => setConfirmUndraft(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Undo Draft Pick?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to undo the draft of {confirmUndraft?.name} ({confirmUndraft?.position} - {confirmUndraft?.team})? This will make them available to draft again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUndraft}>Undo Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}