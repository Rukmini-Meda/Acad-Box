const isEmpty = require("is-empty");
const validator = require("validator");

module.exports = function validateLoginFormData(data){

    let errors = {};

    if(isEmpty(data.email)){
        data.email = "";
    }

    if(isEmpty(data.password)){
        data.password = "";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    else if(!validator.isEmail(data.email)){
        errors.email = "Email is not valid"
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}