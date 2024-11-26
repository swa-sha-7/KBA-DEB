const {Schema} =require('mongoose');
const {model} =require('mongoose');

const vehicleSchema = new Schema({
   serviceno: { type: String, required: true },
   vehicleno: { type: String, required: true },
   type: { type: String, required: true },
   ownername: { type: String, required: true },
   givendate: {type: String, required: true},
   endtime: {type: String, required: true}
});

const vehicles = model('vehicles', vehicleSchema);

module.exports = vehicles;