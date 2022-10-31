import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { CurrentUser } from "../../../services/types/service"
import AuthService from "../../../services/AuthService"
import { useHistory } from "react-router-dom"
import { RoundedButton } from "../../../components/RoundedButton"

const Header: React.FC = () => {
    let history = useHistory()
    let currentUser: CurrentUser = AuthService.getCurrentUser()

    const handleLogout = (): void => {
        AuthService.logout()
        history.replace({
            pathname: "/"
        })
    }

    return (
        <Box sx={{
            marginTop: 5
        }}>
            <Grid container>
                <Grid item xs>
                    <Box>
                        <Typography component="h1" variant="h5" align="left">
                            {currentUser.username}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box style={{
                        textAlign: "right"
                    }}>
                        <RoundedButton 
                            variant="contained"
                            onClick={handleLogout}
                        >
                            Logout
                        </RoundedButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header