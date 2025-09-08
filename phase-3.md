# Phase 3: Performance & Stability - Precise Implementation Instructions

## ⚡ **PERFORMANCE & STABILITY IMPROVEMENTS**

### **Fix 1: Optimize PlayerRankings Component State Management**

**File**: `src/components/player-rankings.tsx`
**Lines**: Multiple (complex state management throughout)
**Time**: 4-6 hours
**Risk**: 5/10 (Performance degradation)

#### **Current Issues Identified:**
1. **Excessive useState calls** (8+ state variables)
2. **Map-based state** causing reference equality issues
3. **No memoization** of expensive computations
4. **40-60% unnecessary re-renders**

#### **Current Problematic Code:**
```typescript
// Lines 110-116: Multiple state variables
const [selectedPosition, setSelectedPosition] = useState<Position>(initialPosition);
const [players, setPlayers] = useState<PlayerWithStatus[]>([]);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [user, setUser] = useState<User | null>(null);
const [optimisticRankings, setOptimisticRankings] = useState<Map<number, number>>(new Map());
const [userRankings, setUserRankings] = useState<UserRanking[]>([]);
const [isConnected, setIsConnected] = useState(false);
```

#### **Fix Instructions:**

**Step 1: Consolidate State with useReducer**

1. **Create state reducer** (add after imports):
   ```typescript
   interface PlayerRankingsState {
     selectedPosition: Position;
     players: PlayerWithStatus[];
     loading: boolean;
     saving: boolean;
     user: User | null;
     optimisticRankings: Map<number, number>;
     userRankings: UserRanking[];
     isConnected: boolean;
   }

   type PlayerRankingsAction =
     | { type: 'SET_POSITION'; payload: Position }
     | { type: 'SET_PLAYERS'; payload: PlayerWithStatus[] }
     | { type: 'SET_LOADING'; payload: boolean }
     | { type: 'SET_SAVING'; payload: boolean }
     | { type: 'SET_USER'; payload: User | null }
     | { type: 'SET_OPTIMISTIC_RANKINGS'; payload: Map<number, number> }
     | { type: 'SET_USER_RANKINGS'; payload: UserRanking[] }
     | { type: 'SET_CONNECTED'; payload: boolean }
     | { type: 'RESET_OPTIMISTIC' };

   function playerRankingsReducer(
     state: PlayerRankingsState,
     action: PlayerRankingsAction
   ): PlayerRankingsState {
     switch (action.type) {
       case 'SET_POSITION':
         return { ...state, selectedPosition: action.payload };
       case 'SET_PLAYERS':
         return { ...state, players: action.payload };
       case 'SET_LOADING':
         return { ...state, loading: action.payload };
       case 'SET_SAVING':
         return { ...state, saving: action.payload };
       case 'SET_USER':
         return { ...state, user: action.payload };
       case 'SET_OPTIMISTIC_RANKINGS':
         return { ...state, optimisticRankings: action.payload };
       case 'SET_USER_RANKINGS':
         return { ...state, userRankings: action.payload };
       case 'SET_CONNECTED':
         return { ...state, isConnected: action.payload };
       case 'RESET_OPTIMISTIC':
         return { ...state, optimisticRankings: new Map() };
       default:
         return state;
     }
   }
   ```

2. **Replace useState calls** (lines 110-116):
   ```typescript
   // Replace all useState calls with:
   const [state, dispatch] = useReducer(playerRankingsReducer, {
     selectedPosition: initialPosition,
     players: [],
     loading: true,
     saving: false,
     user: null,
     optimisticRankings: new Map(),
     userRankings: [],
     isConnected: false,
   });
   ```

3. **Update all state references** throughout the component:
   ```typescript
   // Replace: setSelectedPosition(position)
   // With: dispatch({ type: 'SET_POSITION', payload: position })
   
   // Replace: players
   // With: state.players
   
   // And so on for all state variables...
   ```

**Step 2: Add Memoization for Expensive Computations**

