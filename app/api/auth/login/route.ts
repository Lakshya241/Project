import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface LoginRequest {
  id: string
  password: string
  role: "student" | "admin"
}

interface UserData {
  students: Array<{ id: string; password: string; name: string; email: string }>
  admins: Array<{ id: string; password: string; name: string; email: string }>
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequest = await req.json()
    const { id, password, role } = body

    // Read users from JSON file
    const filePath = path.join(process.cwd(), "data", "users.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const userData: UserData = JSON.parse(fileContent)

    // Find user based on role
    const users = role === "student" ? userData.students : userData.admins
    const user = users.find((u) => u.id === id && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data and token (simple JWT-like token)
    const token = Buffer.from(JSON.stringify({ id, role, name: user.name })).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
