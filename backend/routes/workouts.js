const express = require("express")
const { postWorkout, deleteWorkout, patchWorkout, getWorkouts, getWorkout } = require("../controllers/workoutController")
const router = express.Router()

router.get('/', (req, res) => getWorkouts(req, res))

router.get('/:id', (req, res) => getWorkout(req, res))

router.post('/', (req, res) => postWorkout(req, res))

router.delete('/:id', (req, res) => deleteWorkout(req, res))

router.patch('/:id', (req, res) => patchWorkout(req, res))


module.exports = router