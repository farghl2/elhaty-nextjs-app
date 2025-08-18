import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email, password } = await req.json()


  const validEmail = process.env.ADMIN_EMAIL 
  const validPassword = process.env.ADMIN_PASSWORD

  if (email === validEmail && password === validPassword) {
    // Create token (could be JWT)
    const token = 'authenticated'

    ;(await cookies()).set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
}
