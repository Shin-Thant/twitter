import { SxProps } from "@mui/material";
import MuiContainer from "@mui/material/Container/Container";
import { Theme } from "@mui/system";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	sx?: SxProps<Theme>;
};

const Container = ({ sx, children }: Props) => {
	return (
		<MuiContainer
			sx={{
				maxWidth: { xs: "xs", normal_sm: "sm", md: "88%" },
				pt: 3,
				px: { xs: 0, sm: 3 },
				"&.MuiBox-root": {
					px: 0,
				},
				...sx,
			}}
		>
			{children}
		</MuiContainer>
	);
};

export default Container;