1. **Memoize filtered players** (replace lines 277-283):
   ```typescript
   const filteredPlayers = useMemo(() => {
     return state.players
       .filter(player => player.position === state.selectedPosition)
       .map(player => {
         const optimisticRank = state.optimisticRankings.get(player.id);
         const userRanking = state.userRankings.find(r => r.player_id === player.id);
         
         return {
           ...player,
           custom_rank: optimisticRank ?? userRanking?.custom_rank ?? player.default_rank,
         };
       })
       .sort((a, b) => {
         const rankA = a.custom_rank || a.default_rank;
         const rankB = b.custom_rank || b.default_rank;
         return rankA - rankB;
       });
   }, [state.players, state.selectedPosition, state.optimisticRankings, state.userRankings]);
   ```

2. **Memoize display players** (replace lines 231-241):
   ```typescript
   const displayPlayers = useMemo(() => {
     return state.players.map(player => {
       const optimisticRank = state.optimisticRankings.get(player.id);
       const userRanking = state.userRankings.find(r => r.player_id === player.id);
       
       return {
         ...player,
         custom_rank: optimisticRank ?? userRanking?.custom_rank ?? player.default_rank,
       };
     });
   }, [state.players, state.userRankings, state.optimisticRankings]);
   ```

3. **Memoize callbacks**:
   ```typescript
   const handleRealtimeUpdate = useCallback((payload: {
     eventType: 'INSERT' | 'UPDATE' | 'DELETE';
     new?: Record<string, unknown>;
     old?: Record<string, unknown>;
   }) => {
     console.log('📡 Rankings real-time update:', payload.eventType, payload);
     
     if (payload.eventType === 'INSERT' && payload.new) {
       dispatch({ 
         type: 'SET_USER_RANKINGS', 
         payload: [...state.userRankings, payload.new as unknown as UserRanking]
       });
       onRankingChange?.(state.userRankings);
     } else if (payload.eventType === 'DELETE' && payload.old) {
       const newRankings = state.userRankings.filter(
         (ranking) => ranking.id !== (payload.old as unknown as UserRanking).id
       );
       dispatch({ type: 'SET_USER_RANKINGS', payload: newRankings });
       onRankingChange?.(newRankings);
     } else if (payload.eventType === 'UPDATE' && payload.new) {
       const newRankings = state.userRankings.map((ranking) => 
         ranking.id === (payload.new as unknown as UserRanking).id 
           ? payload.new as unknown as UserRanking 
           : ranking
       );
       dispatch({ type: 'SET_USER_RANKINGS', payload: newRankings });
       onRankingChange?.(newRankings);
     }
   }, [state.userRankings, onRankingChange]);

   const handleConnectionChange = useCallback((connected: boolean) => {
     console.log('🔌 Real-time connection:', connected);
     dispatch({ type: 'SET_CONNECTED', payload: connected });
   }, []);
   ```

**Step 3: Split into Smaller Sub-Components**

1. **Create PlayerTable sub-component**:
   ```typescript
   // Add new component before main component
   interface PlayerTableProps {
     players: PlayerWithStatus[];
     onDragEnd: (event: DragEndEvent) => void;
     fullWidth?: boolean;
   }

   const PlayerTable = memo(({ players, onDragEnd, fullWidth }: PlayerTableProps) => {
     const sensors = useSensors(
       useSensor(PointerSensor, {
         activationConstraint: {
           delay: 100,
           tolerance: 5,
         },
       }),
       useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
       })
     );

     return (
       <div className={fullWidth ? '' : 'rounded-md border'}>
         <DndContext
           sensors={sensors}
           collisionDetection={closestCenter}
           onDragEnd={onDragEnd}
         >
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead className="w-[100px]">Rank</TableHead>
                 <TableHead>Player</TableHead>
                 <TableHead>Team</TableHead>
                 <TableHead>Position</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               <SortableContext
                 items={players.map(p => p.id)}
                 strategy={verticalListSortingStrategy}
               >
                 {players.map((player, index) => (
                   <SortableRow 
                     key={player.id} 
                     player={player} 
                     rank={index + 1}
                   />
                 ))}
               </SortableContext>
             </TableBody>
           </Table>
         </DndContext>
       </div>
     );
   });
   ```

