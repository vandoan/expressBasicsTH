'use strict';

var express = require('express'),
 	posts 	= require('./mock/posts.json');

// app.use('/static', express.static(__dirname + '/public'));
// middleware

var postsLists = Object.keys(posts).map(function(value){
	return posts[value];
});


var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	var path = req.path;
	res.locals.path = path;
	// another way of doing it
	// res.render('index', { path: path });
	res.render('index');
});

// app.get('/', function(req,res){
// 	res.send("<h1>i luv bananas.</h1>");
// });

app.get('/blog/:title?', function(req,res){
	// ? indicates optional
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blog', { posts: postsLists });
	} else { 
		var post = posts[title] || {};
		// use \\ for default empty object
 		//res.send(post);
 		res.render('post', {post: post});
 	}
});

app.get('/posts', function(req, res) {
	if (req.query.raw){
		res.json(posts);
	} else {
		res.json(postsLists);
	}
});

app.listen(3000, function(){
	console.log("The frontend server is running on port 3000!")
});