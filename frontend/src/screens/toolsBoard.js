import {Button, Container} from "@material-ui/core"
import { logoutUser } from "../services/authService";
import React from "react"
import { connect } from "react-redux";
import {withRouter} from "react-router"
import {PropTypes} from "prop-types"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import Header from "../components/header/header"
import {Grid, Box} from "@material-ui/core"
import SizedBox from "../components/CustomSizedBox/sized_box";
import pic from "../assets/oms_icon_toolsboard.png"
import instant_meeting_pic from "../assets/instant_meeting.png"

class ToolsBoard extends React.Component{

    route1 = (e) => {
        this.props.history.push("/meetScheduler")
    }

    render(){
        return (
            <>
                <Header></Header>
                <Container>
                    <center>
                        <h2>Acad-Box</h2>
                        <h2>Choose one of the tools to get started with your work!</h2>
                    </center>
                </Container>
                <SizedBox></SizedBox>
                <Container m={4}>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item md={6}>
                            <Card>
                                <CardActionArea
                                    onClick={this.route1} 
                                    >
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={pic}
                                    alt="Calendar Image"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Class Scheduler
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Schedule your class online or offline. View all your sessions. Book a seat and learn.
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        {/* <Grid item md={6}>
                            <Card>
                                <CardActionArea
                                    onClick={(e) => {
                                        this.props.history.push("/instantScheduler")
                                    }} 
                                    >
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={instant_meeting_pic}
                                    alt="Calendar Image"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Instant Meeting Scheduler
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Schedule a group meeting instantly without any clashes. Easy to use. Faster to schedule.
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid> */}
                        {/* <Grid item md={4}>
                            <Card>
                                <CardActionArea
                                    onClick={this.route1} 
                                    >
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xnlxJDgc1Ubb8dEVAkp3ADVjmnLfLaWGqg&usqp=CAU"
                                    alt="Calendar Image"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Student Engagement Tool
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Schedule your class online or offline. View all your sessions. Book a seat and learn.
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                        </Card>
                        </Grid> */}
                    </Grid>
                
                </Container>
            </>
        );
    }
}

ToolsBoard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(ToolsBoard))
