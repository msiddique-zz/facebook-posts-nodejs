const graph = require('fbgraph');

const Authenticate = (req, res) => {

    console.log('-------------------console--------------', process.env.HOST)
    // we don't have a code yet
    // so we'll redirect to the oauth dialog
    if (!req.query.code) {
        console.log("Performing oauth for some user right now.");

        var authUrl = graph.getOauthUrl({
            "client_id": process.env.CLIENT_ID
            , "redirect_uri": process.env.REDIRECT_URI
            , "scope": process.env.SCOPE
        });

        if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
            res.redirect(authUrl);
        } else {  //req.query.error == 'access_denied'
            res.send('access denied');
        }
    }
    // If this branch executes user is already being redirected back with 
    // code (whatever that is)
    else {
        console.log("Oauth successful, the code (whatever it is) is: ", req.query.code);
        // code is set
        // we'll send that and get the access token
        graph.authorize({
            client_id: process.env.CLIENT_ID
            , redirect_uri: process.env.REDIRECT_URI
            , client_secret: process.env.CLIENT_SECRET
            , code: req.query.code
        }, function (err, facebookRes) {
            res.redirect('/UserHasLoggedIn');
        });
    }

}

module.exports = Authenticate