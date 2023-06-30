import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "This Worked", success: true });
}

export async function POST(request: Request) {
  try {
    return NextResponse.json({ message: "This Worked", success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err, success: false });
  }
}