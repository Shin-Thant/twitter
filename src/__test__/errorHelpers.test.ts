import {
	checkResponseDataContainToken,
	createFetchError,
} from "../util/errorHelpers";

describe("Test errorHelpers", () => {
	describe("createFetchError", () => {
		describe("given no error message", () => {
			it("should return FETCH_ERROR object with default message", () => {
				const defaultErrMessage = "Something went wrong!";
				const fetchErrorWithDefaultMsg = createFetchError();

				expect(fetchErrorWithDefaultMsg).toEqual({
					error: {
						status: "FETCH_ERROR",
						error: defaultErrMessage,
					},
				});
			});
		});

		describe("given error message", () => {
			it("should return FETCH_ERROR object with the same message", () => {
				const errorMessage = "err_msg";
				const fetchError = createFetchError(errorMessage);

				expect(fetchError).toEqual({
					error: {
						status: "FETCH_ERROR",
						error: errorMessage,
					},
				});
			});
		});
	});

	describe("checkResponseDataContainToken", () => {
		describe("given invalid data", () => {
			it("should return false", () => {
				const invalidPayload = [{}, { accessToken: 10 }];

				invalidPayload.forEach((payload) => {
					const result = checkResponseDataContainToken(payload);
					expect(result).toBe(false);
				});
			});
		});

		describe("given valid object with empty token string", () => {
			it("should return false", () => {
				const result = checkResponseDataContainToken({
					accessToken: "",
				});
				expect(result).toBe(false);
			});
		});

		describe("given valid object with token string", () => {
			it("should return true", () => {
				const result = checkResponseDataContainToken({
					accessToken: "something_useful",
				});
				expect(result).toBe(true);
			});
		});
	});
});
