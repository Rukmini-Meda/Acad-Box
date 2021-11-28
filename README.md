# Acad-Box
A digital tool box to boost productivity of the academic community.

## Functional features

### Authentication work flow
#### Login
- Users can login with their email ID and password. Edge cases like email ID and password validation have been
  handled.
#### Registration
- Users with atleast one dose of vaccination can register with their details. Edge cases like form validation
  have been handled
#### Logout
- Users can logout
### Scheduling a class

#### Create an event or class
- Faculty users can schedule a class by clicking on add an event
#### View a class or event
- Event or class can be viewed by clicking on that card from the calendar
#### Cancel a class
- Faculty can cancel classes
#### View Profile
- View Profile from top bar
#### Edit Username
- Edit username through the button
#### Book a seat for students if there are available seats
- Students can book a seat and register if there are seats available
#### Email notification to students after booking a seat
- Email notification will be sent to students once their seat is booked
- Do check in the spam folder to verify for email from the application.
- Various edge cases have been handled based on scenario and operational errors.

## How to run?

There are two ways to run the app after cloning the repository. 

Before moving on to the below methods, please download the environment variable files from this link and place them as below:

Take the .env file from frontend-env folder and put it in the frontend folder
Take the .env file from backend-env folder and put it in the backend folder

Proceed to one of the following methods

### Method 1

Run the following in one terminal

```
    cd backend
    npm install
    nodemon server.js
```
and this in another terminal
```
    cd frontend
    npm install
    npm start
```

### Method 2

From the root folder, do

```
     npm install
```

Then,

```
    cd frontend
    npm install
    cd ..
```

```
    cd backend
    npm install
    cd ..
```

```
    npm run dev
```

## Supporting Documents

Supporting Documents including .env files can be found in this [link](https://drive.google.com/drive/folders/1eH-Ci03UGci-U3DZoUGy-lWCl69c04U1?usp=sharing)

## Demo Video

Demo Video can be found at this [link]()

## Tech Stack
### Frontend
- Material UI
- React JS
- Redux
- Axios
- Full Calendar
### Backend
- Node JS
- Express JS
- Mongoose JS
- Nodemailer
### Database
- MongoDB
### Continuous Integration
- Docker
- GitHub Actions

## Application Architecture

![Application Architecture](https://user-images.githubusercontent.com/44504940/143773070-a7440bb7-1130-4dee-8a17-cb6974233210.jpg)




