const UserService = require('../services/UserService');

module.exports = {
  async createUser(req, res) {
    try {
        const user = await UserService.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
},
  async loginUser(req, res) {
    try {
        const token = await UserService.login(req.body);
        return res.json({ token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
},
    async getProfile(req, res) {
        return res.json({ message: 'Protected route accessed' });
    }
};
