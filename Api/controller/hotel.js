import Hotel from "../Model/Hotel.js"
export const createHotel=async (req,res,next)=>{
    const newUser = new Hotel(req.body)
    try {

        const savedata = await newUser.save()
        res.status(200).json(savedata)

    } catch (err) {
        next(err)
    }

}

export const updateHotel=async (req,res,next)=>{

    try {
        const updatedata = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedata)

    } catch (err) {
        next(err)
    }

}
export const deleteHotel=async (req,res,next)=>{

    try {
        await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json("Hotel has been deleted")

  } catch (err) {
      next(err)
  }

}
export const getHotel=async (req,res,next)=>{

    try {
        const getdata = await Hotel.findById(req.params.id)
        res.status(200).json(getdata)

    } catch (err) {
        res.status(500).json(err)
    
    }
}

export const getAllHotel=async (req,res,next)=>{
    try {
        const getalldata = await Hotel.find()
        res.status(200).json(getalldata)

    } catch (err) {
       next(err)
    }


}
export const countByCity=async (req,res,next)=>{

    const cities=req.query.cities.split(",")
    try {
             const list =await Promise.all(cities.map(city=>{
                return Hotel.countDocuments({city:city})
             })

             )
        res.status(200).json(list)

    } catch (err) {
       next(err)
    }

}