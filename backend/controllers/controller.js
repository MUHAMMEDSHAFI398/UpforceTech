const user = require("../models/userModel");
const json2csv = require("json2csv").parse;
const fs = require("fs");
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
    try {
      const itemsPerPage = 5;
      const page = req.params.id;
      const currentPage = parseInt(page);
      const skip = (currentPage - 1) * itemsPerPage;
      const users = await user.find({}).skip(skip).limit(5);
      res.json({ status: true, users: users, startingNo: skip + 1 });
    } catch (err) {
      next(err);
    }
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
  getSearchUsers: async (req, res, next) => {
    try {
      const searchValue = req.params.id;
      const users = await user.find({
        $or: [
          { firstName: { $regex: searchValue, $options: "i" } },
          { lastName: { $regex: searchValue, $options: "i" } },
          { fullName: { $regex: searchValue, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $concat: ["$firstName", " ", "$lastName"] },
                regex: searchValue,
                options: "i",
              },
            },
          },
        ],
      });
      res.json({ status: true, users: users, startingNo: 1 });
    } catch (err) {
      next(err);
    }
  },
  exportToCsv: async (req, res, next) => {
    try {
      const userData = await user.find({});
      const csv = json2csv(userData);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      res.send(csv);
    } catch (err) {
      next(err);
    }
  },
};
