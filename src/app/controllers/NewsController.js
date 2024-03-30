
class NewsController {

    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res, next) {
        res.send('NEWS DETAIL!');
    }
}

module.exports = new NewsController;