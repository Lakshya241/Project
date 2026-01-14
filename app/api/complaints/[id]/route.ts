import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// GET - Get single complaint
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: complaintId } = await params

    const filePath = path.join(process.cwd(), "data", "complaints.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    const complaint = data.complaints.find((c: any) => c.id === complaintId)
    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    return NextResponse.json({ complaint })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch complaint" }, { status: 500 })
  }
}

// PATCH - Update complaint status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const { status } = body
    const { id: complaintId } = await params

    const filePath = path.join(process.cwd(), "data", "complaints.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    const complaint = data.complaints.find((c: any) => c.id === complaintId)
    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    complaint.status = status
    complaint.updatedAt = new Date().toISOString()

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, complaint })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
  }
}
