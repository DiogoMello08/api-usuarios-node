const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // then we'll switch to a bank

module.exports = {
    async create({ email, password }) {
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { 
            id: users.length + 1,
            email,
            password: hashedPassword        
        };

        users.push(user);

        return { id: user.id, email: user.email };
    },
    async login({ email, password }) {
        const user = users.find(u => u.email === email);
        
        if (!user) {
            throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Invalid password');
        }
        
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    }   
};
        