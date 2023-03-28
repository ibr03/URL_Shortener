const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const config = require('config');

const Url = require('../models/Url');

// @routes POST /api/url
// @desc   Create short URL
router.post('/', async (req, res) => {
    const longUrl = req.body.url;
    const baseUrl = config.get('baseURL');

    // Check base URL
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    // Create URL code
    const urlCode = nanoid(10);

    // Check long URL
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.render('index', { url : url }); 
                // res.json({ shortUrl: url.shortUrl });
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.render('index', { url : url });  
                // res.json({ shortUrl: url.shortUrl });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long URL');
    }
});

module.exports = router;