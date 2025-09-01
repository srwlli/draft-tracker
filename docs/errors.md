 ✓ Starting...
 ✓ Ready in 1323ms
 ○ Compiling / ...
 ✓ Compiled / in 2.7s
 GET / 200 in 3177ms
 ✓ Compiled /dashboard in 319ms
 GET /dashboard 200 in 416ms
 GET /dashboard 200 in 108ms
 ✓ Compiled /_not-found/page in 244ms
 GET /draft/93d2b7a5-6b85-4840-85d0-daeff65cb942/(admin)/0709c120-2222-46d0-8aeb-34b6fde7e819 404 in 341ms
 GET /draft/93d2b7a5-6b85-4840-85d0-daeff65cb942/(admin)/0709c120-2222-46d0-8aeb-34b6fde7e819 404 in 116ms
 GET /draft/93d2b7a5-6b85-4840-85d0-daeff65cb942/(admin)/0709c120-2222-46d0-8aeb-34b6fde7e819 404 in 98ms
 GET /draft/93d2b7a5-6b85-4840-85d0-daeff65cb942/(admin)/0709c120-2222-46d0-8aeb-34b6fde7e819 404 in 93ms
 GET /draft/93d2b7a5-6b85-4840-85d0-daeff65cb942/(admin)/0709c120-2222-46d0-8aeb-34b6fde7e819 404 in 129ms
 ✓ Compiled in 13ms
 ⨯ ./middleware.ts:2:1
Module not found: Can't resolve '@supabase/ssr'
  1 | import { NextRequest, NextResponse } from 'next/server';
> 2 | import { createServerClient } from '@supabase/ssr';
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export async function middleware(request: NextRequest) {
  5 |   const { pathname } = request.nextUrl;



https://nextjs.org/docs/messages/module-not-found


 ⨯ ./middleware.ts:2:1
Module not found: Can't resolve '@supabase/ssr'
  1 | import { NextRequest, NextResponse } from 'next/server';
> 2 | import { createServerClient } from '@supabase/ssr';
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export async function middleware(request: NextRequest) {
  5 |   const { pathname } = request.nextUrl;



https://nextjs.org/docs/messages/module-not-found


 ✓ Compiled middleware in 162ms
PS C:\Users\willh\Desktop\draft-tracker> 
                                         ^C
PS C:\Users\willh\Desktop\draft-tracker> ^C
PS C:\Users\willh\Desktop\draft-tracker> npm run dev

> draft-tracker@0.1.0 dev
> next dev --turbopack --hostname 0.0.0.0

   ▲ Next.js 15.5.2 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://0.0.0.0:3000
   - Environments: .env.local

 ✓ Starting...
 ⨯ ./middleware.ts:2:1
Module not found: Can't resolve '@supabase/ssr'
  1 | import { NextRequest, NextResponse } from 'next/server';
> 2 | import { createServerClient } from '@supabase/ssr';
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export async function middleware(request: NextRequest) {
  5 |   const { pathname } = request.nextUrl;



https://nextjs.org/docs/messages/module-not-found


 ⨯ ./middleware.ts:2:1
Module not found: Can't resolve '@supabase/ssr'
  1 | import { NextRequest, NextResponse } from 'next/server';
> 2 | import { createServerClient } from '@supabase/ssr';
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export async function middleware(request: NextRequest) {
  5 |   const { pathname } = request.nextUrl;



https://nextjs.org/docs/messages/module-not-found


 ✓ Compiled middleware in 114ms
 ✓ Ready in 1446ms

 Build Error

Module not found: Can't resolve '@supabase/ssr'

./middleware.ts (2:1)

Module not found: Can't resolve '@supabase/ssr'
  1 | import { NextRequest, NextResponse } from 'next/server';
> 2 | import { createServerClient } from '@supabase/ssr';
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export async function middleware(request: NextRequest) {
  5 |   const { pathname } = request.nextUrl;

https://nextjs.org/docs/messages/module-not-found