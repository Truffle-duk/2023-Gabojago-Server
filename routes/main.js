const express = require('express');
const { AccountList, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
});

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', isNotLoggedIn, async(req, res, next) => {
    try {
        await AccountList.findAll({
            include: {
                model: User,
                attributes: ['user_id', 'nickname']
            },
            order: [['date', 'DESC']]
        });
        res.render('main', { title: '메인 화면' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/insert', isLoggedIn, (req, res) => {
    res.render('insert', { title: '가계부 입력하기 - Gabojago' }); //title 부분이 무슨 역할인지 잘 모르겠음
})

router.get('/month_stats', isLoggedIn, (req, res) => {
    res.render('month_stats', { title: '이번 달 통계 - Gabojago' });
})

router.get('/compare_stats', isLoggedIn, (req, res) => {
    res.render('compare_stats', { title: '비교 통계 - Gabojago' });
})

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - Gabojago' });
})

module.exports = router;