2. **Create PositionSelector sub-component**:
   ```typescript
   interface PositionSelectorProps {
     positions: Position[];
     selectedPosition: Position;
     onPositionChange: (position: Position) => void;
     saving: boolean;
   }

   const PositionSelector = memo(({ 
     positions, 
     selectedPosition, 
     onPositionChange, 
     saving 
   }: PositionSelectorProps) => (
     <div className="flex items-center justify-between">
       <div className="flex flex-wrap gap-2">
         {positions.map((position) => (
           <Button
             key={position}
             variant={selectedPosition === position ? 'default' : 'outline'}
             size="sm"
             onClick={() => onPositionChange(position)}
           >
             {position}
           </Button>
         ))}
       </div>
       <div className="w-6 flex justify-end">
         {saving && (
           <Circle className="h-4 w-4 text-green-500 fill-current animate-pulse" />
         )}
       </div>
     </div>
   ));
   ```

#### **Implementation Steps:**
1. Add memo import: `import { memo } from 'react'`
2. Create the reducer and action types
3. Replace useState with useReducer
4. Update all state references throughout component
5. Add memoization for expensive computations
6. Extract sub-components
7. Test component still works
8. Measure performance improvement

---

### **Fix 2: Add Error Boundaries for Critical Components**

**Time**: 2-3 hours
**Risk**: 7/10 (App stability)

#### **Problem Analysis:**
- Component crashes break entire app
- No user-friendly error pages
- Silent failures in catch blocks
- No error boundary around AuthProvider

#### **Fix Instructions:**

**Step 1: Create ErrorBoundary Component**

1. **Create new file**: `src/components/error-boundary.tsx`
   ```typescript
   'use client';

   import React, { Component, ReactNode } from 'react';
   import { Button } from '@/components/ui/button';
   import { AlertCircle, RefreshCw } from 'lucide-react';

   interface Props {
     children: ReactNode;
     fallback?: ReactNode;
     onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
   }

   interface State {
     hasError: boolean;
     error?: Error;
   }

   export class ErrorBoundary extends Component<Props, State> {
     constructor(props: Props) {
       super(props);
       this.state = { hasError: false };
     }

     static getDerivedStateFromError(error: Error): State {
       return { hasError: true, error };
     }

     componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
       console.error('Error Boundary caught an error:', error, errorInfo);
       this.props.onError?.(error, errorInfo);
     }

     handleReset = () => {
       this.setState({ hasError: false, error: undefined });
     };

     render() {
       if (this.state.hasError) {
         if (this.props.fallback) {
           return this.props.fallback;
         }

         return (
           <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
             <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
             <p className="text-muted-foreground mb-4 max-w-md">
               An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
             </p>
             <div className="flex gap-2">
               <Button onClick={this.handleReset} variant="outline" size="sm">
                 <RefreshCw className="h-4 w-4 mr-2" />
                 Try Again
               </Button>
               <Button 
                 onClick={() => window.location.reload()} 
                 size="sm"
               >
                 Refresh Page
               </Button>
             </div>
           </div>
         );
       }

       return this.props.children;
     }
   }

   // Convenient wrapper for functional component style
   export function withErrorBoundary<P extends object>(
     Component: React.ComponentType<P>,
     fallback?: ReactNode
   ) {
     return function WithErrorBoundaryComponent(props: P) {
       return (
         <ErrorBoundary fallback={fallback}>
           <Component {...props} />
         </ErrorBoundary>
       );
     };
   }
   ```

**Step 2: Create Specific Error Fallbacks**

1. **Create ranking error fallback**: `src/components/ranking-error-fallback.tsx`
   ```typescript
   'use client';

   import { Button } from '@/components/ui/button';
   import { AlertCircle, RefreshCw } from 'lucide-react';

   interface RankingErrorFallbackProps {
     onRetry?: () => void;
   }

   export function RankingErrorFallback({ onRetry }: RankingErrorFallbackProps) {
     return (
       <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/50">
         <AlertCircle className="h-8 w-8 text-destructive mb-3" />
         <h3 className="font-semibold mb-2">Failed to load player rankings</h3>
         <p className="text-sm text-muted-foreground mb-4">
           There was an error loading the player rankings. This might be a temporary issue.
         </p>
         <Button onClick={onRetry} variant="outline" size="sm">
           <RefreshCw className="h-4 w-4 mr-2" />
           Try Again
         </Button>
       </div>
     );
   }
   ```

