import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useGetCrops } from "../../hooks/use-crops.tsx";

export const CropsList = () => {
	const { data: crops, isPending } = useGetCrops();

	return (
		<Box>
			{isPending ? (
				<Typography>Loading...</Typography>
			) : (
				<List>
					{crops?.data?.map((crop) => (
						<Box key={crop.id}>
							<ListItem
								secondaryAction={
									<IconButton aria-label="details">
										<MoreHorizIcon />
									</IconButton>
								}
							>
								<ListItemText
									primary={
										<Typography
											component="p"
											variant="h6"
											sx={{ fontWeight: 400 }}
										>
											{crop.cropType}
										</Typography>
									}
									secondary={
										<Typography
											component="span"
											variant="body2"
											sx={{ color: "text.primary", display: "inline" }}
										>
											Total area: {parseFloat(crop.area).toFixed(2)} m²
										</Typography>
									}
								/>
							</ListItem>
							<Divider component="li" />
						</Box>
					))}
				</List>
			)}
		</Box>
	);
};
