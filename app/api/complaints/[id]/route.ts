import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// PATCH - Update complaint status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { status, resolvedDate, resolvedTime, adminNotes } = body
    const complaintId = params.id

    const filePath = path.join(process.cwd(), "data", "complaints.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    const complaint = data.complaints.find((c: any) => c.id === complaintId)
    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    complaint.status = status
    complaint.updatedAt = new Date().toISOString()

    if (status === "resolved") {
      complaint.resolvedDate = resolvedDate
      complaint.resolvedTime = resolvedTime
      complaint.adminNotes = adminNotes
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, complaint })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
  }
}
