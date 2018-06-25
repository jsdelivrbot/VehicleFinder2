var express = require('express');
var router = express.Router();

//pg config
var pg = require('pg');
var conString = 'postgres://jmjpstzyyzexxe:127c8c9e3b14656d5e45ae9fc2904a79c958c74612e63fdb5384d3986fe743ff@ec2-54-225-76-243.compute-1.amazonaws.com:5432/dbcd7ut9b6om9r';

//Users
//get all users
router.get('/users', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM type', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//post user
router.post('/users', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO users(username, password) VALUES($1, $2) returning id', [req.body.username, req.body.password], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//get one user
router.get('/users/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM users WHERE id = $1', [req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// update user
router.put('/users/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    client.query('UPDATE users SET username = $2, password = $3  WHERE id = $1', [req.params.id, req.body.username, req.body.password], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one user
router.delete('/users/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM users WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//-------------
//Posts
//get all posts
router.get('/posts', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM posts', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//post one post
router.post('/posts', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO posts(user_id, content) VALUES($1, $2) returning id', [req.body.user_id, req.body.content], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//get one post
router.get('/posts/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM posts WHERE id = $1', [req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// update one post
router.put('/posts/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('UPDATE posts SET user_id = $2, content = $3  WHERE id = $1', [req.params.id, req.body.user_id, req.body.content], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one post
router.delete('/posts/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM posts WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

module.exports = router;
