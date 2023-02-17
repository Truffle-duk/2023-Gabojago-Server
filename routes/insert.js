const express = require('express');
const db = require('../models');
const { AccountList } = require('../models');
const { isLoggenIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/:id', isLoggedIn, async(req, res, next) => {
    try {
        await AccountList.create({
            category: req.body.category,
            content: req.body.content,
            amount: req.body.amount,
            date: req.body.date,
            memo: req.body.url,
            fk_userId: req.user.id
        });
        return res.redirect('/insert');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;