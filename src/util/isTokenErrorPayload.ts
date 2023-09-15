import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export default function isTokenErrorPayload(payload?: FetchBaseQueryError) {
	return !!payload && (payload.status === 403 || payload.status === 401);
}
