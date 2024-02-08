import moment from "moment";

export function getRelativeTime({ date }: { date: string }) {
	return moment(date).fromNow();
}
