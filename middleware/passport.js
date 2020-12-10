const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    // I do 2 validations: I chek i the user exists, if yes I compare the passwords,
    // if they're equal i return true else I return false
    const userAuthenticated = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (userAuthenticated) return done(null, user);
    else return done(null, false);

    // 3. Else throw an error
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    // if the token is expired, throw a 401 error
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
