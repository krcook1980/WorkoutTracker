const router = require("express").Router();
const db = require("../models");



//get last workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(lastWorkout => {
       
        res.json(lastWorkout)
    }).catch(err => {
        res.status(400).json(err);
      });
})

//add exercises to most recent workout
router.post("/api/workouts/:id", (req, res) => {
    db.Workout.update(
        {
            id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {
//I don't know what goes in here... exercises: { body?}
            }
        }
    )
})

//new workout plan
router.post("api/workouts", ({data}, res) => {
    db.Workout.create(data)
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

//add exercises to new workout plan

//stats view weight of multiple exercises from past 7
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
    .sort({_id: -1})
    .limit(7)
    .then(weightRange => {
        res.json(weightRange)
    })
    .catch(err => {
        res.status(400).json(err);
      });
})
//stats view total duration of each workout from past 7

module.exports = router;