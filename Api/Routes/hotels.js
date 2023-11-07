import express from "express"

import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRoom, updateHotel } from "../controller/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"
// import {createError} from "../utils/error.js"


const router = express.Router()

router.post("/",verifyAdmin, createHotel)

router.put("/:id",verifyAdmin ,updateHotel)

router.delete("/:id",verifyAdmin,deleteHotel)


router.get("/find/:id", getHotel)

router.get("/", getAllHotel)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id", getHotelRoom);


export default router