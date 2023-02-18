const express = require('express');
const { AccountList, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', isLoggedIn, async(req, res, next) => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    try {
        await AccountList.findAll({
            where: {
                date: {[Op.and]: {[Op.contains]: year, [Op.contains]: month}},
                fk_userId1: req.user.id
            },
            order: [['date', 'DESC']]
        });
        res.render('main', { title: '메인 화면' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/input', isLoggedIn, (req, res) => {
    res.render('input', { title: '가계부 입력하기 - Gabojago' }); //title 부분이 무슨 역할인지 잘 모르겠음
})

router.get('/this_month', isLoggedIn, (req, res) => {
    res.render('month_stats', { title: '이번 달 통계 - Gabojago' });
})

router.get('/compare', isLoggedIn, (req, res) => {
    res.render('compare_stats', { title: '비교 통계 - Gabojago' });
})

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - Gabojago' });
})

module.exports = router;