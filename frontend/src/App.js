import MainHome from './screens/mainHome/main_home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/set_auth_token';
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./features/authSlice";
import { logoutUser } from './services/authService';
import Register from './components/Auth/sign_up';
import LogIn from './components/Auth/sign_in'
import ToolsBoard from './screens/toolsBoard';
import PrivateRoute from './components/CustomRoutes/private_route'
import MyCalendar from "./screens/calendar/calendar"
import EventForm from './screens/events/eventForm';
import EventView from "./screens/events/eventView"
import UserProfile from "./screens/profile/userProfile"

if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
                <Route exact path="/">
                  <MainHome/>
                </Route>
                <Route path="/login">
                  <LogIn/>
                </Route>
                <Route path="/signup">
                  <Register/>
                </Route>
                <PrivateRoute path="/board" component={ToolsBoard}/>
                <PrivateRoute path="/meetScheduler" component={MyCalendar}/>
                <PrivateRoute path="/createEvent" component={EventForm}/>
                <PrivateRoute path="/profile" component={UserProfile}/>
                <PrivateRoute path="/events/:eventId" component={EventView}/>
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
