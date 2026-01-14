import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface Complaint {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  category: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: string
  updatedAt: string
}

// GET all complaints (with filters)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get("status")
    const studentId = searchParams.get("studentId")

    const filePath = path.join(process.cwd(), "data", "complaints.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    let complaints = data.complaints

    if (status) {
      complaints = complaints.filter((c: Complaint) => c.status === status)
    }
    if (studentId) {
      complaints = complaints.filter((c: Complaint) => c.studentId === studentId)
    }

    return NextResponse.json({ complaints })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
  }
}

// POST - Create new complaint
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, studentName, studentEmail, category, title, description } = body

    const filePath = path.join(process.cwd(), "data", "complaints.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    const newComplaint: Complaint = {
      id: `COMP${String(data.complaints.length + 1).padStart(4, "0")}`,
      studentId,
      studentName,
      studentEmail,
      category,
      title,
      description,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    data.complaints.push(newComplaint)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, complaint: newComplaint }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 })
  }
}
