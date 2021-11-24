const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const UserModel = require("../../models/user");

// "/profile?userId=1"
router.get("/profile", (req, res) => {
    const userId = req.query.userId
    if(userId === undefined){
        return res.status(400).json({
            message: "Bad Request"
        })
    }
    UserModel.findOne({
        _id: userId
    }).then(result => {
        return res.status(200).json(result)
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error, couldn't fetch profile",
            error: err
        })
    })
})

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(errors)
    console.log(isValid)
    if(!isValid){
        errors.message = "Invalid form data"
        return res.status(400).json(errors);
    }
    UserModel.findOne({
        email: req.body.email
    }).then(user => {
        if(user){
            errors.email = "Email already exists"
            console.log("Email already exists")
            return res.status(400).json(errors);
        }
        else{
            const newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isFaculty: req.body.isFaculty,
                isVerified: req.body.isVerified,
                vaccine: req.body.vaccine,
                doses: req.body.doses
            });
            console.log("new user created")
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => {
                        console.log(errors)
                        errors.message = "Internal Server Error"
                        res.status(500).json(errors)
                    });
                })
            });  
            console.log("Password encrypted")      
        }
    }).catch(err => {
        console.log(err)
        errors.message = "Internal Server Error"
        res.status(500).json(errors)
    })
    console.log("Done!")
});

router.get("/getUserProfile", (req, res) => {
    const userId = req.query.userId
    UserModel.findOne({
        _id: userId
    }).then(user =>{
        const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
            username: user.username,
            email: user.email,
            doses: user.doses,
            vaccine: user.vaccine,
            isFaculty: user.isFaculty
        }
        return res.status(200).json(profile)
    }).catch(err => {
        const errors = {
            message: "Internal Server Error"
        }
        // errors.message = err.response.data
        return res.status(500).json(errors)
    })
})

router.patch("/editProfile", (req, res) => {
    const userId = req.query.userId
    const newData = req.body
    UserModel.findOne({
        _id: userId
    }).then(user => {
        const keys = Object.keys(newData)
        console.log(keys)
        keys.forEach(key => user[key] = newData[key])
        user.save().then(result => {
            const profile = {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
                username: user.username,
                email: user.email,
                doses: user.doses,
                vaccine: user.vaccine,
                isFaculty: user.isFaculty
            }
            console.log(profile)
            return res.status(200).json(profile)
        }).catch(err => {
            console.log(err.response.data)
            const errors = {}
            errors.message = err.response.data
            return res.status(500).json(errors)
        })
    }).catch(err => {
        // console.log(err.response.data)
        const errors = {
            message: "Internal Server Error"
        }
        // errors.messsage = err.response.data
        return res.status(500).json(errors)
    })
})

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    console.log(errors)
    console.log(isValid)

    if(!isValid){
        errors.message = "Invalid form data"
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({ email }).then(user => {
        if(!user){
            console.log("Email not found")
            errors.email = "Email not found"
            return res.status(404).json(errors);
        }
        console.log("Found user")

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    username: user.username
                }
                jwt.sign(payload, keys.secretOrKey,{
                    expiresIn: 31556926 // 1 year in seconds
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer" + token,
                        id: user._id,
                        isFaculty: user.isFaculty,
                        doses: user.doses
                    })
                })
                console.log("Encryption done")
            }
            else{
                errors.password = "Password Incorrect"
                return res.status(400).json(errors);
            }
        }).catch(err => {
            console.log(err)
            errors.message = err.response.data + " Internal Server Error"
            res.status(500).json(errors)
        })
        console.log("Done")
    })
});

module.exports = router;