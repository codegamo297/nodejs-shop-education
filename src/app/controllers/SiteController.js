
const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then( courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next)

            // Cách viết khác
            /* .catch( error => {
                res.status(400).json({ error: 'Error!' })
            })*/

    }

    // [GET] /search
    search(req, res, next) {
        res.render('search');
    }
}

module.exports = new SiteController;