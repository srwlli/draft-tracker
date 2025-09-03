# 📡 COMPREHENSIVE API DOCUMENTATION
**Project:** draft-tracker
*Generated: 2025-09-02 | Exhaustive API Endpoint Analysis*

---

## 🎯 API Overview
- **Project:** draft-tracker
- **API Framework:** Next.js 15.5.2 App Router
- **API Style:** RESTful API over Supabase
- **Base URL:** `/api`
- **Version Strategy:** No versioning implemented
- **Authentication:** Bearer Token (Session-based & Admin Token)

---

## 🛣️ Endpoint Inventory

### **Protected Endpoints (Session Required)**
```
GET    /api/drafts                  - Get all drafts for the authenticated user
POST   /api/drafts                  - Create a new draft
```

### **Protected Endpoints (Admin Token Required)**
```
PUT    /api/drafts/{id}             - Update a draft's details
DELETE /api/drafts/{id}             - Delete a draft and all its picks
POST   /api/drafts/{id}/picks       - Create a new draft pick (draft a player)
DELETE /api/drafts/{id}/picks/{pickId} - Delete a specific draft pick (undo a pick)
```

### **Public Endpoints**
```
GET    /api/public/drafts/{id}      - Get public details for a specific draft, including players and their draft status
GET    /api/drafts/{id}             - Get details for a specific draft
GET    /api/drafts/{id}/picks       - Get all picks for a specific draft
```

---

## 📋 Detailed Endpoint Documentation

### Drafts Collection

#### **GET** `/api/drafts`
- **Purpose:** Retrieves a list of all drafts created by the currently authenticated user.
- **Authentication:** **Session Required**. Validates the user session.
- **Response Schema (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "string",
        "admin_token": "string",
        "created_at": "string",
        "name": "string",
        "user_id": "string"
      }
    ]
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: If the user session is invalid or missing.
  - `500 Internal Server Error`: If there's a database error.
- **Code Location:** `src/app/api/drafts/route.ts`

#### **POST** `/api/drafts`
- **Purpose:** Creates a new draft for the authenticated user.
- **Authentication:** **Session Required**. Validates the user session.
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Validation:**
  - `name`: Must be a string between 1 and 100 characters.
