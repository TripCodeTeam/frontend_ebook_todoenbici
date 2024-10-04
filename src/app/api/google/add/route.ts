import { uploadRandomKey } from "@/handlers/randomUploadKey";
import { UploadToGcs } from "@/lib/Storage";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    // console.log(form);
    const file = form.get("file") as File;
    const userId = form.get("userId") as string;
    const upId = uploadRandomKey();

    const uploadRes = await UploadToGcs({ file, userId, upId }).catch(
      (error) => {
        console.log(error);
        throw new Error(error.message);
      }
    );

    if (uploadRes && uploadRes.success == true) {
      const bucketName = process.env.NAME_BUCKET_GOOGLE_STORAGE as string;
      return NextResponse.json(
        {
          success: uploadRes.success,
          data: {
            link: `https://storage.googleapis.com/${bucketName}/${uploadRes.public_name}`,
            upid: upId,
          },
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }

  return NextResponse.json({ message: "Unknown error" }, { status: 500 });
}
