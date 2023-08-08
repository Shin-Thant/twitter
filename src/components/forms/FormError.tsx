import { Alert, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ReactNode } from "react";
import {
	isBaseQueryFetchError,
	isBaseQueryResponseError,
	isValidResponseErrorData,
} from "../../helpers/errorHelpers";

type Props = { error: FetchBaseQueryError | SerializedError };

const ErrorAlert = ({ children }: { children: ReactNode }) => {
	return (
		<Alert severity="error" sx={{ width: "100%", mb: "2rem" }}>
			<Typography fontWeight="500">{children}</Typography>
		</Alert>
	);
};

const FormError = ({ error }: Props) => {
	if (
		isBaseQueryResponseError(error) &&
		isValidResponseErrorData(error.data)
	) {
		return <ErrorAlert>{error.data.message}</ErrorAlert>;
	}

	if (isBaseQueryFetchError(error)) {
		return <ErrorAlert>{error.error}</ErrorAlert>;
	}

	return <ErrorAlert>Something went wrong! Try again later...</ErrorAlert>;
};

export default FormError;
