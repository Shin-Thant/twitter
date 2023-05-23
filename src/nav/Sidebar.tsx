import Drawer from "@mui/material/Drawer";
import useDrawerController from "../hooks/useDrawerController";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
	const { isOpen, setIsOpen } = useDrawerController();

	return (
		<>
			<Drawer
				transitionDuration={200}
				anchor="left"
				variant="temporary"
				open={isOpen}
				onClose={() => setIsOpen(false)}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": {
						backgroundImage: "none",
						background: "bg.navbar",
						width: { xs: "85%", normal_sm: 300, sm: 330 },
						boxSizing: "border-box",
					},
				}}
			>
				<SidebarContent />
			</Drawer>

			<Drawer
				anchor="left"
				variant="permanent"
				open={true}
				sx={{
					flexShrink: 0,
					display: {
						xs: "none",
						md: "block",
					},
					width: { md: 300, lg: 330 },
					"& .MuiDrawer-paper": {
						backgroundColor: "bg.navbar",
						width: { md: 300, lg: 330 },
						boxSizing: "border-box",
					},
				}}
			>
				<SidebarContent />
			</Drawer>
		</>
	);
}
