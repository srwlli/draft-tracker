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
  const [pressedPlayer, setPressedPlayer] = useState<number | null>(null);
  const [confirmPlayer, setConfirmPlayer] = useState<PlayerWithStatus | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (player: PlayerWithStatus) => {
    if (!isAdmin || player.is_drafted) return;
    
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow 
              key={player.id}
              className={`${player.is_drafted ? 'opacity-50 bg-muted/50' : ''} ${
                pressedPlayer === player.id ? 'bg-primary/20' : ''
              } ${isAdmin && !player.is_drafted ? 'select-none' : ''}`}
              style={isAdmin && !player.is_drafted ? { 
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
              <TableCell className={player.is_drafted ? 'line-through' : ''}>
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
              <TableCell>
                {player.is_drafted ? (
                  <Badge variant="destructive">Drafted</Badge>
                ) : (
                  <Badge variant="outline">Available</Badge>
                )}
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  {player.is_drafted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUndraft(player.id)}
                    >
                      Undo
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onDraft(player.id)}
                    >
                      Draft
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {players.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No players found
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