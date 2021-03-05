const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pageSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        content: {
            type: String,
            required: true,
            maxlength: 2000
        },
        keywords: {
            type: Array,
            default: []
        },
        createdBy: {
            type: ObjectId,
            ref: "User"
        }
    }, { timestamps: true })

module.exports = mongoose.model("Pages", pageSchema);