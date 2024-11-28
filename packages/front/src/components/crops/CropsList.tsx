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
import { useNavigate } from "react-router-dom";

export const CropsList = () => {
	const { data: crops, isPending } = useGetCrops();

	const navigate = useNavigate();

	return (
		<Box>
			{isPending ? (
				<Typography>Loading...</Typography>
			) : (
				<List>
					{crops?.data?.map((crop) => (
						<Box key={crop.id}>
							<ListItem
								onClick={() => navigate('/crops/1')}
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
