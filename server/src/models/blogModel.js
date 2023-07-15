const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({


    title: { type: String },
    description: { type: String, required: true },
    authorId: { type: ObjectId, required: true, ref: "author" },
    picture: { type: String, required: false },
    userName: { type: String, requird: true },
    categories: { type: String, requird: true },
    createDate: { type: String, requird: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: {
        type: Date, require: true, default: Date.now
    },
    publishedAt: { type: Date, require: true, default: Date.now },
}, { timestamps: true });


module.exports = mongoose.model('blog', blogSchema)


module.exports = mongoose.model('blog', blogSchema)