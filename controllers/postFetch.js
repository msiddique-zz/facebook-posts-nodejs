var fs = require('fs')
request = require('request');
const graph = require('fbgraph');
const sequelize = require('sequelize')
var fs = require('fs');
var async = require("async");
const db = require('../config/db.config');
const Post = db.post;
var root = require('root');
const { clearCache } = require('ejs');
const { Promise } = require('mongoose');
const e = require('express');
http = require('http'),
    https = require('https');

var Stream = require('stream').Transform
const postFetch = () => {

    var k = 0
    graph.get("me/posts?fields=full_picture,message", function (err, response) {

        var download = async function (uri, filename, callback) {
            await request.head(uri, function (err, res, body) {

                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);
                request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
                    callback()
                });
            });
        };

        for (var i = 0; i < response.data.length - 1; i++) {
            let bucketRegex = new RegExp("^([^?]+)")
            var postName;
            var postType = ''
            var postNameS = ''
            if (response.data[i].full_picture) {
                let result = response.data[i].full_picture.match(bucketRegex)[0]
                for (var j = result.length - 1; j >= 0; j--) {
                    if (result[j] === '/') {
                        postName = result.substring(j + 1);
                        j = -1;
                    }
                }
                for (var j = postName.length - 1; j >= 0; j--) {
                    if (postName[j] === '.') {
                        postType = postName.substring(j + 1, postName.length - 1);
                        postNameS = postName.substring(0, j)
                        j = -1;
                    }
                }
                download(response.data[i].full_picture, postName, async function () {
                    if (global.__basedir + '/' + postNameS + '.png') {


                        // var imageData = fs.readFileSync(global.__basedir + '/' + postName);
                        Post.create({

                            message: response.data[i].message,
                            post_id: response.data[i].id,
                            link: global.__basedir + '/' + postNameS + '.png'

                        }).then(image => {
                            try {
                                fs.writeFileSync(__dirname + '/' + postName, image.data);
                                // exit node.js app
                                process.exit(0);
                            } catch (e) {
                                //console.log(e);
                            }
                        })
                    }
                })
            }
        }
    })
    //graph function ends here


}
module.exports = postFetch