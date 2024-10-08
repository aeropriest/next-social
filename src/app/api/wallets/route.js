import { NextResponse } from "next/server";

export async function GET(request) {
  const requestHeaders = new Headers(request.headers);
  const userTokenFromHeader = requestHeaders.get("x-user-token");

  try {
    console.log("Getting wallets...");
    // Get challenge id
    const res = await fetch(
      process.env.NEXT_PUBLIC_CIRCLE_BASE_URL + "/wallets",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
          "Content-Type": "application/json",
          "X-User-Token": userTokenFromHeader,
          "User-Agent": "PW-TEST-SERVER",
        },
      }
    );

    const data = await res.json();
    console.log(JSON.stringify(data));

    if (data["code"]) {
      return NextResponse.json(data, { status: 500 });
    }

    return NextResponse.json(data["data"]["wallets"]);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
