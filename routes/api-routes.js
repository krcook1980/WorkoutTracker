const router = require("express").Router();
const Workout = require("../models");
const { db } = require("../models/workout");



//get last workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .sort({day: -1})
    .then(workouts => {
        res.json(workouts)
    }).catch(err => {
        res.status(400).json(err);
      });
})

//add exercises to most recent workout
router.post("/api/workouts/:id", (req, res) => {
    db.Workout.uptate(
        {
            id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {
                
            }
        }
    )
})

//new workout plan


//add exercises to new workout plan

//stats view weight of multiple exercises from past 7

//stats view total duration of each workout from past 7

module.exports = router;