'use client';

import { PlayerWithStatus } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DraftedPlayersTableProps {
  players: PlayerWithStatus[];
  isAdmin: boolean;
  onUndraft: (playerId: number) => void;
}

export function DraftedPlayersTable({ players, isAdmin, onUndraft }: DraftedPlayersTableProps) {
  // Sort by draft order (assuming is_drafted timestamp or we'll use array order)
  const draftedPlayers = players.filter(p => p.is_drafted);

  if (draftedPlayers.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Drafted Players</h2>
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
    </div>
  );
}