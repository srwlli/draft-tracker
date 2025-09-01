'use client';

import { useState, useRef } from 'react';
import { PlayerWithStatus } from '@/types';
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

interface PlayerTableProps {
  players: PlayerWithStatus[];
  isAdmin: boolean;
  onDraft: (playerId: number) => void;
  onUndraft: (playerId: number) => void;
}

export function PlayerTable({ players, isAdmin, onDraft, onUndraft }: PlayerTableProps) {
  // Filter to show only available players
  const availablePlayers = players.filter(p => !p.is_drafted);
  const [pressedPlayer, setPressedPlayer] = useState<number | null>(null);
  const [confirmPlayer, setConfirmPlayer] = useState<PlayerWithStatus | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (player: PlayerWithStatus) => {
    if (!isAdmin) return;
    
    setPressedPlayer(player.id);
    longPressTimer.current = setTimeout(() => {
      setConfirmPlayer(player);
      setPressedPlayer(null);
      // Add haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }, 500); // 500ms hold time
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setPressedPlayer(null);
  };

  const handleConfirmDraft = () => {
    if (confirmPlayer) {
      onDraft(confirmPlayer.id);
      setConfirmPlayer(null);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="rounded-md border">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Position</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {availablePlayers.map((player) => (
            <TableRow 
              key={player.id}
              className={`${
                pressedPlayer === player.id ? 'bg-primary/20' : ''
              } ${isAdmin ? 'select-none' : ''}`}
              style={isAdmin ? { 
                WebkitUserSelect: 'none', 
                WebkitTouchCallout: 'none',
                userSelect: 'none'
              } : {}}
              onTouchStart={() => handleTouchStart(player)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <TableCell className="font-medium">
                {player.custom_rank || player.default_rank}
              </TableCell>
              <TableCell>
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
                    variant="default"
                    size="sm"
                    onClick={() => onDraft(player.id)}
                  >
                    Draft
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      {availablePlayers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground min-h-screen flex items-center justify-center">
          No available players in this position
        </div>
      )}

      <AlertDialog open={!!confirmPlayer} onOpenChange={() => setConfirmPlayer(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Draft Player?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to draft {confirmPlayer?.name} ({confirmPlayer?.position} - {confirmPlayer?.team})?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDraft}>Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}