- **Response Schema (201 Created):**
  ```json
  {
    "data": {
      "id": "string",
      "admin_token": "string", // Note: Admin token is only returned on creation
      "created_at": "string",
      "name": "string",
      "user_id": "string"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If the request body is invalid (e.g., missing `name`).
  - `401 Unauthorized`: If the user session is invalid or missing.
  - `500 Internal Server Error`: If there's a database error during creation.
- **Code Location:** `src/app/api/drafts/route.ts`

---

### Single Draft

#### **GET** `/api/drafts/{id}`
- **Purpose:** Retrieves the details for a single, specific draft.
- **Authentication:** None (Public).
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
- **Response Schema (200 OK):**
  ```json
  {
    "data": {
      "id": "string",
      "admin_token": "string",
      "created_at": "string",
      "name": "string",
      "user_id": "string"
    }
  }
  ```
- **Error Responses:**
  - `404 Not Found`: If no draft with the specified ID exists.
- **Code Location:** `src/app/api/drafts/[id]/route.ts`

#### **PUT** `/api/drafts/{id}`
- **Purpose:** Updates the name of a specific draft.
- **Authentication:** **Admin Token Required**.
- **Request Headers:**
  - `Authorization: Bearer <admin_token>`
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Validation:**
  - `name`: Must be a string between 1 and 100 characters.
- **Response Schema (200 OK):**
  ```json
  {
    "data": {
      "id": "string",
      "admin_token": "string",
      "created_at": "string",
      "name": "string",
      "user_id": "string"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If the request body is invalid.
  - `403 Forbidden`: If the admin token is missing or invalid.
  - `500 Internal Server Error`: If there's a database error during the update.
- **Code Location:** `src/app/api/drafts/[id]/route.ts`

#### **DELETE** `/api/drafts/{id}`
- **Purpose:** Deletes a draft and all of its associated picks.
- **Authentication:** **Admin Token Required**.
- **Request Headers:**
  - `Authorization: Bearer <admin_token>`
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
- **Response Schema (200 OK):**
  ```json
  {
    "data": {
      "message": "Draft deleted successfully"
    }
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: If the admin token is missing or invalid.
  - `500 Internal Server Error`: If there's a database error during deletion.
- **Code Location:** `src/app/api/drafts/[id]/route.ts`

---

### Draft Picks

#### **GET** `/api/drafts/{id}/picks`
- **Purpose:** Retrieves all draft picks for a specific draft, ordered by pick number.
- **Authentication:** None (Public).
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
- **Response Schema (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "string",
        "draft_id": "string",
        "player_id": "number",
        "pick_number": "number",
        "timestamp": "string"
      }
    ]
  }
  ```
- **Error Responses:**
  - `500 Internal Server Error`: If there's a database error.
- **Code Location:** `src/app/api/drafts/[id]/picks/route.ts`

#### **POST** `/api/drafts/{id}/picks`
- **Purpose:** Creates a new draft pick (i.e., drafts a player).
- **Authentication:** **Admin Token Required**.
- **Request Headers:**
  - `Authorization: Bearer <admin_token>`
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
- **Request Body:**
  ```json
  {
    "player_id": "number",
    "pick_number": "number"
  }
  ```
- **Validation:**
  - `player_id`: Must be a positive integer.
  - `pick_number`: Must be a positive integer.
- **Response Schema (201 Created):**
  ```json
  {
    "data": {
      "id": "string",
      "draft_id": "string",
      "player_id": "number",
      "pick_number": "number",
      "timestamp": "string"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If the request body is invalid.
  - `403 Forbidden`: If the admin token is missing or invalid.
  - `409 Conflict`: If the player has already been drafted in this draft.
  - `500 Internal Server Error`: If there's a database error.
- **Code Location:** `src/app/api/drafts/[id]/picks/route.ts`

---

### Single Draft Pick

#### **DELETE** `/api/drafts/{id}/picks/{pickId}`
- **Purpose:** Deletes a specific draft pick (i.e., "undoes" a pick).
- **Authentication:** **Admin Token Required**.
- **Request Headers:**
  - `Authorization: Bearer <admin_token>`
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
  - `pickId` (string, required) - The UUID of the draft pick.
- **Response Schema (200 OK):**
  ```json
  {
    "data": {
      "message": "Pick deleted successfully"
    }
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: If the admin token is missing or invalid.
  - `500 Internal Server Error`: If there's a database error.
- **Code Location:** `src/app/api/drafts/[id]/picks/[pickId]/route.ts`

---

### Public Draft Data

#### **GET** `/api/public/drafts/{id}`
- **Purpose:** Retrieves a combined public view of a draft, including its details and the status of all players. This is the primary endpoint for the public-facing draft board.
- **Authentication:** None (Public).
- **Path Parameters:**
  - `id` (string, required) - The UUID of the draft.
- **Response Schema (200 OK):**
  ```json
  {
    "data": {
      "draft": {
        "id": "string",
        "name": "string",
        "created_at": "string"
      },
      "players": [
        {
          "id": "number",
          "name": "string",
          "team": "string",
          "position": "string",
          "default_rank": "number",
          "is_drafted": "boolean",
          "custom_rank": "number"
        }
      ]
    }
  }
  ```
- **Error Responses:**
  - `404 Not Found`: If the draft ID does not exist.
  - `500 Internal Server Error`: If there's a database error.
- **Code Location:** `src/app/api/public/drafts/[id]/route.ts`

---

## 🔐 Authentication & Authorization

**Authentication Methods:**
- **Session-based (for users):** The `GET` and `POST` endpoints for `/api/drafts` use a session cookie to identify the user. The `validateSession` function handles this by calling `supabase.auth.getUser()`.
- **Admin Token (for draft administration):** All `PUT` and `DELETE` operations, as well as creating draft picks, require an `admin_token` specific to the draft. This token is passed as a Bearer token in the `Authorization` header and validated by the `validateAdminToken` function against the database.

**Authorization Patterns:**
- **Ownership:** The `middleware.ts` file ensures that only the user who created a draft can access its admin pages, providing an initial layer of protection before the API is even hit.
- **Admin Token:** The API endpoints themselves re-verify the admin token for any state-changing operations, ensuring that even if a user is logged in, they cannot modify a draft without the secret token.

---

## 🔄 Request/Response Patterns

**Standard Success Response Format:**
```json
{
  "data": "any"
}
```

**Standard Error Response Format:**
```json
{
  "error": {
    "message": "string",
    "code": "number",
    "timestamp": "string"
  }
}
```
- This structure is provided by the `apiResponse` and `apiError` helpers in `src/lib/api-responses.ts`.

---

## 🛡️ Security Implementation

**Input Validation:**
- The API uses `zod` for rigorous input validation on all `POST` and `PUT` requests. Schemas like `createDraftSchema` and `createPickSchema` define the expected shape, types, and constraints of the request body, preventing invalid data from being processed.
- **Example:** `z.string().min(1, '...').max(100, '...')`

**Security Headers:**
- The `middleware.ts` file applies a strict set of security headers to all responses to mitigate common web vulnerabilities:
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `X-XSS-Protection`
  - `Referrer-Policy`
  - `Permissions-Policy`

---

## ⚡ Real-time Features

The REST API is complemented by a real-time system for instant UI updates.
- **Technology:** Supabase Realtime Subscriptions (WebSockets).
- **Implementation:** The `useSupabaseRealtime` custom hook (`src/hooks/useSupabaseRealtime.ts`) subscribes to changes in the `draft_picks` table.
- **Data Flow:** When a user drafts a player via a `POST` to `/api/drafts/{id}/picks`, the database change triggers a WebSocket event that is broadcast to all connected clients, who then update their local state.
- **Fallback:** The `usePollingFallback` hook (`src/hooks/usePollingFallback.ts`) provides a backup mechanism, periodically fetching data from the `GET /api/drafts/{id}/picks` endpoint in case the WebSocket connection fails.
