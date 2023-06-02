import Drawer from "@mui/material/Drawer";
import useDrawerController from "../../hooks/useDrawerController";
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
						bgcolor: "bg.navbar",
						width: { xs: "85%", normal_sm: 300 },
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
					width: 300,
					"& .MuiDrawer-paper": {
						bgcolor: "bg.navbar",
						width: 300,
						boxSizing: "border-box",
					},
				}}
			>
				<SidebarContent />
			</Drawer>
		</>
	);
}
