const router = require('express').Router();
const handler = require('../handlers/exerciseHandler');
let User = require('../models/User');

//Generate Workout
router.post('/:id', async (req, res) => {
    console.log(req.body);
    const difficulty = req.body.difficulty;
    const numExercise = req.body.numExercises;
    const workout = handler(difficulty, numExercise);
    console.log(numExercise);
    console.log(difficulty);
    console.log(workout);
    await User.updateOne(
        {providerId: req.params.id},
        {$push: {"workouts":  workout}
    });
    // const temp = await User.findById('638d5e512757864bb4edee95').exec();
    // const temp2 = await User.findOne({providerId: "118096720864814597695"}).exec();
    // console.log(temp2);
    res.send(workout);
});


//Fetch Workouts
router.get('/get/:id', async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({providerId: req.params.id}).exec();
    console.log(user.workouts);
    res.send(user.workouts);
});


module.exports = router;