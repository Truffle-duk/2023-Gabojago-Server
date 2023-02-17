const query = {
    INSERT_NEW: `INSERT INTO gabojago.accountlist (categoty, content, amount, date, memo) VALUES(?,?,?,?,?)`,
    READ_INCOME: `SELECT SUM(amount) FROM gabojago.accountlist 
        WHERE fk_userId=? AND year(date)=? AND month(date)=? AND amount>0`,
    READ_OUTCOME: `SELECT SUM(amount) FROM gabojago.accountlist
        WHERE fk_userId=? AND year(date)=? AND month(date)=? AND amount<0;`,
    READ_MOST_OUT: `SELECT category, SUM(amount) FROM gabojago.accountlist 
        WHERE fk_userId=? and year(date)=? and month(date)=? 
        GROUP BY category ORDER BY SUM(amount) DESC
        LIMIT 1`,
    READ_MOST_FREQUENT: `SELECT category, count(category) FROM gabojago.accountlist 
        WHERE fk_userId=? and year(date)=? and month(date)=?
        GROUP BY category LIMIT 1`
};

export default query;