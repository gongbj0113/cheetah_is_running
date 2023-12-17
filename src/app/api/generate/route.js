import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { NextResponse } from "next/server";

const execAsync = promisify(exec);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

export async function POST(req) {
  // application/x-www-form-urlencoded
  // get the 'text' from the request data
  let text = (await req.json())["text"];
  if (!text) {
    text = "치타는 달린다";
  }

  try {
    // Execute Python script
    const { stdout } = await execAsync(`python3 python/generator.py "${text}"`);

    // Get the output file path
    // after the text 'GIF file created: '
    const filePath = stdout.split("GIF file created:")[1].trim();
    const buffer = await readFileAsync(filePath);

    // Delete the file after reading
    await unlinkAsync(filePath);

    // Return the successful response with binary data
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${path.basename(
          filePath
        )}"`,
      },
    });
  } catch (error) {
    console.error(`Error: ${error}`);

    // Return error response
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
