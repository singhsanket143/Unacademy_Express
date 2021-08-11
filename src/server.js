import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import postRouter from "./post/post-router";


const app = express();
const router = express.Router();


app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended: true}));

const customLogger = (req, res, next) => {
    console.log("Logger incoming");
    console.log(req.body);
    next();
}

app.use('/api/post',postRouter);

app.get('/', (req, res) => {
    res.send({message: "OK GET"});
});

app.post('/', customLogger, (req, res) => {
    console.log(req.body);
    res.send({message: "OK POST"});
});

export const start = () => {
    app.listen(3000, () => {
        console.log("Server started at 3000");
    });
}