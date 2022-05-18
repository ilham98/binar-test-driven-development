const express = require("express");
const UserService = require("./UserService");
const router = express.Router();

router.post("/api/1.0/users", async (req, res) => {
  await UserService.save(req.body);
  return res.send({
    message: "User berhasil dibuat",
  });
});

module.exports = router;
