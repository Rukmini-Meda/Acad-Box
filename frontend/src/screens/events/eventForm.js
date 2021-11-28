import React from "react"
import {Container, Typography, Box, CssBaseline, Grid, TextField, Button} from "@material-ui/core"
import SizedBox from "../../components/CustomSizedBox/sized_box.js"
import {PropTypes} from "prop-types"
import {createClass} from "../../services/eventService"
import {withRouter} from "react-router"
import {connect} from "react-redux"
import Event from "../../models/event"
import isEmpty from "is-empty"
import classNames from "classnames"
import Alert from '@mui/material/Alert';
import Header from "../../components/header/header"
import jwt_decode from "jwt-decode"

class EventForm extends React.Component{

    constructor(){
        super()
        this.state = {
            courseName: "",
            courseCode: "",
            numberOfStudents: 0,
            percentageOfStudentsAllowed: 100,
            startTime: "",
            endTime: ""
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const event = Event.toDict(
            this.state.courseName,
            this.state.courseCode,
            this.state.numberOfStudents,
            this.state.percentageOfStudentsAllowed,
            this.state.startTime,
            this.state.endTime,
        )
        const facultyId = jwt_decode(localStorage.getItem("jwtToken")).id
        this.props.createClass(event, this.props.history, facultyId)
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
        const { errors } = this.props
        return (
            <>
                <Header></Header>
                <Container component="main" maxWidth="xs">
                    <SizedBox/>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                    {
                        errors && errors.message &&
                        <Alert severity="error">{errors.message}</Alert>
                    }
                    <SizedBox/>
                    <Typography component="h1" variant="h5">
                        Create A Class
                    </Typography>
                    <Box component="form" noValidate onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="course-name"
                                name="courseName"
                                required
                                fullWidth
                                id="courseName"
                                label="Course Name"
                                autoFocus
                                onChange={this.onChange}
                                value={this.state.courseName}
                                error={!isEmpty(errors.courseName)}
                                helperText={errors.courseName}
                                type="text"
                                className={classNames("",{
                                    invalid: errors.courseName
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="courseCode"
                                label="Course Code"
                                name="courseCode"
                                autoComplete="course-code"
                                onChange={this.onChange}
                                value={this.state.courseCode}
                                error={!isEmpty(errors.courseCode)}
                                helperText={errors.courseCode}
                                type="text"
                                className={classNames("",{
                                    invalid: errors.courseCode
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="numberOfStudents"
                                label="Number of Students"
                                name="numberOfStudents"
                                autoComplete="numberOfStudents"
                                onChange={this.onChange}
                                value={this.state.numberOfStudents}
                                error={!isEmpty(errors.numberOfStudents)}
                                helperText={errors.numberOfStudents}
                                className={classNames("",{
                                    invalid: errors.numberOfStudents
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="percentageOfStudentsAllowed"
                                label="Percentage of students allowed"
                                name="percentageOfStudentsAllowed"
                                autoComplete="percentageOfStudentsAllowed"
                                onChange={this.onChange}
                                value={this.state.percentageOfStudentsAllowed}
                                error={!isEmpty(errors.percentageOfStudentsAllowed)}
                                helperText={errors.percentageOfStudentsAllowed}
                                className={classNames("",{
                                    invalid: errors.percentageOfStudentsAllowed
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Start Time"
                                id="startTime"
                                type="datetime-local"
                                error={!isEmpty(errors.startTime)}
                                helperText={errors.startTime}
                                sx={{ width: 250 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                onChange={this.onChange}
                                className={
                                    classNames("",{
                                        invalid: errors.startTime
                                    })
                                }
                            />
                            <TextField
                                id="endTime"
                                label="End Time"
                                type="datetime-local"
                                error={!isEmpty(errors.endTime)}
                                helperText={errors.endTime}
                                sx={{ width: 250 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                onChange={this.onChange}
                                className={
                                    classNames("",{
                                        invalid: errors.endTime
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <SizedBox/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="secondary"
                    >
                        Create Class
                    </Button>
                </Box>
                </Box>
            </Container>
        </>
      )
    }
}

EventForm.propType = {
    createClass: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors.createClass
    }
}

export default connect(mapStateToProps, { createClass })(withRouter(EventForm))