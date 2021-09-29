const graph = require('fbgraph');
const sequelize = require('sequelize')
const db = require('../config/db.config.js');
const User = db.user

var posts = []

const LoggedIn = (req, res) => {

    graph.get("me?fields=id,gender,name,posts", async function (err, res) {
        posts = res.posts
        var user = { Name: 'anonymous', gender: '', fb_id: '1' }
        var Post = { message: '', uid: '9' }
        user.Name = res.name;
        user.gender = res.gender
        user.fb_id = res.id

        await User.create(user).then(() => {
            process.exit(0);
        })

    })
    res.redirect('/postFetch')
}
module.exports = LoggedIn