const { User } = require('../models');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const user = User.build({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User added successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createOrUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { skipValidation, ...data } = req.body;

    const options = { validate: !skipValidation };

    let user = await User.findByPk(id);

    if (user) {
      await user.update(data, options);
    } else {
      user = User.build({ id, ...data });
      await user.save(options);
    }

    res.status(200).json({ message: 'User created or updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'no user found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['role'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'no user found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
