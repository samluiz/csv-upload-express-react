const express = require('express')
const upload = require('../services/upload')
const router = express.Router()
const csv = require('csvtojson')
const prisma = require('../db/prisma')
const processParams = require('../middlewares/processParams')


router.get("/", async (req, res, next) => {
  try {
    const query = processParams(prisma);
    await query(req, res, next);
    res.json(res.paginatedResult)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post("/", upload.single('file'), async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(req.file.path);
    const createUserPromises = jsonArray.map(async (user) => {
      return prisma.user.create({ data: user });
    });

    const users = await Promise.all(createUserPromises);

    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router