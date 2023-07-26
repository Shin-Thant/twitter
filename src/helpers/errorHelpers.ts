import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function createFetchError(message?: string): {
	error: FetchBaseQueryError;
} {
	return {
		error: {
			status: "FETCH_ERROR",
			error: message ?? "Something went wrong!",
		} as const,
	};
}

type DataWithToken = {
	accessToken: string;
};
export function checkResponseDataContainToken(
	data: unknown
): data is DataWithToken {
	return (
		typeof data === "object" &&
		!!data &&
		"accessToken" in data &&
		typeof data.accessToken === "string" &&
		!!data.accessToken.length
	);
}

type ResponseError = { status: number; data: unknown };
export function isResponseError(
	error: FetchBaseQueryError
): error is ResponseError {
	return (
		"status" in error && typeof error.status === "number" && "data" in error
	);
}

type ErrorResponseData = {
	status: "failed" | "error";
	name?: string;
	message: string;
};
export function isValidResponseErrorData(
	data: unknown
): data is ErrorResponseData {
	return (
		typeof data === "object" &&
		!!data &&
		"status" in data &&
		"message" in data
	);
}

type FetchError = { status: "FETCH_ERROR"; data?: undefined; error: string };
export function isBaseQueryFetchError(error: unknown): error is FetchError {
	return (
		isFetchBaseQueryError(error) &&
		error.status === "FETCH_ERROR" &&
		"error" in error
	);
}

export function isFetchBaseQueryError(
	error: unknown
): error is FetchBaseQueryError {
	return typeof error === "object" && !!error && "status" in error;
}
