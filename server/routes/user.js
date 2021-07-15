const router = require('express').Router();
const ctruser = require('../controllers/controller');
const dbm = require('../controllers/dbm');
const jwtHelper = require('../controllers/jwtHelper');
const _ = require('lodash');
const User = require('../models/user.model');

// router.post('/forgotPassword', async (req, res) => {
//   try {
//     msg = await dbm.forgetPassword(req.body.email.trim());
//     res.status(200).send(msg);
//   } catch (e) {
//     console.log(e);
//     res.status(404).json({ "email": e });
//   }
// });

// router.post("/resetPassword/:token", async (req, res) => {
//   try {
//     msg = await dbm.resetPassword(
//       req.params.token.trim(),
//       req.body.newPassword.trim()
//     );
//     res.status(200).send(msg);
//   } catch (e) {
//     console.log(e);
//     res.status(400).json({ "password": e });
//   }
// });

router.get('/checkstatus', jwtHelper.verifyjwtoken, (req, res) => {
  res.status(200).json({ user: req._user });
});

router.post('/login', ctruser.authenticate)

router.get('/logout', jwtHelper.verifyjwtoken, (req, res) => {
  dbm.blaclist_Tokens(req.iat, req.cookies.token);
  res.cookie("token", null, {
    maxAge: 1,
    secure: 'false',
    sameSite: 'none',
    httpOnly: 'true',
  });
  res.status(200).json({ "message": "logged out" });
});

// router.put('/changerole/:id', jwtHelper.verifyjwtoken, (req, res) => {
//   if (typeof req._user === "undefined" || req._user.role !== 'Admin') {
//     return  res.status(401).send();
//   }
//   var id = req.params.id;
//   var role = req.body.role;
//   User.findByIdAndUpdate(id, {
//     role: role
//   }, (err, docs) => {
//     if (err) {
//       res.status(500).send();
//     }
//     else {
//       res.status(200).send(`${docs.first_name + " " + docs.last_name}'s role changed to ${role}`);
//     }
//   });
// });

// router.delete('/delete', jwtHelper.verifyjwtoken, async (req, res) => {
//   if (typeof req._user === "undefined" || req._user.role !== 'Admin') {
//     return res.status(401).send();
//   }
//   var usersId = req.body.users;
//   if (typeof usersId === 'undefined' || usersId.length == 0) {
//     return res.status(403).send("users are missing");
//   }
//   try {
//     user = await dbm.DeleteById(User, usersId);
//     res.status(200).send(user.deletedCount + " users deleted");
//   } catch (error) {
//     res.status(500).send();
//   }
// });

router.post('/', async (req, res) => {
  /* if (typeof req._user === "undefined" || req._user.role !== 'Admin') {
    return  res.status(401).send();
  } */
  const { first_name, last_name, email, role, password, hub, branch, region } = req.body;
  if (typeof req.body == 'undefined' || typeof first_name === 'undefined' || typeof last_name === 'undefined' || typeof password === "undefined" || typeof email === 'undefined' || typeof hub === 'undefined' || typeof branch === 'undefined'
    || first_name === '' || last_name === '' || email === '' || role==='' || hub === '' || branch === '' || password === '') {
      return res.status(403).json({ "newuser": "please provide all the information" });
  }
  try {
    users = await dbm.addNewUserToDatabase(req.body);
    res.status(200).send({ "users": "users inserted successfully" });
  } catch (error) {
    console.log(error);
    if (typeof error.keyValue !== 'undefined') {
      return  res.status(500).send({ "error": `${error.keyValue.email} allready exists` });
    }
    res.status(500).send();
  }
});


module.exports = router;