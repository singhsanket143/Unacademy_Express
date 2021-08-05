import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";

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

app.use('/api/v1',router);

app.get('/', (req, res) => {
    res.send({message: "OK GET"});
});

app.post('/', customLogger, (req, res) => {
    console.log(req.body);
    res.send({message: "OK POST"});
});


// router.get('/post', (req, res) => {
//     res.send({message: "Router OK"});
// });

// router.post('/post', (req, res) => {
//     res.send({message: "OK"});
// });


router
    .route('/post')
    .get((req, res) => {
        res.send({message: "Router OK GET"});
    })
    .post((req, res) => {
        res.send({message: "Router OK POST"});
    });

router 
    .route('/post/:id/:num')
    .put((req, res) => {
        console.log(req.params);
        res.send({message: "Router OK PUT"});
    })
    .patch((req, res) => {
        res.send({message: "Router OK PATCH"});
    })
    .delete((req, res) => {
        res.send({message: "Router OK DELETE"});
    });



export const start = () => {
    app.listen(3000, () => {
        console.log("Server started at 3000");
    });
}