import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api-response";

export function success<T>(
  data: T,
  status: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  return NextResponse.json(response, { status });
}

export function failure(error: string, status: number = 400) {
  const response: ApiResponse = {
    success: false,
    error,
  };

  return NextResponse.json(response, { status });
}