import Hotel from "../Model/Hotel.js"
import Room from "../Model/Room.js"
import { createError } from "../utils/error.js"
export const createRoom=async (req,res,next)=>{

    const hotelId=req.params.hotelid
    const newRoom = new Room(req.body)
    try {
        const savedata = await newRoom.save()
        try {
            
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedata._id}})

        } catch (error) {
            next(err)
        }

        res.status(200).json(savedata)

    } catch (err) {
        next(err)
    }

}

export const updateRoom=async (req,res,next)=>{

    try {
        const updatedata = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedata)

    } catch (err) {
        next(err)
    }

}
export const deleteRoom=async (req,res,next)=>{
    const hotelId=req.params.hotelid

    try {
        await Room.findByIdAndDelete(req.params.id)

        try {
            
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})

        } catch (error) {
            next(err)
        }
      res.status(200).json("Hotel has been deleted")

  } catch (err) {
      next(err)
  }

}
export const getRoom=async (req,res,next)=>{

    try {
        const getdata = await Hotel.findById(req.params.id)
        res.status(200).json(getdata)

    } catch (err) {
        req.status(500).json(err)
    
    }
}

export const getAllRoom=async (req,res,next)=>{
    try {
        const getalldata = await Hotel.find()
        res.status(200).json(getalldata)

    } catch (err) {
       next(err)
    }

}