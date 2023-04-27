const router = require('express').Router();
const { catModel } = require('../db');

// eslint-disable-next-line consistent-return
router.post('/create', async ({ body }, res, next) => {
  try {
    const created = await catModel.create(body);
    res.status(201).json(created);
  } catch (err) {
    return next({
      status: 500,
      msg: 'oops',
    });
  }
});

// eslint-disable-next-line consistent-return
router.get('/getAll', async (req, res, next) => {
  try {
    const find = await catModel.find();
    res.status(201).json(find);
  } catch (err) {
    return next({
      status: 500,
      msg: 'oops',
    });
  }
});

// eslint-disable-next-line consistent-return
router.delete('/remove/:id', async (req, res, next) => {
  try {
    const deleteCat = await catModel.findByIdAndDelete(req.params.id);
    res.status(201).json(deleteCat);
  } catch (err) {
    return next({
      status: 500,
      msg: 'oops',
    });
  }
});

// eslint-disable-next-line consistent-return
router.patch('/update/:id', async (req, res, next) => {
  try {
    const updateCat = await catModel.findByIdAndUpdate(
      req.params.id,
      req.query,
      { returnDocument: 'after' },
    );
    res.status(201).json(updateCat);
  } catch (err) {
    return next({
      status: 500,
      msg: 'oops',
    });
  }
});

// router.get("/getAll", (req, res) => {
//   res.json(cats);
// });

// router.post("/create", (req, res) => {
//   const newCat = req.body;
//   cats.push(newCat);
//   res.status(201).json(cats[cats.length - 1]);
// });

// router.delete("/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const removed = cats.splice(id, 1);
//   res.json(removed);
// });

// router.patch("/update/:id", (req, res, next) => {
//   const { id } = req.params;
//   if (id >= cats.length) return next({ msg: "ID out of bounds", status: 404 });
//   const { name } = req.query;
//   const catToUpdate = cats[id];
//   catToUpdate.name = name;
//   res.json(catToUpdate);
// });

module.exports = router;
