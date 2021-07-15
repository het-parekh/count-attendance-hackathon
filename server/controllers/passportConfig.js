const passport = require('passport');
const localStratergy = require('passport-local').Strategy;
const User = require('../models/user.model');
const bcrypt = require("bcrypt")
passport.use(
	new localStratergy({
		usernameField: 'email'
	},
		function (email, password, done) {
			User.findOne({ email: email }, function (err, user) {
				if (err) return done(err)
				if (!user) return done(null, false, { email: "email does not exist", password: "" })
				bcrypt.compare(password, user.password, function (err, result) {
					if (result) return done(null, user);
					else return done(null, false, { email: "", password: "incorrect password" });
				});
			})
		})
);