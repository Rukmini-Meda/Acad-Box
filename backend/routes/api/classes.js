const express = require('express')
const router = express.Router()
const ClassesModel = require("../../models/classes.js")
const UserModel = require("../../models/user")
const validateClassesFormInput = require("../../validation/classesForm")
const emailCredentials = require("../../config/mail")
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailCredentials.GMAIL_ID,
        pass: emailCredentials.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

router.patch("/editEvent", (req, res) => {
    try{
        const eventId = req.query.eventId
        const newData = req.body
        ClassesModel.findOne({
            _id: eventId
        }).then(event => {
            console.log(event)
            const keys = Object.keys(newData)
            console.log(keys)
            keys.forEach(key => {
                
                if(key == "numberOfStudents" || key == "percentageOfStudentsAllowed"){
                    const bookedSeats = (event["numberOfStudents"] * (event["percentageOfStudentsAllowed"]/100)) - event["seats"]
                    event[key] = newData[key]
                    event["seats"] = (event["numberOfStudents"] * (event["percentageOfStudentsAllowed"]/100)) - bookedSeats
                }
                else{
                    event[key] = newData[key]
                }
            })
            console.log(event)
            event.save().then(result => {
                console.log(result)
                return res.status(200).json(result)
            }).catch(err => {
                console.log(err.response.data)
                errors.message = err.response.data
                return res.status(500).json(errors)
            })
        }).catch(err => {
            console.log(err.response.data)
            errors.message = err.response.data
            return res.status(500).json(errors)
        })
    }catch(err){
        console.log(err)
    }
})

router.patch("/bookSeat", (req, res) => {
    try{
        const eventId = req.query.eventId
        const studentId = req.query.studentId
        ClassesModel.findOne({
            _id: eventId
        }).then(event => {
            if(event.seats <= 0){
                return res.status(400).json("No available seats. Please try again later")
            }
            UserModel.findOne({
                _id: studentId
            }).then(student => { 
                if(event.registeredStudents !== undefined){
                    let alreadyBooked = false
                    let total = event.registeredStudents.length
                    for(let i = 0; i < total; i ++){
                        const obj = event.registeredStudents[i]
                        if(obj === studentId){
                            console.log("It's booked")
                            alreadyBooked = true
                        }
                    }
                    if(alreadyBooked){
                        return res.status(400).json("Your seat is already booked for this class")
                    }
                }
                
                event.seats = event.seats - 1
                if(event.registeredStudents === undefined){
                    event.registeredStudents = []
                }
                event.registeredStudents.push(studentId)
                event.save().then(result => {
                    console.log(event)
                    let emailBody = "Hello " + student.firstName + " " + student.lastName + ",\n This email is for confirming your booking information. Please find the details below:\nCourse Name: " + event.courseName + "\n" + "Time: " + event.startTime + " - " + event.endTime + "\n. Please be on time."
                    let mailOptions = {
                        from: emailCredentials.GMAIL_ID,
                        to: student.email,
                        text: emailBody,
                        subject: "BOOKING CONFIRMATION: You're in! Your seat is booked for " + event.courseName + " class at " + event.startTime
                    }
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err){
                            console.log(err)
                            return res.status(201).json({
                                event: event,
                                message: "Seat Booked. Could not send email successfully"
                            })
                        }
                        else{
                            console.log(result)
                            console.log("Email sent successfuly")
                            const data = {
                                event: event,
                                message: "Seat booked. Email sent successfully"
                            }
                            return res.status(201).json(data)
                        }
                    })
                }).catch(err => {
                    console.log(err)
                    return res.status(500).json(err)
                })
            }).catch(err => {
                return res.status(500).json(err)
            })
        }).catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})


router.delete("/removeEvent", (req, res) => {
    const eventId = req.query.eventId
    if(eventId === undefined){
        return res.status(400).json({
            message: "Bad Request"
        })
    }
    ClassesModel.deleteOne({
        _id: eventId
    }).then(result =>{
        return res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            message: "Internal Server Error. Couldn't delete the item"
        })
    })
})

router.get("/getClassDetails", (req, res) => {
    let classId = req.query.classId
    ClassesModel.findOne({
        _id: classId
    }).then((classData) => {
        return res.status(200).json(classData)
    }).catch(err => {
        errors = {}
        errors.message = err
        console.log(errors)
        return res.status(500).json(errors)
    })
})

router.get("/getClasses", (req, res) => {
    ClassesModel.find({}).then((classes) => {
        console.log(classes)
        return res.status(200).json(classes)
    }).catch(err => {
        console.log(err)
        return res.status(500).json("Internal Server Error")
    })
})

router.post("/createClass", (req, res) => {
    const { errors, isValid } = validateClassesFormInput(req.body)
    const facultyId = req.query.facultyId
    console.log(errors)
    console.log(isValid)
    if(!isValid){
        errors.message = "Invalid form data"
        return res.status(400).json(errors)
    }
    ClassesModel.findOne({
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }).then((event) => {
        if(event){
            console.log(event)
            console.log("Class already exists")
            errors.message = "Class/Session/Event already exists in that time period"
            return res.status(400).json(errors)
        }
        else{
            const newClass = new ClassesModel({
                courseName: req.body.courseName,
                courseCode: req.body.courseCode,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                numberOfStudents: req.body.numberOfStudents,
                percentageOfStudentsAllowed: req.body.percentageOfStudentsAllowed,
                numberOfDosesAllowed: req.body.numberOfDosesAllowed,
                seats: Math.floor((req.body.numberOfStudents) * (req.body.percentageOfStudentsAllowed/100)),
                registeredStudents: [],
                createdBy: facultyId
            })
            newClass.save().then(session => {
                console.log(session)
                console.log("New class created and saved")
                return res.status(201).json(session)
            }).catch(err => {
                console.log(err)
                errors.message = err
                res.status(500).json(errors)
            })  
        }
    }).catch(err => {
        console.log(err)
        errors.message = err
        res.status(500).json(errors)
    })
    console.log("Done!")
})

module.exports = router