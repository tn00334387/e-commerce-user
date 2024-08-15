const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserModule = {

    Register: async (req, res) => {

        const { username, email, password } = req.body;

        try {
            // 檢查用戶是否已存在
            let user = await User.findOne({ email });
            if ( user ) {
                console.log(`user-${email} is existed`)
                res.status(409).json({ 
                    status: "Conflict",
                    message: 'User already exists!' 
                })
                return
            }
    
            // 創建新用戶
            user = new User({
                username,
                email,
                password: bcrypt.hashSync(password, 10),
            });

            await user.save();
            console.log(`user - ${username} signUp succeed`)

            res.status(201).json({ 
                status: "Succeed",
                message: 'User registered successfully' 
            });
        } catch (error) {
            console.log(`User - Login : `, error)
            res.status(500).json({ 
                status: "Failed",
                message: 'Server error' 
            });
        }
    },

    Login: async (req, res) => {
        
        const { email, password } = req.body;

        try {
    
            // 查找用戶
            const user = await User.findOne({ email });
            if (!user) {
                console.log(`user: ${email} is unexist`)
                res.status(404).json({ 
                    status: "NOT_FOUND",
                    message: 'User not found !' 
                });
                return
            } 

            // 檢查密碼
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
            // 創建JWT
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            const { username } = user

            console.log(`user - ${username} login succeed`)
    
            res.status(200).json({ 
                status: "Succeed",
                username,
                token 
            });
        } catch (error) {
            console.log(`User - Register : `, error)
            res.status(500).json({ 
                status: "Failed",
                message: 'Server error' 
            });
        }

    },


}

module.exports = UserModule;