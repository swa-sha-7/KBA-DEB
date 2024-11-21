import { Router } from "express";
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const adminroute=Router();
const secretkey=process.env.secretkey;

const VehicleSchema = new mongoose.Schema(
    {
        serviceno:{type:Number,unique:true},
        vehicleno:Number,
        vehicletype:String
    }
)
const ServiceSchema = new mongoose.Schema(
    {
        ownername:{type:String,unique:true},
        givendate:String,
        endtime:String
    }
)
const vehicle=mongoose.model(`vehicledetails`,VehicleSchema)
const service=mongoose.model(`servicedetails`,ServiceSchema)
mongoose.connect('mongodb://localhost:27017/VehicleMS')

//add vehicle
adminroute.post('/addvehicle',authenticate,async(req,res)=>{
    const {serviceno,vehicleno,vehicletype}=req.body;
    const {ownername,givendate,endtime}=req.body;

    const existingvehicle = await vehicle.findOne({serviceno:serviceno})
    if (existingvehicle){
        res.status(201).json("The vehicle is already added");
    }
    else{
        const newVehicle = new vehicle({
            serviceno:serviceno,
            vehicleno:vehicleno,
            vehicletype:vehicletype
        })
        await newVehicle.save()
        res.status(200).json("Vehicle added successfully.");

        const existingservice = await service.findOne({ownername:ownername})
        if (existingservice){ 
            res.status(201).json("The service is already added");
        }
        else{
            const newService = new service({
                ownername:ownername,
                givendate:givendate,
                endtime:endtime
            })
            await newService.save()
            res.status(200).json("Service added successfully.");
        }
    }
});

// view vehicle
adminroute.get('/viewvehicle',async(req,res)=>{
    const {vehicletype}=req.body;
    const findvehicle = await vehicle.find()
    const findservice = await service.find()

    if(findvehicle.length>0)
    {
        res.status(200).json(findvehicle);

        if(findservice.length>0)
        {
            if(vehicletype=='car'){
                res.status(200).json(findservice);
            }
            else if(vehicletype=='bike'){
                res.status(200).json(findservice);
            }
            else if(vehicletype=='lorry'){
                res.status(200).json(findservice);
            }
            else{
                res.status(404).json({Message:'there is no service added yet !'});
            }
        }
    }
    else{
        res.status(404).json({Message:'there is no vehicle added yet !'});
    }
});
export{adminroute};