import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button } from '@mui/material'
import { UserContext } from '../../../context/UserContext'

const DisplayUsers: React.FC = () => {
    let { users, removeUser } = React.useContext(UserContext)

    /**
     * Format name
     * 
     * @param firstName 
     * @param middleName 
     * @param lastName 
     * @returns 
     */
    const formatName = (firstName: string, middleName: string, lastName: string): string => {
        let middleInitial = middleName.slice(0, 1) + "."
        return firstName + " " + middleInitial + " " + lastName
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
            <TableHead>
                <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Branch ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user, index) => (
                <TableRow
                    key={index}
                >
                    <TableCell>
                        {index + 1}
                    </TableCell>
                    <TableCell>
                        {user.branchId}
                    </TableCell>
                    <TableCell>
                        {user.userName}
                    </TableCell>
                    <TableCell>
                        {formatName(user.firstName, user.middleName, user.lastName)}
                    </TableCell>
                    <TableCell>
                        {user.position}
                    </TableCell>
                    <TableCell>
                        <Button
                            onClick={() => removeUser(index)}
                            size="small"
                            color="inherit"
                            variant="contained"
                        >
                            Remove
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
      </TableContainer>
    ) 
}

export default React.memo(DisplayUsers)