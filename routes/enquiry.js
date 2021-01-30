const express = require("express");
const router = express.Router();

const { enquiryCheck, checkFree } = require("../controllers/enquiry");

router.route("/data").post(enquiryCheck);
router.route("/check-free").post(checkFree);

module.exports = router;
