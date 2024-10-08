import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request, params) {
  const requestHeaders = new Headers(request.headers);
  const userTokenFromHeader = requestHeaders.get("x-user-token");

  console.log("Params ", params);
  const { walletId, uuid } = params.params;

  console.log("Wallet id is ", walletId);
  console.log("UUID", uuid);
  console.log("Circle base url", process.env.NEXT_PUBLIC_CIRCLE_BASE_URL);
  console.log(("API key", process.env.NEXT_PUBLIC_CIRCLE_API_KEY));
  console.log("User token", userTokenFromHeader);

  try {
    console.log("Getting balances...");

    // Validate walletId
    if (!walletId) {
      return NextResponse.json({ error: "Invalid wallet ID" }, { status: 400 });
    }

    // Get wallet balances
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_BASE_URL}/wallets/${walletId}/balances?includeAll=true`,
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

    // Check if response is OK
    if (!res.ok) {
      const errorData = await res.json(); // Get response body for error details
      console.error("Error fetching balances:", errorData);
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json(); // Parse response data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
