import mongoose from "mongoose";
import { config } from "../config/development";

export const connect = (url = config.databaseURL, opts = {}) => {
    console.log("Mongo DB Connected!!");
    return mongoose.connect(url);
}