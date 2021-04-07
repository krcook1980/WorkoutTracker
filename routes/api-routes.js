const router = require("express").Router();
const Workout = require("../models/workout");

//get last workout
router.get('/api/workouts', (req, res) => {
    Workout.find({})
})