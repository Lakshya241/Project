import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, name, email, password, role } = body

    if (!id || !name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "data", "users.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    if (data.students.find((s: any) => s.id === id)) {
      return NextResponse.json({ error: "Roll number already registered" }, { status: 400 })
    }

    const newStudent = {
      id,
      name,
      email,
      password,
    }

    data.students.push(newStudent)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    const token = Buffer.from(`${id}:${password}`).toString("base64")

    return NextResponse.json({
      token,
      user: {
        id,
        name,
        email,
        role: "student",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
