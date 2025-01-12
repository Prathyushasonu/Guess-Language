var express = require('express');
var router = express.Router();
const path  = require('path');

/* GET home page. */
const publicRootConfig = {root: path.join(__dirname, '../public')}

router.get('/', (req, res)=> {
  if(!req.session.user){
    return res.redirect('login');
  }
  res.sendFile('/index.html', publicRootConfig);
});

router.get('/login', (req, res)=> {
  if(req.session.user){
    return res.redirect('/');
  }
  res.sendFile('login.html', publicRootConfig);
});

router.get('/register', (req, res)=> {
  if(req.session.user){
    return res.redirect('/');
  }
  res.sendFile('register.html', publicRootConfig);
});

router.get('/scores/leaderboard', (req,res)=>{
  if(!req.session.user){
    return res.redirect('/');
  }
  res.sendFile('leaderboard.html', publicRootConfig);
})

module.exports = router;
