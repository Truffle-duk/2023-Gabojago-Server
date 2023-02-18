const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

//나중에 지우기
const nunjucks = require('nunjucks');

dotenv.config();
const db = require('./models');
const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const insertRouter = require('./routes/insert')
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT||3002);

//나중에 지우기
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/input', insertRouter);

//에러처리 미들웨어 연결

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});