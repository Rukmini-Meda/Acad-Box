import React from "react";
import { connect } from "react-redux";
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, ErrorText } from "@material-ui/core";
import SizedBox from "../CustomSizedBox/sized_box";
import classNames from "classnames";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {registerUser} from "../../services/authService"
import isEmpty from "is-empty"
import Header from "../header/header"

class Register extends React.Component{

    constructor(){
      super();
      this.state = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
        doses: 0,
        // verified: false,
        // certificate: null,
        isFaculty: true,
        vaccine: "",
        errors: {}
      }
    }
  
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push("/board");
      }
    }
  
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({
          errors: nextProps.errors
        })
      }
    }
    
    onChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    onSubmit = (e) => {
      e.preventDefault();
      const newUser = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        isFaculty: this.state.isFaculty,
        isVerified: false,
        doses: this.state.doses,
        vaccine: this.state.vaccine
      }
      console.log(newUser)
      this.props.registerUser(newUser, this.props.history);
    }

    stringFacultyValue = (value) => {
      if(value){
        return "Faculty"
      }
      else{
        return "Student"
      }
    }
  
    render(){
      const { errors } = this.props;
      console.log(errors)
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
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box component="form" noValidate onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={this.onChange}
                      value={this.state.firstName}
                      error={!isEmpty(errors.firstName)}
                      helperText={errors.firstName}
                      type="text"
                      className={classNames("",{
                        invalid: errors.firstName
                      })}
                    />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={this.onChange}
                      value={this.state.lastName}
                      error={!isEmpty(errors.lastName)}
                      helperText={errors.lastName}
                      type="text"
                      className={classNames("",{
                        invalid: errors.lastName
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      error={!isEmpty(errors.email)}
                      helperText={errors.email}
                      type="email"
                      className={classNames("",{
                        invalid: errors.email
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="username"
                      name="username"
                      autoComplete="username"
                      onChange={this.onChange}
                      value={this.state.username}
                      error={!isEmpty(errors.username)}
                      helperText={errors.username}
                      type="text"
                      className={classNames("",{
                        invalid: errors.username
                      })}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={this.onChange}
                      value={this.state.password}
                      error={!isEmpty(errors.password)}
                      helperText={errors.password}
                      className={classNames("",{
                        invalid: errors.password
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password2"
                      label="Re-enter Password"
                      type="password"
                      id="password2"
                      autoComplete="reenter-password"
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={!isEmpty(errors.password2)}
                      helperText={errors.password2}
                      className={classNames("",{
                        invalid: errors.password2
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel required id="isFaculty">Role</InputLabel>
                      <Select
                        required
                        labelId="isFaculty"
                        id="isFaculty"
                        value={this.state.isFaculty}
                        label="Role"
                        onChange={(e) => {
                          this.setState({
                            isFaculty: e.target.value
                          })
                        }}
                      >
                        <MenuItem value={true}>Faculty</MenuItem>
                        <MenuItem value={false}>Student</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="vaccine"
                      label="Enter vaccine name"
                      type="text"
                      id="vaccine"
                      autoComplete="vaccine"
                      onChange={this.onChange}
                      value={this.state.vaccine}
                      error={!isEmpty(errors.vaccine)}
                      helperText={errors.vaccine}
                      className={classNames("",{
                        invalid: errors.vaccine
                      })}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel required id="doses">Number of doses vaccinated</InputLabel>
                      <Select
                        required
                        labelId="doses"
                        id="doses"
                        value={this.state.doses}
                        label="Number of doses vaccinated"
                        onChange={(e) => {
                          this.setState({
                            doses: e.target.value
                          })
                        }}
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12}>
                  <InputLabel required id="certificate">Upload vaccination certificate for verification</InputLabel>
                    <input required type="file" id="certificate" onChange={(e) =>{
                      this.onChange(e)
                      this.setState({
                        verified: true
                      })
                    }}
                        value={this.state.certificate}
                        error={errors.certificate}
                        className={classNames("",{
                          invalid: errors.certificate
                        })}/>
                  </Grid> */}
                </Grid>
                <SizedBox/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
                >
                  Sign Up
                </Button>
                <SizedBox/>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link to="/login">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                <SizedBox/>
              </Box>
            </Box>
          </Container>
        </>
      );
    } 
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    console.log(state.errors.register)
    return ({
        auth: state.auth,
        errors: state.errors.register
    });
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register));