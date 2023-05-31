const intl = new Intl.RelativeTimeFormat("en", { style: "narrow" });

// TODO: refactor this
type Param = {
	inputDate: Date;
	currentDate?: Date;
};
export default function getRelativeTime({ inputDate, currentDate }: Param) {
	const current = currentDate ?? new Date();

	const diffInMs = current.getTime() - inputDate.getTime();
	const diffInSec = Math.round(diffInMs / 1000);
	let diffInMin = 0;
	let diffInHr = 0;
	let diffInDay = 0;
	let diffInMonth = 0;
	let diffInYear = 0;

	if (diffInSec < 60) {
		return "just now";
	}
	if (diffInSec >= 60) {
		diffInMin = Math.round(diffInSec / 60);
	}
	if (diffInMin >= 60) {
		diffInHr = Math.round(diffInMin / 60);
	}
	if (diffInHr >= 24) {
		diffInDay = Math.round(diffInHr / 24);
	}
	if (diffInDay >= 28) {
		const isFebruary = inputDate.getMonth() === 1;
		if (isFebruary) {
			const fullYear = inputDate.getFullYear();
			const isLeapYear =
				(fullYear % 4 === 0 && fullYear % 100 !== 0) ||
				(fullYear % 400 === 0 && fullYear % 100 !== 0);

			const divisor = isLeapYear ? 29 : 28;
			diffInMonth = Math.round(diffInDay / divisor);
		}

		const thMonths = [8, 3, 5, 7];
		const month = inputDate.getMonth();

		if (thMonths.includes(month)) {
			diffInMonth = Math.round(diffInDay / 30);
		} else {
			diffInMonth = Math.round(diffInDay / 31);
		}
	}
	if (diffInMonth >= 12) {
		diffInYear = Math.round(diffInMonth / 12);
	}

	const value = diffInYear
		? diffInYear
		: diffInMonth
		? diffInMonth
		: diffInDay
		? diffInDay
		: diffInHr
		? diffInHr
		: diffInMin
		? diffInMin
		: diffInSec;

	const unit: Intl.RelativeTimeFormatUnit = diffInYear
		? "years"
		: diffInMonth
		? "months"
		: diffInDay
		? "days"
		: diffInHr
		? "hours"
		: diffInMin
		? "minutes"
		: "seconds";

	return intl.format(-value, unit);
}
