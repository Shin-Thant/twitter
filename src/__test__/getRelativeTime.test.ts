import getRelativeTime from "../util/getRelativeTime";

function getInputDate(timeAgo: number | string): Date {
	if (typeof timeAgo === "string") {
		return new Date(timeAgo);
	}
	const inputDate = new Date(Date.now() - timeAgo);
	return inputDate;
}

describe("getRelativeTime", () => {
	describe("just now", () => {
		describe("given current date", () => {
			it("should return just now", () => {
				const inputDate = getInputDate(0);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("just now");
			});
		});

		describe("given around current date", () => {
			it("should return just now", () => {
				const inputDate = getInputDate(40 * 1000);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("just now");
			});
		});
	});

	describe("minute", () => {
		describe("given current time - 1min", () => {
			it("should return 1m ago", () => {
				const inputDate = getInputDate(60 * 1000);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("1m ago");
			});
		});

		describe("given current time - 50min", () => {
			it("should return 50m ago", () => {
				const inputDate = getInputDate(50 * 60 * 1000);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("50m ago");
			});
		});
	});

	describe("hour", () => {
		describe("given current time - 1hour", () => {
			it("should return 1h ago", () => {
				const inputDate = getInputDate(60 * 60 * 1000);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("1h ago");
			});
		});

		describe("given current time - 23hour", () => {
			it("should return 23h ago", () => {
				const inputDate = getInputDate(23 * 60 * 60 * 1000);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("23h ago");
			});
		});
	});

	describe("date", () => {
		describe("given current time - 1day", () => {
			it("should return 1d ago", () => {
				const inputDate = getInputDate(24 * 60 * 60 * 1000);
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("1d ago");
			});
		});

		describe("given 2023-04-26", () => {
			it("should return 26d ago", () => {
				const inputDate = getInputDate("2023-04-26");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("1mo ago");
			});
		});
	});

	describe("month", () => {
		describe("given 1 month ago", () => {
			it("should return 1mo ago", () => {
				const inputDate = getInputDate("2023-04-27");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("1mo ago");
			});
		});

		describe("given 1 month and half ago", () => {
			it("should return 2mo ago", () => {
				const inputDate = getInputDate("2023-04-10");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("2mo ago");
			});
		});

		describe("given 4 month ago", () => {
			it("should return 4mo ago", () => {
				const inputDate = getInputDate("2023-02-27");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("3mo ago");
			});
		});

		describe("given 11 month ago", () => {
			it("should return 11m ago", () => {
				const inputDate = getInputDate("2022-06-27");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("11mo ago");
			});
		});
	});

	describe("year", () => {
		describe("given 1 year ago", () => {
			it("should return 1y ago", () => {
				const inputDate = getInputDate("2022-05-27");
				const result = getRelativeTime({ inputDate });
				expect(result).toBe("1y ago");
			});
		});

		describe("given 1 year and a few month ago", () => {
			it("should return 1y ago", () => {
				const inputDate = getInputDate("2022-05-27");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("1y ago");
			});
		});

		describe("given 1 year and a few month ago", () => {
			it("should return 1y ago", () => {
				const inputDate = getInputDate("2022-03-27");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("1y ago");
			});
		});

		describe("given 2 year ago", () => {
			it("should return 2y ago", () => {
				const inputDate = getInputDate("2021-01-27");
				const currentDate = getInputDate("2023-05-27");
				const result = getRelativeTime({ inputDate, currentDate });
				expect(result).toBe("2y ago");
			});
		});
	});
});
