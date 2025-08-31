'use client';

import { PlayerWithStatus, Position } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DraftedPlayersTableProps {
  players: PlayerWithStatus[];
  isAdmin: boolean;
  onUndraft: (playerId: number) => void;
  selectedPosition?: Position | 'ALL';
}

export function DraftedPlayersTable({ players, isAdmin, onUndraft, selectedPosition = 'ALL' }: DraftedPlayersTableProps) {
  // Filter drafted players by selected position
  const draftedPlayers = players
    .filter(p => p.is_drafted)
    .filter(p => selectedPosition === 'ALL' || p.position === selectedPosition);

  if (draftedPlayers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground rounded-md border">
        No {selectedPosition === 'ALL' ? '' : selectedPosition} players drafted yet
      </div>
    );
  }

  return (
    <div className="rounded-md border">
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
                      onClick={() => onUndraft(player.id)}
                    >
                      Undo
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}