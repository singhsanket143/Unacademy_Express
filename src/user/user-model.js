import mongoose from "mongoose";
import brcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.pre('save', function(next) {
    brcrypt.hash(this.password, 8, (err, hash) => {
        if(err) {
            return next(err);
        }
        this.password = hash;
        next();
    })
});

userSchema.methods.validatePassword = function(password) {
    const passHash = this.password;
    return new Promise((resolve, reject) => {
        brcrypt.compare(password, passHash, (err, res) => {
            if(err) return reject(err);
            resolve(res);
        })
    })
}

export const User = mongoose.model('user', userSchema);