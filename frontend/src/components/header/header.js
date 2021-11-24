import React from 'react';
import {AppBar, Box, Toolbar, Typography, Button, Container, IconButton} from "@material-ui/core"
import {logoutUser} from "../../services/authService"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class Header extends React.Component{

  onClickLogout = (e) => {
    e.preventDefault()
    console.log("Here")
    this.props.logoutUser()
    console.log("Logged out successfully")
  }

  goHome = (e) => {
    e.preventDefault()
    console.log("Going to home page")
    this.props.history.push("/")
  }

  render(){
    const authSection = (<Toolbar>
    <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={(e) => this.props.history.goBack()}
        >
          <ArrowBackIcon/>
        </IconButton>
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={this.goHome}
        >
          <HomeIcon />
        </IconButton>
        <div style={{flex: 1}}>
          <Button color="inherit" onClick={() => this.props.history.push("/profile")}>Profile</Button>
          <Button color="inherit" onClick={this.onClickLogout}>Logout</Button>
        </div>
      </Toolbar>)

    const notAuthSection = (<Toolbar>
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={(e) => this.props.history.goBack()}
        >
          <ArrowBackIcon/>
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={this.goHome}
        >
          <HomeIcon />
        </IconButton>
      </Toolbar>)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        {this.props.auth.isAuthenticated ? authSection : notAuthSection}
        </AppBar>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Header))
