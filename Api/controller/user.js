import User from "../Model/User.js"
export const updateUser=async (req,res,next)=>{

    try {
    const updatedata = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedata)

    } catch (err) {
        next(err)
    }

}
export const deleteUser=async (req,res,next)=>{

    try {
    await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted")

  } catch (err) {
      next(err)
  }

}
export const getUser=async (req,res,next)=>{

    try {
    const getdata = await User.findById(req.params.id)
        res.status(200).json(getdata)

    } catch (err) {
        next(err)
    
    }
}

export const getAllUser=async (req,res,next)=>{
    try {
    const getalldata = await User.find()
        res.status(200).json(getalldata)

    } catch (err) {
       next(err)
    }

}