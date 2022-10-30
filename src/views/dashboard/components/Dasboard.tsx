import React from "react"
import { Grid } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { UserProvider } from "../../../context/UserContext"
import AddUser from "./AddUser"
import DisplayUsers from "./DisplayUsers"
import Header from "./Header"

const DashboardComponent: React.FC = () => {

    return (
        <Container>
            <Box>
                <Header/>
            </Box>
            <Box sx={{
                marginTop: 5
            }}>
                <UserProvider>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <AddUser/>
                        </Grid>
                        <Grid item xs>
                            <DisplayUsers/>
                        </Grid>
                    </Grid>
                </UserProvider>
            </Box>
        </Container>
    )
}

export default DashboardComponent