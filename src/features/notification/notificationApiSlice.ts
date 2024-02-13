import apiSlice from "../../app/api/apiSlice";
import { Pagination, PaginationArg } from "../paginationType";
import { CommonNoti } from "./notificationTypes";

export interface GetNotisResult extends Pagination {
	data: CommonNoti[];
}

export const notificationApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotis: builder.query<GetNotisResult, PaginationArg>({
			query: (arg) =>
				`/notis?currentPage=${arg.currentPage}&itemsPerPage=${arg.itemsPerPage}`,
			providesTags: (result) => {
				if (!result) {
					return [{ type: "Notis", id: "LIST" }];
				}
				const tags = result.data.map((noti) => ({
					type: "Notis" as const,
					id: noti._id,
				}));
				tags.push({ type: "Notis" as const, id: "LIST" });
				return tags;
			},
		}),
		markAllAsRead: builder.mutation<{ message: string }, void>({
			query: () => ({
				url: "/notis/mark-all-read",
				method: "PUT",
			}),
			invalidatesTags: () => {
				return [{ type: "Notis", id: "LIST" }];
			},
		}),
		markNotiRead: builder.mutation<{ message: string }, { id: string }>({
			query: ({ id }) => ({
				url: `/notis/${id}/mark-read`,
				method: "PATCH",
			}),
			invalidatesTags: [{ type: "Notis", id: "LIST" }],
		}),
	}),
});

export const {
	useGetNotisQuery,
	useMarkAllAsReadMutation,
	useMarkNotiReadMutation,
} = notificationApiSlice;
