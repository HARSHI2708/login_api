const mongoose = require('mongoose')

const loginSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true, 
        },
        password: {
            type: String,
            required: true,
            
        },
        confirm_password: {
            type: String,
            required: true,
        }
    },
)


const Login = mongoose.model('Login', loginSchema);
module.exports = Login;