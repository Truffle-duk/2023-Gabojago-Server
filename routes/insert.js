const express = require('express');
const db = require('../models');
const { AccountList } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/input', isLoggedIn, async(req, res, next) => {
    try {
        await AccountList.create({
            category: req.body.category,
            content: req.body.content,
            amount: req.body.amount,
            date: req.body.date,
            memo: req.body.url,
            fk_userId: req.user.id //여기 어케 처리하묘
        });
        return res.redirect('/insert');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;