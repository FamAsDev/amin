const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    banner_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    banner: {
        type: Object,
        required: true
    }
}, {
    timestamps: true // important for sorting and paginating and filtering
});

module.exports = mongoose.model("Banners", bannerSchema);