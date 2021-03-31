const router = require("express").Router();
const UserController = require("../controllers/UserController");
const Auth = require("../middlewares/AuthMiddleware");

router.post("/login", UserController.login);
router.post("/registration", UserController.registration);
router.get("/logout", Auth, UserController.logout);
router.get("/dashboard", Auth, (req, res) => {
   res.status(200).json({
       message: "Welcome to dashboard"
   });
});

module.exports = router;