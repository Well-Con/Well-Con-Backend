import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId : string, res : Response)=>{
    const key = process.env.JWT_SECRET

    if (!key) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({userId}, key);

    res.cookie("token", token, {httpOnly: true, sameSite:process.env.NODE_ENV === "development" ? "strict" : "none", secure: process.env.NODE_ENV !== "development"});

    return token;

}

export default generateToken;