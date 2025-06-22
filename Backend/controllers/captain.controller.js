const blacklistedModel = require('../models/blacklisted.Model');
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const {validationResult}=require('express-validator');

module.exports.registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors})
    }

    const {fullname,email,password,vehicle}=req.body;

    const captainAlreadyexists = await captainModel.findOne({email});
    if(captainAlreadyexists){
        return res.status(400).json({message:'captain already exists'})
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,password:hashedPassword,color:vehicle.color,plate:vehicle.plate,capacity:vehicle.capacity,vehicleType:vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(200).json({token,captain});
}

module.exports.loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array})
    }
    const {email,password}=req.body;
    const captain= await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
       return res.status(401).json({message:'Invalid email or password'});
    }
    const token = captain.generateAuthToken();
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async (req,res,next)=>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req,res,next)=>{
    const token =req.cookies.token || req.headers.authorization.split(' ')[1];
    res.clearCookie('token');
    await blacklistedModel.create({token});
    res.status(200).json({message:"captain logouted.."});
}