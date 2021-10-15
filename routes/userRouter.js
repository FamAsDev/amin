const router = require("express").Router();
const { addCart } = require("../controllers/userCtrl");
const userCtrl = require("../controllers/userCtrl")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

// router.post("/profile", userCtrl.userInformation);

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", auth, userCtrl.getUser);

router.patch("/addcart", auth , addCart)

router.get("/history", auth, userCtrl.history);

router.route("/user/:id")
    .put(auth, authAdmin, userCtrl.updateUser)


module.exports = router