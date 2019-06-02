const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();
const Video = require('../../models/video');
const Course = require('../../models/course');
const mongoose = require('mongoose');


router.get('/', async (req, res)=> {
    try{
        const courses = await Course.find().sort({date:-1});
        res.json(courses);
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('picture', 'picture is required').not().isEmpty()
    ],
    async (req, res)=> {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            const {videos, name, length, volume, picture} = req.body;
            let course = await Course.findOne({name});
            if(course){
                return res.status(400).json({errors : [{msg: 'course already exist'}]});
            }
            course = new Course({
               videos,
               name,
               length,
               volume,
               picture
            });
            await course.save();
            res.send(course);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    });

router.get('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const course = await Course.findOne({name});
        const video_Ids = course.videos;
        console.log(video_Ids);
        // let videos = [];
        // video_Ids.forEach( async  video_ID => {
        //     let id = mongoose.Types.ObjectId(video_ID.toString());
        //     const video = await Video.findById(id);
        //     videos.push(video);
        // });
        // console.log(videos);
        // res.json(videos);
        // for(let i= 0; i < video_Ids.length; i++){
        //     video_Ids[i] = mongoose.Types.ObjectId(video_Ids[i].toString());
        //     console.log(mongoose.Types.ObjectId.isValid(video_Ids[i]));
        // }
        let videos = await Video.find({'_id' :video_Ids});
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;
