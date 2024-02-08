import { NotiTriggerUser } from "../user/userTypes";

export type NotiType = "like:tweet" | "like:comment" | "comment" | "reply";

export interface CommonNoti {
	_id: string;
	recipient: string;
	triggerBy: NotiTriggerUser;
	isRead: boolean;
	type: NotiType;
	doc: string;
	message: string;
	createdAt: string;
	updatedAt: string;
}
