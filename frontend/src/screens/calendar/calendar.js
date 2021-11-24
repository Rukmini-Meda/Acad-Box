import React from "react";
import {useHistory, withRouter} from "react-router-dom"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import {connect} from "react-redux"
import {getClasses} from "../../services/eventService"
import { logoutUser } from "../../services/authService";

class MyCalendar extends React.Component{

  componentDidMount(){
    this.props.getClasses()
  }

  handleEventClick = (e) => {
    console.log(e)
    const eventId = e.event.id
    this.props.history.push("/events/" + eventId)
  }

  render(){
    let customButtons = null, headerToolbar = null
    const isFaculty = localStorage.getItem("isFaculty")
    const doses = localStorage.getItem("doses")
    console.log(isFaculty)
    console.log(doses)
    if(isFaculty == "true" && doses == "2"){
      console.log("hhhh")
      customButtons = {
        addEventButton: {
          text: "Add Event",
          click: () => {
            this.props.history.push("/createEvent");
          }
        },
        profile: {
          text: "Profile",
          click: () => {
            this.props.history.push("/profile")
          }
        },
        logout: {
          text: "Logout",
          click: () => {
            this.props.logoutUser()
          }
        },
        back: {
          text: "Go Back",
          click: () => {
            this.props.history.goBack()
          }
        },
        home: {
          text: "Home",
          click: () => {
            this.props.history.push("/")
          }
        }
      }
      headerToolbar = {
        left: "back home prev,next today addEventButton",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay profile logout"
      }
    }
    else{
      customButtons = {
        profile: {
          text: "Profile",
          click: () => {
            this.props.history.push("/profile")
          }
        },
        logout: {
          text: "Logout",
          click: () => {
            this.props.logoutUser()
          }
        },
        back: {
          text: "Go Back",
          click: () => {
            this.props.history.goBack()
          }
        },
        home: {
          text: "Home",
          click: () => {
            this.props.history.push("/")
          }
        }
      }
      headerToolbar = {
        left: "back home prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay profile logout"
      }
    }
    
    return (
      <div id="calendar-outer">
        <div id="calendar">
            <FullCalendar
              plugins = {[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              initialView = "dayGridMonth"
              events = {this.props.events}
              customButtons={customButtons}
              headerToolbar={headerToolbar}
              // editable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // weekends={this.state.weekendsVisible}
              // initialEvents={INITIAL_EVENTS}
              // select={this.handleDateSelect}
              // eventContent={renderEventContent}
              eventClick={this.handleEventClick}
              // eventsSet={this.handleEvents}
            />
        </div>
    </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    events: state.classes.events
  }
}

export default connect(mapStateToProps, { getClasses, logoutUser })(withRouter(MyCalendar));