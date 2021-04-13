const router = require("express").Router();
const { json } = require("express");
const db = require("../models");



//get last workout
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
               totalDuration: {$sum: "$exercises.duration"},
               totalDistance: {$sum: "$exercises.distance"},
               totalSets: {$sum: "$exercises.sets"},
               totalReps: {$sum: "$exercises.reps"},
               totalWeight: {$sum: "$exercises.weight"}
            }  
        }
    ])
    .limit(7)
        .then(lastWorkout => {
            res.json(lastWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

//add exercises to most recent workout
router.put("/api/workouts/:id", (req, res) => {
     db.Workout.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $push: { exercises: req.body },
            $inc: { totalDuration: req.body.duration }
        },

    ).then(dbWorkout => {
        res.json(dbWorkout)
       })
        .catch(err => {
            res.json(err);
        });
})

//new workout plan
router.post("/api/workouts", ({ data }, res) => {
    
    db.Workout.create(data)
        .then(dbWorkout => {
         res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

//stats view weight of multiple exercises from past 7
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
               totalDuration: {$sum: "$exercises.duration"},
               totalDistance: {$sum: "$exercises.distance"},
               totalSets: {$sum: "$exercises.sets"},
               totalReps: {$sum: "$exercises.reps"},
               totalWeight: {$sum: "$exercises.weight"}
            }  
        }
    ])
        .then(workoutRange => {
           res.json(workoutRange)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

module.exports = router;