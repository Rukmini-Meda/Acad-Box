import { Container} from "@material-ui/core"
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
import {Grid} from "@material-ui/core"
import SizedBox from "../components/customSizedBox/sized_box";
import pic from "../assets/oms_icon_toolsboard.png"

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
                      </Grid>
                </Container>
            </>
        );
    }
}

ToolsBoard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(ToolsBoard))
