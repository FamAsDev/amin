const router = require("express").Router()
const bannerCtrl = require("../controllers/bannerCtrl");

router.route("/banner")
    .get(bannerCtrl.getBanner)
    .post(bannerCtrl.createBanner)

router.route("/banner/:id")
    .delete(bannerCtrl.deleteBanner)

module.exports = router;