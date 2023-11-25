const express = require("express");
const router = express.Router();
const {getCylinders, 
    getCylinderById, 
    postCylinders, 
    putCylinders, 
    deleteCylinders} = 
    require("../controllers/cylinderController");

router.route("/").get(getCylinders);
router.route("/:id").get(getCylinderById);
router.route("/").post(postCylinders);
router.route("/:id").put(putCylinders);
router.route("/:id").delete(deleteCylinders);

module.exports = router
