const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models').User;

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'user_id',
        passwordField: 'password'
    }, async (user_id, password, done) => {
        try {
            const exUser = await User.findOne({ where: {user_id}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호가 옳지 않습니다.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch(err) {
            console.error(err);
            done(err);
        }
    }));
};