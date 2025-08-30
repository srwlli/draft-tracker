'use client';

import { PlayerWithStatus } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PlayerTableProps {
  players: PlayerWithStatus[];
  isAdmin: boolean;
  onDraft: (playerId: number) => void;
  onUndraft: (playerId: number) => void;
}

export function PlayerTable({ players, isAdmin, onDraft, onUndraft }: PlayerTableProps) {
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
              className={player.is_drafted ? 'opacity-50 bg-muted/50' : ''}
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
    </div>
  );
}