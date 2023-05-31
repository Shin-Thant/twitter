import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function createFetchError() {
	return {
		error: {
			status: "FETCH_ERROR",
			error: "Something went wrong!",
		} as FetchBaseQueryError,
	};
}

type DataWithToken = {
	accessToken: string;
};
export function isResponseDataContainToken(
	data: unknown
): data is DataWithToken {
	return (
		typeof data === "object" &&
		!!data &&
		"accessToken" in data &&
		typeof data.accessToken === "string"
	);
}

type ResponseError = { status: number; data: unknown };
export function isResponseError(
	error: FetchBaseQueryError
): error is ResponseError {
	return "status" in error && "data" in error;
}

type ErrorResponseData = {
	status: "failed" | "error";
	name?: string;
	message: string;
};
export function isValidErrorData(data: unknown): data is ErrorResponseData {
	return (
		typeof data === "object" &&
		!!data &&
		"status" in data &&
		"message" in data
	);
}

type FetchError = { status: "FETCH_ERROR"; data?: undefined; error: string };
export function isFetchError(error: unknown): error is FetchError {
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
