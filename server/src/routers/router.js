const express = require('express');
const router = express.Router();
const { createUsers, getallUsers } = require('../controller/usersController')

//<-------------This API used for Create Users----------------------------------------->//
router.post("/registerusers", createUsers);
//<-------------This API used for get all users---------------------------------------->//
router.get("/getallUsers", getallUsers);


router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "Url is not Correct" })
})

module.exports = router;