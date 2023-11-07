import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
const Reserve = ({setOpen,hotelid}) => {
  const { data, loading, error } = useFetch(`/hotel/room/${hotelid}`);
  return (
    
    <div className="reserve">
        <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
          
        />
              <span>Select your rooms:</span>


  {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
            {item.Price}
              </div>
              {/* <div className='room'>
                {item.roomNumbers.map(roomNumber=>(
                ))}
                </div> */}
         </div>
         </div>
          
        ))}
        </div>
        </div>
  )
}

export default Reserve