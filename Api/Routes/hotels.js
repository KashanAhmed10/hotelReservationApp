import express from "express"
import Hotel from "../Model/Hotel.js"
import { countByCity, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controller/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"
// import {createError} from "../utils/error.js"


const router = express.Router()

router.post("/",verifyAdmin, createHotel)

router.put("/:id",verifyAdmin ,updateHotel)

router.delete("/:id",verifyAdmin,deleteHotel)


router.get("/find/:id", getHotel)

router.get("/", getAllHotel)
router.get("/countByCity",countByCity)
// router.get("/countByType",getHotels)


export default router