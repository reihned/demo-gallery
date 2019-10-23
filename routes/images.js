const express = require('express');
const router = express.Router();

const db = require("../models");


/* GET images listing. */
router.get('/', async (req, res, next) => {
    /* validations */
    // TODO

    /* params */
    let where;
    let { page, perPage } = req.query;
    page = page || 1;
    perPage = perPage || 5;
    const offset = (page - 1) * perPage;
    const limit = offset + perPage;

    /* retreive data */
    let response = {}, 
        result = {};
    try {
        response = await db.image.findAndCountAll({
            limit,
            offset,
            where: where, // conditions
        });
        result.data = response.rows;
        result.totalCount = response.count;
        result.page = page;
        result.perPage = perPage;
        result.count = response.rows.length;
    } catch (error) {
        console.error(error);
    }

    /* append page and count */

    /* render */
    res.json(result);
});

module.exports = router;
