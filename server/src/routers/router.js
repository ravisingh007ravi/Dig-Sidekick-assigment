const express = require('express');
const router = express.Router();
const { createUsers, getallUsers, login } = require('../controller/usersController');
const { authenticate, authorize } = require("../middleware/usermiddleware");
const { createBlog, getAllBlogsData, getBlogsData, updateBlog, deleteBlog, deleteBlogQuery } = 
require("../controller/blogController");

//<-------------This API used for Create Users----------------------------------------->//
router.post("/registerusers", createUsers);
//<-------------This API used for get all users---------------------------------------->//
router.get("/getallUsers", getallUsers);
//<-------------This API used for login users------------------------------------------>//
router.post("/login", login);
//<--------------------This API used for Create Blogs----------------------------------->//
router.post("/blog",authenticate, createBlog);
//<----------------This API used for Fetch All Blogs of Logged in Author---------------->//
router.get("/allBlogs/:category",authenticate, getAllBlogsData);
//<----------------This API used for Fetch Blogs of Logged in Author------------------->//
router.get("/blogs/:authorId", authenticate, getBlogsData);
//<----------------This API used for Update Blogs of Logged in Author------------------>//
router.put("/blogs/:blogId", authorize, updateBlog);
//<----------------These APIs used for Deleting Blogs---------------------------------->//
router.delete("/blogs/:blogId",  deleteBlog);
//<----------------These APIs used for Deleting Blogs by query of Logged in Author----->//
router.delete("/blogs", authorize, deleteBlogQuery);

router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "Url is not Correct" })
})

module.exports = router;