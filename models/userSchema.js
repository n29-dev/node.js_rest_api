const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function(next){

    const hashed = await bcrypt.hash(this.password, 10)
    this.password = hashed
    next()
})

userSchema.methods.generateAuthToken = async function(next){
    const token = await jwt.sign({id: this._id, admin: this.admin}, 'sercet', {expiresIn: '4h'})
    return token
}


const User = mongoose.model('User', userSchema);

module.exports = User;