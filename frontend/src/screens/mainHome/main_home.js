import React from "react";
import {Link} from "react-router-dom";
import './main_home.css';
import {Container,Button} from '@material-ui/core';
import {connect} from "react-redux"
import {logoutUser} from "../../services/authService.js"

class MainHome extends React.Component{

    renderEntryButtons = () => {
        const authBar = (
            <Container>
                <Link to="/login" class="no-underline m-10">
                    <Button variant="contained" color="secondary">Log In</Button>
                </Link>
                <Link to="/signup" class="no-underline m-10">
                    <Button variant="contained" color="secondary">Sign Up</Button>
                </Link>
            </Container>
        )

        const getStartedButton = (
            <Container>
                <Link to="/board" class="no-underline m-10">
                    <Button variant="contained" color="secondary">Get Started</Button>
                </Link>
                
                <Button variant="contained" color="secondary" onClick={(e) => this.props.logoutUser()}>Logout</Button>
                
            </Container>
        )

        
        if(this.props.auth.isAuthenticated){
            return getStartedButton;
        }
        else{
            return authBar;
        }
    }

    render(){

        return (
            <>
                <div id="mainHome">
                    <div id="sizedBox"></div>
                    <div id="mainTitle">
                        <h1>Acad-Box</h1>
                        <h6>A tool box to boost productivity for the academic community</h6>
                    </div>
                    <div id="choiceBar">
                        {this.renderEntryButtons()}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logoutUser})(MainHome)