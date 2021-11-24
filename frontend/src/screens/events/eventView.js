import React from "react";
import {Container, Button} from "@material-ui/core"
import {connect, useSelector} from "react-redux"
import {withRouter} from "react-router-dom"
import PropTypes from "prop-types"
import {fetchEventDetails} from "../../services/eventService"
import { selectClassById } from "../../features/classesSlice.js";
import Header from "../../components/header/header"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SizedBox from "../../components/CustomSizedBox/sized_box"
import {bookSeat, editEvent, cancelEvent} from "../../services/eventService"
import Alert from "@mui/material/Alert"
import jwt_decode from "jwt-decode"

class EventView extends React.Component{

    componentDidMount(){
        this.props.fetchEventDetails(this.props.match.params.eventId)
    }

    onBookSeat = (e) => {
        const id = jwt_decode(localStorage.getItem("jwtToken")).id
        this.props.bookSeat(this.props.match.params.eventId, id)
    }

    onEdit = (e) => {
        console.log(e.target.id)
        const value = window.prompt("Enter your new value for the field " + e.target.id)
        if(value == null){
            return;
        }
        const newData = {
            [e.target.id]: value
        }
        this.props.editEvent(this.props.match.params.eventId, newData)
    }

    onCancel = (e) => {
        this.props.cancelEvent(this.props.match.params.eventId, this.props.history)
    }

    onReschedule = (e) => {
        // this.props.rescheduleEvent
    }

    onRepeat = (e) => {

    }

   render(){
        const eventId = this.props.match.params.eventId
        const classData = this.props.classData
        const total_seats = Math.floor(classData.numberOfStudents * (classData.percentageOfStudentsAllowed/100))
        const seats = classData.seats
        const isFaculty = localStorage.getItem("isFaculty")
        const doses = localStorage.getItem("doses")
        const {errors} = this.props
        return (
            <>
                <Header></Header>
                {
                    errors &&
                    <Alert severity="error">{errors}</Alert>
                }
                <center>
                    <h2>Class Details</h2>
                </center>
                {
                    (isFaculty === "true") &&
                    (doses === "2") &&
                    <Container>
                        <Button variant="contained" color="primary" onClick={this.onCancel}>Cancel</Button>
                        {/* <Button variant="contained" color="primary" onClick={this.onRepeat}>Repeat</Button> */}
                        <SizedBox/>
                    </Container>
                }
                {
                    !(isFaculty === "true") &&
                    (seats > 0) &&
                    (doses === "2") &&
                    <Container>
                        <Button variant="contained" color='primary' onClick={this.onBookSeat}>Book a seat</Button>
                        <SizedBox/>
                    </Container>
                }
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow
                            key="classId"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Class ID
                                </TableCell>
                                <TableCell>{classData._id} </TableCell>
                            </TableRow>
                            <TableRow
                            key="courseName"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Course Name 
                                </TableCell>
                                <TableCell>{classData.courseName} </TableCell>
                                {/* <TableCell><Button id="courseName" variant="contained" color="primary" onClick={this.onEdit}>Edit</Button></TableCell> */}
                            </TableRow>
                            <TableRow
                            key="courseCode"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Course Code
                                </TableCell>
                                <TableCell>{classData.courseCode}</TableCell>
                                {/* <TableCell> <Button id="courseCode" variant="contained" color="primary" onClick={this.onEdit}>Edit</Button></TableCell> */}
                            </TableRow>
                            <TableRow
                            key="numberOfStudents"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Number of Students
                                </TableCell>
                                <TableCell>{classData.numberOfStudents}</TableCell>
                                {/* <TableCell> <Button id="numberOfStudents" variant="contained" color="primary" onClick={this.onEdit}>Edit</Button></TableCell> */}
                            </TableRow>
                            <TableRow
                            key="percentageOfStudentsAllowed"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Percentage of Students Allowed
                                </TableCell>
                                <TableCell>{classData.percentageOfStudentsAllowed}</TableCell>
                                {/* <TableCell> <Button id="percentageOfStudentsAllowed" variant="contained" color="primary" onClick={this.onEdit}>Edit</Button></TableCell> */}
                            </TableRow>
                            <TableRow
                            key="startTime"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Start Time
                                </TableCell>
                                <TableCell>{classData.startTime} </TableCell>
                                {/* <TableCell> <Button id="startTime" variant="contained" color="primary" onClick={this.onEdit}>Edit</Button></TableCell> */}
                            </TableRow>
                            <TableRow
                            key="endTime"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    End Time
                                </TableCell>
                                <TableCell>{classData.endTime} </TableCell>
                                {/* <TableCell> <Button id="endTime" variant="contained" color="primary" onClick={this.onEdit}>Edit</Button></TableCell> */}
                            </TableRow>
                            <TableRow
                            key="seats"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Number of seats booked
                                </TableCell>
                                <TableCell>{total_seats - seats}</TableCell>
                            </TableRow>
                            <TableRow
                            key="availableSeats"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Available Seats
                                </TableCell>
                                <TableCell>{seats} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            </>
        );
    }
}

EventView.propTypes = {
    auth: PropTypes.object.isRequired,
    classData: PropTypes.object.isRequired,
    fetchEventDetails: PropTypes.func.isRequired,
    bookSeat: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    editEvent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        classData: state.classes.event,
        errors: state.errors.eventView
    }
}

export default connect(mapStateToProps, { fetchEventDetails, bookSeat, editEvent, cancelEvent })(withRouter(EventView))