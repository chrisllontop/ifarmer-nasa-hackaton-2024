import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./Card.module.css";

interface CardImageProps {
	description: string;
	image: any;
}
export const CardImage = ({ description, image }: CardImageProps) => {
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
			<CardMedia
				component="img"
				image={image}
				alt={image}
				sx={{ width: "40px" }}
			/>
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
