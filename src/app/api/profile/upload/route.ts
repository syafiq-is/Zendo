import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Readable } from "stream";
import User from "@/models/User";

// Convert a Buffer into a readable stream
function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function POST(req: NextRequest) {
  try {
    // Read the multipart form-data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId")?.toString();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { bucket } = await connectDB();

    if (!bucket) {
      console.error("❌ GridFS bucket not initialized");
      return NextResponse.json({ error: "Bucket not ready" }, { status: 500 });
    }

    const filename = `${Date.now()}-${file.name}`;
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type,
      metadata: { originalname: file.name },
    });

    bufferToStream(buffer).pipe(uploadStream);

    return await new Promise((resolve, reject) => {
      uploadStream.on("finish", async () => {
        try {
          // ✅ Update user's profileImg
          await User.findByIdAndUpdate(userId, { profileImg: filename });

          resolve(
            NextResponse.json({
              message: "Upload complete",
              file: {
                id: uploadStream.id,
                filename,
                contentType: file.type,
              },
            })
          );
        } catch (err) {
          console.error("Failed to update user:", err);
          reject(
            NextResponse.json(
              { error: "Upload succeeded, but user update failed" },
              { status: 500 }
            )
          );
        }
      });

      uploadStream.on("error", (err) => {
        console.error("Upload failed:", err);
        reject(
          NextResponse.json(
            { error: "Upload failed", details: err },
            { status: 500 }
          )
        );
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
