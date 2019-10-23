const express = require('express');
const router = express.Router();
const db = require("../models");

const Op = db.Sequelize.Op

/* GET images listing. */
router.get('/', async (req, res, next) => {
    /* validations */
    // TODO

    /* params */
    let where = {};
    let { 
        minWidth, maxWidth,
        minHeight, maxHeight,
        page, perPage, 
    } = req.query;
    page = page || 1;
    perPage = perPage || 5;
    const offset = (page - 1) * perPage;
    const limit = offset + perPage;

    /* width filter */
    if (minWidth && maxWidth) {
        where.width = {
            [Op.between]: [minWidth, maxWidth]
        }
    } else if (minWidth) {
        where.width = {
            [Op.gte]: minWidth
        }
    } else if (maxWidth)   {
        where.width = {
            [Op.lte]: maxWidth
        }
    }

    let response = {}, 
    result = {};
    try {
        /* retreive data */
        response = await db.image.findAndCountAll({
            limit,
            offset,
            where: where, // conditions
        });
        result.data = response.rows;
        
        /* append page and count */
        result.totalCount = response.count;
        result.page = page;
        result.perPage = perPage;
        result.count = response.rows.length;
    } catch (error) {
        console.error(error);
    }


    /* render */
    res.json(result);
});

module.exports = router;
