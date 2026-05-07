import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const googleResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbwDhsFh-VDLPvDzYW_fnuFExa3UwagVeN0oDHINoL12wvevxto9QbqogLGAvR9slnei/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        redirect: "follow",
      }
    );

    const text = await googleResponse.text();

    console.log("GOOGLE RESPONSE:", text);

    if (!googleResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Google script failed with status ${googleResponse.status}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("API ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}