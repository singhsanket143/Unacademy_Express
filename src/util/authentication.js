import { User } from "../user/user-model";
import jwt from "jsonwebtoken";

export const newToken = user => {
    return jwt.sign({id: user.id}, 'unacademy', {
        expiresIn: '10d'
    });
}

export const verifyToken = token => 
    new Promise((resolve, reject) => {
        jwt.verify(token, 'unacademy', (err, res) => {
            if(err) reject(err);
            console.log("Response", res);
            resolve(res);
        })
    })


export const register = async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'Email or password missing'});
    }
    try {
        const user = await User.create(req.body);
        const token = newToken(user);
        return res.status(200).send({token});
    } catch(e) {
        return res.status(500).end();
    }
}

export const login = async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'Email or password missing'});
    }

    try {
        const user = await User.findOne({email: req.body.email}).select('email password').exec();
        if(!user) return res.status(401).send({message: 'Invalid email or pass'});
        const valid = await user.validatePassword(req.body.password);
        if(!valid) return res.status(401).send({message: 'Invalid email or pass'});
        const token = newToken(user);
        return res.status(201).send({token});
    } catch(e) {
        console.error(e);
        res.status(500).end();
    }
}

export const protect = async (req, res, next) => {
    console.log(req.headers);
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith('Bearer')) return res.status(401).end();

    const token = bearer.split('Bearer ')[1].trim();

    let payload;
    try {
        payload = await verifyToken(token);
    } catch(e) {
        console.error(e);
        return res.status(401).end();
    }
    console.log(payload, token);
    const user = await User.findById(payload.id).select('email').exec();
    if(!user) return res.status(401).end();
    req.user = user;
    next();

}