import Hotel from "../Model/Hotel.js"
import Room from "../Model/Room.js"
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

export const getAllHotel = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
  
    try {
      // Create a query object to filter based on 'cheapestPrice' and other conditions
      const query = { ...others };
  
      // Add the 'cheapestPrice' condition if 'min' and 'max' are provided in the query
      if (min !== undefined || max !== undefined) {
        query.cheapestPrice = {};
  
        if (min !== undefined) {
          query.cheapestPrice.$gt = parseInt(min);
        }
  
        if (max !== undefined) {
          query.cheapestPrice.$lt = parseInt(max);
        }
      }
  
      // Perform the query with the 'limit' parameter
      const hotels = await Hotel.find(query).limit(parseInt(limit));
  
    //   console.log('Query:', query);
    //   console.log('Number of results:', hotels.length);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
  
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
export const countByType=async (req,res,next)=>{

   const hotelCount=await Hotel.countDocuments({type:"hotel"})
   const apartmentCount=await Hotel.countDocuments({type:"apartment"})
   const resortCount=await Hotel.countDocuments({type:"resort"})
   const villaCount=await Hotel.countDocuments({type:"villa"})
   const cabinCount=await Hotel.countDocuments({type:"cabin"})

    try {
           

             
        res.status(200).json(
            [
                {type:"hotel",count:hotelCount},
                {type:"apartment",count:apartmentCount},
                {type:"resort",count:resortCount},
                {type:"villa",count:villaCount},
                {type:"cabin",count:cabinCount}
            ]
        )

    } catch (err) {
       next(err)
    }

}


export const getHotelRoom = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };