const isEmpty = require("is-empty")
const validator = require("validator")

module.exports = function validateClassesFormInput(data){
    const errors = {}
    console.log(data)
    data.courseName = (isEmpty(data.courseName) ? "" : data.courseName)
    data.courseCode = (isEmpty(data.courseCode) ? "" : data.courseCode)
    data.numberOfStudents = (isEmpty(data.numberOfStudents) ? "" : data.numberOfStudents)
    data.percentageOfStudentsAllowed = (isEmpty(data.percentageOfStudentsAllowed) ? "" : data.percentageOfStudentsAllowed)
    data.startTime = (isEmpty(data.startTime) ? "" : data.startTime)
    data.endTime = (isEmpty(data.endTime) ? "" : data.endTime)

    if(validator.isEmpty(data.courseName)){
        errors.courseName = "Course Name field is required"
    }
    
    if(validator.isEmpty(data.courseCode)){
        errors.courseCode = "Course code field is required"
    }

    if(validator.isEmpty("" + data.numberOfStudents)){
        errors.numberOfStudents = "Number of students field is required"
    }
    else if(!validator.isNumeric("" + data.numberOfStudents)){
        errors.numberOfStudents = "This field should be an integer"
    }
    else if(data.numberOfStudents < 0){
        errors.numberOfStudents = "Number of students should be positive integer value"
    }

    if(validator.isEmpty("" + data.percentageOfStudentsAllowed)){
        errors.percentageOfStudentsAllowed = "Percentage field is required"
    }
    else if(!validator.isNumeric("" + data.percentageOfStudentsAllowed)){
        errors.percentageOfStudentsAllowed = "This field should be an integer"
    }
    else if(data.percentageOfStudentsAllowed < 0 || data.percentageOfStudentsAllowed > 100){
        errors.percentageOfStudentsAllowed = "Invalid percentage value"
    }

    if(validator.isEmpty(data.startTime)){
        errors.startTime = "Start time field is required"
    }

    if(validator.isEmpty(data.endTime)){
        errors.endTime = "End time field is required"
    }

    if(!validator.isEmpty(data.startTime) && !validator.isEmpty(data.endTime)){
        if(data.startTime >= data.endTime){
            errors.startTime = "Start time should be less than end time"
            errors.endTime = "End time should be greater than start time"
        }    
    }
    
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}