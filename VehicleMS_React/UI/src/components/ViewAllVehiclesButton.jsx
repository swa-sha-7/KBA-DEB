import React from 'react'
import {Link} from 'react-router-dom'

const ViewAllVehiclesButton = () => {
  return (
    <div className='flex justify-center mb-40'>
    <Link 
      to="/vehicles" 
      className='w-80 h-10 rounded-full bg-purple-500 text-white font-medium  hover:bg-purple-600' >
        View all Vehicles
    </Link>
    </div>
  )
}

export default ViewAllVehiclesButton