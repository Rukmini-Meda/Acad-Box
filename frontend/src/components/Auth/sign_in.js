import React from "react";
import {Container, Box, Grid, TextField, CssBaseline, Typography, Button, FormHelperText} from "@material-ui/core";
import classnames from "classnames";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../services/authService";
import {withRouter} from "react-router"
import Header from "../header/header";
import isEmpty from "is-empty"

class LogIn extends React.Component{

    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/board")
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push("/board")
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value 
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData)
    }

    render(){
        const {errors} = this.props
        console.log(errors)
        return (
            <>
                <Header></Header>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                        sx={{
                            marginTop: 150,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                        <h2>Acad-Box</h2> 
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <Box component="form" onSubmit={this.onSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            className={classnames("",{
                                invalid: errors.email
                            })}
                            error={!isEmpty(errors.email)}
                            helperText={errors.email}
                            onChange={this.onChange}
                            value={this.state.email}
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={!isEmpty(errors.password)}
                            helperText={errors.password}
                            className={classnames("",{
                                invalid: errors.password
                            })}
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                            >
                            Log In
                            </Button>
                            <Grid container className="dummy">
                            {/* <Grid item xs class="m-10">
                                <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                {/* <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link> */}
                            </Grid>
                            </Grid>
                        </Box>
                        </Box>
                        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </>
        );
    }
}

LogIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors.login
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(LogIn));
  