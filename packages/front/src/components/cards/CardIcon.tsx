import { Card, CardContent, Typography } from "@mui/material";
import type React from "react";
import styles from "./Card.module.css";

interface CardIconProps {
	description: string;
	title: string;
	onClick: (value: string) => void;
	icon: React.ReactNode;
	isSelected: boolean;
}
export const CardIcon = ({
	description,
	title,
	onClick,
	icon,
	isSelected,
}: CardIconProps) => {
	return (
		<Card
			onClick={() => onClick(title.toLowerCase())}
			sx={{
				display: "flex",
				padding: "16px",
				margin: "16px 16px 24px",
				gap: "16px",
				justifyContent: "center",
				cursor: "pointer",
			}}
			className={isSelected ? styles.selected : ""}
		>
			{icon}
			<CardContent
				sx={{ width: "80%", padding: "0" }}
				className={styles.cardContent}
			>
				<Typography
					component="h3"
					variant="body1"
					textAlign="left"
					gutterBottom={false}
				>
					{title}
				</Typography>
				<Typography
					component="div"
					variant="caption"
					textAlign="left"
					gutterBottom={false}
				>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};
