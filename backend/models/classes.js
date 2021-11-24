const mongoose = require("mongoose")

const ClassSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    numberOfStudents: {
        type: Number,
        required: true
    },
    percentageOfStudentsAllowed: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    seats: {
        type: Number,
        required: true
    },
    registeredStudents: {
        type: Array,
    },
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = Class = mongoose.model("classes", ClassSchema)