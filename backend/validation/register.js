const isEmpty = require("is-empty");
const validator = require("validator");

module.exports = function validateRegisterFormData(data){
    let errors = {};

    if(isEmpty(data.firstName) == true){
        data.firstName = "";
    }

    if(isEmpty(data.lastName) == true){
        data.lastName = "";
    }

    if(isEmpty(data.username) == true){
        data.username = "";
    }
    
    if(isEmpty(data.email) == true){
        data.email = "";
    }

    if(isEmpty(data.password) == true){
        data.password = "";
    }

    if(isEmpty(data.password2) == true){
        data.password2 = "";
    }

    data.vaccine = (isEmpty(data.vaccine) ? "" : data.vaccine)

    if(validator.isEmpty(data.firstName)){
        errors.firstName = "First Name is required";
    }
    else if(!validator.isAlpha(data.firstName)){
        errors.firstName = "Only alphabets allowed"
    }

    if(validator.isEmpty(data.lastName)){
        errors.lastName = "Last Name is required";
    }
    else if(!validator.isAlpha(data.lastName)){
        errors.lastName = "Only alphabets allowed"
    }

    if(validator.isEmpty(data.username)){
        errors.username = "Username field is required";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    else if(!validator.isEmail(data.email)){
        errors.email = "Not an email"
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = "Re enter password field is required";
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password = "Password and confirmation password should be same"
        errors.password2 = errors.password
    }

    if(validator.isEmpty(data.vaccine)){
        errors.vaccine = "Vaccine field is requied";
    }
    else if(!validator.isAlpha(data.vaccine)){
        errors.vaccine = "Only alphabets allowed for vaccine name"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}