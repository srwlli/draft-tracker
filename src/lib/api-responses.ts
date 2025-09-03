import { NextResponse } from 'next/server'

export const apiResponse = {
  success: <T>(data: T, status: number = 200) => 
    NextResponse.json({ data }, { status }),
    
  error: (message: string, status: number = 400) => 
    NextResponse.json({ 
      error: { 
        message, 
        code: status,
        timestamp: new Date().toISOString() 
      } 
    }, { status }),
}

export const apiError = {
  unauthorized: () => apiResponse.error('Unauthorized', 401),
  forbidden: () => apiResponse.error('Forbidden', 403),
  notFound: () => apiResponse.error('Not found', 404),
  conflict: (message: string) => apiResponse.error(message, 409),
  serverError: () => apiResponse.error('Internal server error', 500),
}