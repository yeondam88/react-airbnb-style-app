const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

exports.auth = (req, res) => {};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data Missing!", detail: "Provide email and password." }
      ]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        { title: "Invalid Password!", detail: "Password is not matched!." }
      ]
    });
  }

  User.findOne(
    {
      email
    },
    (err, existingUser) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (existingUser) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid Email",
              detail: "User with this email already exist!"
            }
          ]
        });
      }

      const user = new User({
        username,
        email,
        password
      });

      user.save(err => {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.json({ registered: true });
      });
    }
  );
};
