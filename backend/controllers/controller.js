const user = require("../models/userModel");
module.exports = {
  login: async (req, res, next) => {
    const data = req.body;
    try {
      await user.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        gender: data.gender,
        status: data.status,
        profileImg: req.file.path,
        location: data.location,
      });
      res.json({ status: true });
    } catch (err) {
      next(err);
    }
  },
  getUsers: async (req, res, next) => {
    const users = await user.find({});
    console.log(users);
    res.json({ status: true, users: users });
  },
  statusChange: (req, res, next) => {
    user
      .updateOne(
        {
          _id: req.body.userId,
        },
        {
          $set: {
            status: req.body.status,
          },
        }
      )
      .then(() => {
        res.json({ status: true });
      })
      .catch((err) => {
        next(err);
      });
  },
  edituser: (req, res, next) => {
    const data = req.body;
    user
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
            status: data.status,
            location: data.location,
          },
        }
      )
      .then(() => {
        res.json({ status: true });
      })
      .catch((err) => {
        next(err);
      });
  },
  deleteUser: (req, res, next) => {
    user
      .deleteOne({ _id: req.body.id })
      .then(() => {
        res.json({ status: true });
      })
      .catch((err) => {
        next(err);
      });
  },
  editProfile: (req, res, next) => {
    const data = req.body;
    user
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
            status: data.status,
            location: data.location,
            profileImg: req.file.path,
          },
        }
      )
      .then(() => {
        res.json({ status: true });
      })
      .catch((err) => {
        next(err);
      });
  },
};
