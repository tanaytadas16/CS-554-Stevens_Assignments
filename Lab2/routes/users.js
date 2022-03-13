const redis = require('redis');
const express = require('express');
const router = express.Router();
const userdata = require('../data');
const port = process.env.PORT || 6379;
const client = redis.createClient(port);

(async () => {
    await client.connect();
})();

router.get('/history', async (req, res) => {
    let checkHistory = await client.lRange('Visitors', 0, 19);
    if (!checkHistory) return res.json([]);
    return res.json(checkHistory);
});
router.get('/:id(\\d+)/', async (req, res) => {
    const validatedId = validateId(req.params.id);
    const checkuserExist = await client.get(validatedId);
    if (!checkuserExist) {
        try {
            const users = await userdata.getById(validatedId);

            await client.lPush('Visitors', JSON.stringify(users));
            await client.set(validatedId, JSON.stringify(users));
            return res.send(users);
        } catch (e) {
            res.json(e);
        }
    } else {
        await client.lPush('Visitors', checkuserExist);
        res.json(JSON.parse(checkuserExist));
    }
});

/*****************************************************************************************/
//Error Handling
const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
const validateId = (UserId) => {
    isArgumentString(UserId, 'id');
    isStringEmpty(UserId, 'id');
    return UserId.trim();
};
const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throw [
            400,
            `Empty string passed for ${variableName || 'provided variable'}.`,
        ];
    }
};

const isArgumentString = (str, variableName) => {
    if (typeof str !== 'string') {
        throw [
            400,
            `Invalid argument passed for ${
                variableName || 'provided variable'
            }. Expected string.`,
        ];
    }
};
module.exports = router;
