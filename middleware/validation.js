
const { body,validationResult} = require('express-validator');

// to validate register route
const register = () => {
return[
        
        body("Fname", "Name should be accept 2 min or maximum of 25 characters.")
            .exists()
            .trim()
            .isLength({min:2, max: 25}),
    
             body("email")
             .isEmail()
             .withMessage("invalid email address")
             .normalizeEmail(),

           body('mobile')
           .isLength({ min: 10, max: 10 })
           .withMessage('Mobile number should contains 10 digits')
]
}

// valiadtion callback function
const validate = (req, resp, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return resp.status(400).json({
        statusCode:400,
        status:false,
        message: errors.errors[0].msg,
    })
}

module.exports  = { 
    register,
    validate,
}