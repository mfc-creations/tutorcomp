const Validator = require("validator");
const Enquiry = require("../models/Enquiry");

exports.enquiryCheck = async (req, res) => {
  try {
    let error = "";
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!Validator.isEmail(req.body.email)) {
      error = "A team member will call you soon";
    } else if (!regex.test(req.body.phone)) {
      error = "A team member will call you soon";
    }
    const newEnquiry = new Enquiry({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      genuine: Validator.isEmpty(error),
    });
    if (Validator.isEmpty(error)) {
      const enq = await newEnquiry.save();
      res.status(200).json({
        success: true,
        data: { msg: "A team member will call you in 10 minutes", user: enq },
      });
    } else {
      throw error;
    }
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

exports.checkFree = async (req, res) => {
  try {
    if (!req.body.data.genuine) {
      throw { msg: "A team member will call you soon" };
    }
    if (req.body.text.toLowerCase().includes("free")) {
      const enq = await Enquiry.findByIdAndUpdate(
        req.body.data._id,
        { genuine: false },
        { new: true }
      );
      throw { user: enq, msg: "A team member will call you soon" };
    } else {
      res.status(200).json({
        success: true,
        msg: "A team member will call you in 10 minutes",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};
