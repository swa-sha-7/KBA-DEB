const express = require("express");
const router = express.Router();
const vehicles = require("../models/vehicles");
const verifyToken = require("../middleware/authMiddleware");

router.get("/vehicles",verifyToken, async (req, res) => {
  const details = await vehicles.find({});
  res.json(details);
});

router.get("/vehicles/:id",verifyToken, async (req, res) => {
  const serviceno = req.params.id;
  const details = await vehicles.findOne({ serviceno: serviceno }, { _id: 0 });
  res.json(details);
});

router.post("/vehicles",verifyToken, async (req, res) => {
  try {
    if (req.userType == "admin") {
      const data = req.body;
      const result = await vehicles.create(data);
      res.status(201).json("Added vehicle successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("error while adding data");
  }
});

router.put("/vehicles/:id",verifyToken, async (req, res) => {
  const data = req.body;
  const serviceno = req.params.id;
  try {
    const result = await vehicles.findOneAndUpdate({ serviceno: serviceno }, data);
    if (!result) {
      return res.status(404).send("vehicle not found");
    }
    res.send("vehicle updated successfully");
  } catch (error) {
    res.status(500).send("error updating data");
  }
});

router.delete("/vehicles/:id",verifyToken, async (req, res) => {
  const serviceno = req.params.id;
  try {
    if (req.userType == "admin") {
    const result = await vehicles.findOneAndDelete({ serviceno: serviceno });
    if (!result) {
      return res.status(404).send("vehicle not found");
    }
    res.send("vehicle deleted successfully");
  }
  } catch (error) {
    res.status(500).send("error deleting data");
  }
});

module.exports = router;