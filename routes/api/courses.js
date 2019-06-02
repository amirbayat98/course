const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();
const Video = require('../../models/video');
const Course = require('../../models/course');


router.get('/', async (req, res)=> {
    try{
        const courses = await Course.find().sort({date:-1});
        res.json(courses);
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/', [
        check('name', 'Name is required').not().isEmpty()
    ],
    async (req, res)=> {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            const {videos, name, lenght, volume} = req.body;
            let course = await Course.findOne({name});
            if(course){
                return res.status(400).json({errors : [{msg: 'course already exist'}]});
            }
            course = new Course({
               videos,
               name,
               lenght,
               volume
            });
            await course.save();
            res.send(course);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    });


module.exports = router;
