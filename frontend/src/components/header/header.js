import React from 'react';
import {AppBar, Box, Toolbar, Button, IconButton} from "@material-ui/core"
import {logoutUser} from "../../services/authService"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress'

class Header extends React.Component{

  onClickLogout = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  goHome = (e) => {
    e.preventDefault()
    this.props.history.push("/")
  }

  render(){
    const authSection = (
        <Toolbar>
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
        </Toolbar>
    )

    const notAuthSection = (
      <Toolbar>
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
      </Toolbar>
    )

    const loader = (
      <CircularProgress />
    )

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          {this.props.auth.isAuthenticated ? authSection : notAuthSection}
        </AppBar>
        <center>
          {this.props.auth.loading ? loader : <></>}
        </center>
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
