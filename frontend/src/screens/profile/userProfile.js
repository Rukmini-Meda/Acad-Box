import React from "react"
import Alert from "@mui/material/Alert"
import Header from "../../components/header/header"
import {Container, TableContainer, TableBody, TableRow, TableCell, Table, Paper, Button} from "@material-ui/core"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {fetchUserProfile, editProfile} from "../../services/userService"
import jwt_decode from "jwt-decode"
import isEmpty from "is-empty"

class UserProfile extends React.Component{

    componentDidMount(){
        const userId = jwt_decode(localStorage.getItem("jwtToken")).id
        this.props.fetchUserProfile(userId)
    }

    onEdit = (e) => {
        const userId = jwt_decode(localStorage.getItem("jwtToken")).id
        const value = window.prompt("Enter new value for the field username")
        if(value == null){
            return
        }
        const newData = {
            username: value
        }
        this.props.editProfile(userId, newData)
    }

    render(){
        const {errors} = this.props
        const {profile} = this.props
        const userData = profile
        let errorComponent = (<></>)
        if(!isEmpty(errors)){
            errorComponent = (<Alert severity="error">{errors.message}</Alert>)
        }
        return (<>
            <Header></Header>
            {errorComponent}
            <center>
                <h2>Profile</h2>
            </center>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow
                                key="userId"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    User ID
                                </TableCell>
                                <TableCell>{userData.id}</TableCell>
                            </TableRow>
                            <TableRow
                                key="firstName"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    First Name
                                </TableCell>
                                <TableCell>{userData.firstName}</TableCell>
                            </TableRow>
                            <TableRow
                                key="lastName"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Last Name
                                </TableCell>
                                <TableCell>{userData.lastName}</TableCell>
                            </TableRow>
                            <TableRow
                                key="username"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Username
                                </TableCell>
                                <TableCell>{userData.username}</TableCell>
                                <TableCell>
                                    <Button id="username" variant="contained" color="primary"
                                    onClick={this.onEdit}>Edit</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                key="email"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Email ID
                                </TableCell>
                                <TableCell>{userData.email}</TableCell>
                            </TableRow>
                            <TableRow
                                key="doses"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Number of vaccination doses done
                                </TableCell>
                                <TableCell>{userData.doses}</TableCell>
                            </TableRow>
                            <TableRow
                                key="vaccine"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Vaccine Name
                                </TableCell>
                                <TableCell>{userData.vaccine}</TableCell>
                            </TableRow>
                            <TableRow
                                key="role"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Role
                                </TableCell>
                                <TableCell>{userData.isFaculty ? "Faculty" : "Student"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors.profile,
        profile: state.profile
    }
}
export default connect(mapStateToProps, {fetchUserProfile, editProfile})(withRouter(UserProfile))