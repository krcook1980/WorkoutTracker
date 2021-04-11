const router = require("express").Router();
const { json } = require("express");
const db = require("../models");



//get last workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(lastWorkout => {
            let totalDuration = 0;
            lastWorkout.forEach(workout => {
                totalDuration += workout.exercises.duration
                })
          
            res.json(lastWorkout)
        }).catch(err => {
            res.status(400).json(err);
        });
})

//add exercises to most recent workout
router.put("/api/workouts/:id", (req, res) => {
    console.log("What is my id " + JSON.stringify(req.params.id))

    db.Workout.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $push: { exercises: req.body },
            $inc: { totalDuration: req.body.duration }
        },

    )
        .catch(err => {
            res.json(err);
        });
})

//new workout plan
router.post("api/workouts", ({ data }, res) => {
    console.log("New guy " + JSON.stringify(data))
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
        .sort({ _id: -1 })
        .limit(7)
        .then(workoutRange => {
            res.json(workoutRange)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

module.exports = router;