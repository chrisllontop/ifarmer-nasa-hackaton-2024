import {Box, Button, TextField} from "@mui/material";

export const Login = () => {
	return (
    <Box
	    component="form"
	    noValidate
	    sx={{
		    display: 'flex',
		    flexDirection: 'column',
		    gap: '12px',
		    width: '300px',
		    margin: 'auto',
		    mt: 4,
    }}>
			<TextField id="email" label="Email" variant="outlined" required />
			<TextField id="password" label="Password" variant="outlined" />
			<Button variant="contained" type="submit">Login</Button>
    </Box>
	)
}
