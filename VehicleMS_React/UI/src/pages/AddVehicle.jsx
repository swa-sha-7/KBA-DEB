import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'


{
  //  courses.js = vehicles.js
  //  courseSchema = vehicleSchema
  //  courses = vehicles
  //  courses = vehicledetails = vehicles
  //  VehicleMS = VehicleMS001
  
  //  courseId: serviceno
  //  title: vehicleno
  //  type: vehicletype : type
  //  description: ownername
  //  price: givendate
  //  price: endtime
}

const AddVehicle = () => {
  const [vehicleno,setVehicleno] = useState('');
  const [serviceno, setServiceno] = useState('');
  const [type,setType] = useState('Car');
  const [ownername, setOwnername] = useState('');
  const [givendate,setGivendate] = useState('');
  const [endtime,setEndtime] = useState('');
  
  const navigate = useNavigate();
  
  const submitForm = async (e) => {
    e.preventDefault();

    const newVehicle = {
      vehicleno,
      serviceno,
      type,
      ownername,
      givendate,
      endtime,
    }
    try{
      const res = await fetch('/api/vehicles',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newVehicle),
      });
      if(res.ok){
        navigate('/vehicles');
      }else{
        console.log('Failed to add vehicle');
      }
    } catch(error){
      console.log('Error adding vehicle');
    }
  };
  
 

  return (
   
    <section className="bg-white mb-20">
    <div className="container m-auto max-w-2xl py-2">
      <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        
        <form onSubmit={submitForm}>
          <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
            Add Vehicle
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleno"
              name="vehicleno"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. XXYY1122"
              required
              value={vehicleno}
              onChange={(e)=> setVehicleno(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Service Number
            </label>
            <input
              type="text"
              id="serviceno"
              name="serviceno"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. 112233"
              required
              value={serviceno}
              onChange={(e) => setServiceno(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Vehicle Type
            </label>
            <select
              id="type"
              name="type"
              className="border rounded w-full py-2 px-3"
              required
              value={type}
              onChange={(e)=> setType(e.target.value)}
            
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Lorry">Lorry</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="ownername"
              className="block text-gray-700 font-bold mb-2"
            >
              Owner Name
            </label>
            <input
              type="text"
              id="ownername"
              name="ownername"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter name of vehicle owner"
              required
              value={ownername}
              onChange={(e) => setOwnername(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Given Date
            </label>
            <input
              type="text"
              id="givendate"
              name="givendate"
              className="border rounded w-full py-2 px-3"
              required
              value={givendate}
              onChange={(e) => setGivendate(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              End Time
            </label>
            <input
              type="text"
              id="endtime"
              name="endtime"
              className="border rounded w-full py-2 px-3"
              required
              value={endtime}
              onChange={(e) => setEndtime(e.target.value)}
              
            />
          </div>

          <div>
            <button
              className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
   
  )
}

export default AddVehicle