import { connectDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { filename } = await params;

  if (!filename) {
    return NextResponse.json({ error: "Filename required" }, { status: 400 });
  }

  const { bucket } = await connectDB();
  const files = await bucket.find({ filename }).toArray();

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const file = files[0];
  const stream = bucket.openDownloadStreamByName(filename);

  const headers = new Headers();
  headers.set("Content-Type", file.contentType || "application/octet-stream");

  const webStream = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk)));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });

  return new NextResponse(webStream, {
    status: 200,
    headers,
  });
}
