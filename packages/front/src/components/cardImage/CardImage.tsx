import { Avatar, Card, CardContent, Typography } from "@mui/material";
import styles from "./CardImage.module.css";

interface CardImageProps {
	description: string;
}
export const CardImage = ({ description }: CardImageProps) => {
	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				padding: "16px",
				margin: "16px 16px 24px",
				gap: "16px",
				justifyContent: "center",
			}}
		>
			<Avatar variant="rounded">OP</Avatar>
			{/*<CardMedia*/}
			{/*	component="img"*/}
			{/*	image="/static/images/cards/live-from-space.jpg"*/}
			{/*	alt="Live from space"*/}
			{/*/>*/}
			<CardContent
				sx={{ width: "80%", padding: "0" }}
				className={styles.cardContent}
			>
				<Typography
					component="div"
					textAlign="left"
					gutterBottom={false}
					sx={{ opacity: "60%" }}
				>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};
