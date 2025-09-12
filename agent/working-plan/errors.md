when drafting a player, this logs in console:

Error: Route "/api/drafts/[id]/picks" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at POST (src\app\api\drafts\[id]\picks\route.ts:17:11)
  15 |   { params }: { params: { id: string } }
  16 | ) {
> 17 |   const { id } = params
     |           ^
  18 |
  19 |   const paramsSchema = z.object({ id: z.string().uuid('Invalid draft ID') })
  20 |   const validation = paramsSchema.safeParse({ id })
 POST /api/drafts/827be338-2fe6-4c70-9ac9-c08ed186cfd3/picks 201 in 1589ms