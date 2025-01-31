const Workout = require("../models/Workouts")
const mongoose = require("mongoose")


const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    const { id }  = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "workout doesnt exist"})
    }

    res.status(200).json(workout)
}

const postWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!reps) {
        emptyFields.push("reps")
    }
    if (!load) {
        emptyFields.push("load")
    }

    if ( emptyFields.length > 0) {
        console.log(emptyFields)
        return res.status(400).json({error: "Please enter all the fields", emptyFields})
    }

    try {
        const workout = await Workout.create({
            title,
            reps, 
            load,
        })
        res.status(200).json(workout)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }

}

const deleteWorkout = async (req, res) => {
    const { id }  = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: "workout doesnt exist"})
    }
    console.log(workout)
    res.status(200).json(workout)
}

const patchWorkout = async (req, res) => {
    const { id }  = req.params
    const  {title, reps, load} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{title, reps, load})

    if (!workout) {
        return res.status(404).json({error: "workout doesnt exist"})
    }

    res.status(200).json(workout)
}

module.exports = { getWorkouts, getWorkout, postWorkout, deleteWorkout, patchWorkout }


