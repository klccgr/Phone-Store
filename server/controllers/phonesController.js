const Phone = require("../models/phoneModel");
const asyncHandler = require("express-async-handler");

const getPhones = asyncHandler(async (req, res) => {
  const phones = await Phone.find({ user: req.user._id });
  res.json(phones);
});
const createPhone = asyncHandler(async (req, res) => {
  const { brand, model, price, opsys, pic } = req.body;
  if (!brand || !model || !price || !opsys || !pic) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const phone = new Phone({
      user: req.user._id,
      brand,
      model,
      price,
      opsys,
      pic,
    });

    const createdPhone = await phone.save();

    res.status(201).json(createdPhone);
  }
});
const getPhoneById = asyncHandler(async (req, res) => {
  const phone = await Phone.findById(req.params.id);

  if (phone) {
    res.json(phone);
  } else {
    res.status(404).json({ message: "Phone not found" });
  }
});
const UpdatePhone = asyncHandler(async (req, res) => {
  const { brand, model, price, opsys, pic } = req.body;

  const phone = await Phone.findById(req.params.id);

  if (phone.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (phone) {
    phone.brand = brand;
    phone.model = model;
    phone.price = price;
    (phone.opsys = opsys), (phone.pic = pic);

    const updatedPhone = await phone.save();
    res.json(updatedPhone);
  } else {
    res.status(404);
    throw new Error("Phone not found");
  }
});
const DeletePhone = asyncHandler(async (req, res) => {
  const phone = await Phone.findById(req.params.id);

  if (phone.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (phone) {
    await phone.remove();
    res.json({ message: "Phone Removed" });
  } else {
    res.status(404);
    throw new Error("Phone not Found");
  }
});
module.exports = {
  DeletePhone,
  UpdatePhone,
  getPhones,
  createPhone,
  getPhoneById,
};
