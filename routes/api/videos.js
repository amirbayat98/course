const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();
const Video = require('../../models/video');

router.get("/:id", async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) {
            return res.status(404).json({ msg: 'video not found' });
        }
        res.json(video);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/",[
    check('name', 'Name is required').not().isEmpty(),
    check('link', 'Link is required').not().isEmpty(),
    check('length', 'length is required').not().isEmpty(),
    check('volume', 'volume is required').not().isEmpty(),
    check('picture', 'picture is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name, link, subtitle,tags, length, volume, picture} = req.body;
        try {
            let video = await Video.findOne({link});
            if(video){
                return res.status(400).json({errors : [{msg: 'video already exist'}]});
            }
            video = new Video ({
                name,
                link,
                subtitle,
                tags,
                length,
                volume,
                picture
            });
            await video.save();
            res.send(video);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
});


module.exports = router;