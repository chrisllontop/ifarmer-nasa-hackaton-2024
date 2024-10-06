import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";

export const CropsList = () => {
	return (
		<List>
			<ListItem
				secondaryAction={
					<IconButton aria-label="details">
						<MoreHorizIcon />
					</IconButton>
				}
			>
				<ListItemText
					primary={
						<Typography component="p" variant="h6" sx={{ fontWeight: 400 }}>
							"Brunch this weekend?"
						</Typography>
					}
					secondary={
						<Typography
							component="span"
							variant="body2"
							sx={{ color: "text.primary", display: "inline" }}
						>
							I'll be in your neighborhood doing errands this…
						</Typography>
					}
				/>
			</ListItem>
			<Divider component="li" />
			<ListItem
				secondaryAction={
					<IconButton aria-label="details">
						<MoreHorizIcon />
					</IconButton>
				}
			>
				<ListItemText
					primary={
						<Typography component="p" variant="h6" sx={{ fontWeight: 400 }}>
							"Brunch this weekend?"
						</Typography>
					}
					secondary={
						<Typography
							component="span"
							variant="body2"
							sx={{ color: "text.primary", display: "inline" }}
						>
							I'll be in your neighborhood doing errands this…
						</Typography>
					}
				/>
			</ListItem>
		</List>
	);
};