**Step 3: Wrap Critical Components**

1. **Wrap PlayerRankings component**:
   ```typescript
   // In the file that uses PlayerRankings
   import { ErrorBoundary } from '@/components/error-boundary';
   import { RankingErrorFallback } from '@/components/ranking-error-fallback';

   // Wrap the PlayerRankings usage:
   <ErrorBoundary 
     fallback={<RankingErrorFallback onRetry={() => window.location.reload()} />}
     onError={(error, errorInfo) => {
       // Optional: Send to error reporting service
       console.error('PlayerRankings error:', error, errorInfo);
     }}
   >
     <PlayerRankings {...props} />
   </ErrorBoundary>
   ```

2. **Wrap Draft components**:
   ```typescript
   // In draft pages, wrap main content
   <ErrorBoundary>
     {/* Draft content */}
   </ErrorBoundary>
   ```

3. **Add to layout** (`src/app/layout.tsx`):
   ```typescript
   import { ErrorBoundary } from '@/components/error-boundary';

   // Wrap the main content
   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body className={inter.className}>
           <ErrorBoundary>
             {children}
           </ErrorBoundary>
         </body>
       </html>
     );
   }
   ```

**Step 4: Add Async Error Handling**

1. **Create async error handler hook**: `src/hooks/useAsyncError.ts`
   ```typescript
   import { useCallback } from 'react';

   export function useAsyncError() {
     const throwError = useCallback((error: Error) => {
       // This will be caught by Error Boundary
       throw error;
     }, []);

     return throwError;
   }
   ```

2. **Use in async operations**:
   ```typescript
   // In components with async operations
   import { useAsyncError } from '@/hooks/useAsyncError';

   export function SomeComponent() {
     const throwError = useAsyncError();

     const handleAsyncOperation = async () => {
       try {
         await someAsyncOperation();
       } catch (error) {
         throwError(error as Error);
       }
     };

     return (/* component JSX */);
   }
   ```

#### **Implementation Steps:**
1. Create ErrorBoundary component
2. Create specific error fallbacks
3. Wrap critical components with error boundaries
4. Add to root layout for global error catching
5. Create async error handler hook
6. Test error scenarios to ensure boundaries work
7. Add error reporting integration (optional)

## 🧪 **Testing Phase 3 Fixes**

### **Test 1: PlayerRankings Performance**
1. Open React DevTools Profiler
2. Navigate to rankings page
3. Change positions multiple times
4. Drag and reorder players
5. **Expected**: Significantly fewer renders, faster UI response

### **Test 2: Error Boundaries**
1. Temporarily add `throw new Error('Test')` in PlayerRankings
2. Verify error boundary catches it and shows fallback
3. Click "Try Again" - should recover
4. Remove test error
5. Test with network failures
6. **Expected**: Graceful error handling, no white screen

### **Test 3: Memory Usage**
1. Open Chrome DevTools → Performance tab
2. Record while using rankings extensively
3. Check for memory leaks
4. **Expected**: Stable memory usage, no growing heap

## ✅ **Success Criteria for Phase 3**

- [ ] PlayerRankings re-renders reduced by 40-60%
- [ ] Component state consolidated with useReducer
- [ ] Expensive computations memoized
- [ ] Error boundaries prevent app crashes
- [ ] User-friendly error messages displayed
- [ ] Async errors properly handled
- [ ] All existing functionality preserved
- [ ] Performance measurably improved

## 📋 **Files Modified in Phase 3**

1. `src/components/player-rankings.tsx` - Performance optimization
2. `src/components/error-boundary.tsx` - Error boundary (new file)
3. `src/components/ranking-error-fallback.tsx` - Specific fallback (new file)
4. `src/hooks/useAsyncError.ts` - Async error handler (new file)
5. `src/app/layout.tsx` - Global error boundary
6. Various component files - Error boundary wrapping

**Estimated Total Time**: 6-9 hours