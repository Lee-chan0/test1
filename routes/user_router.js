import express from 'express';
import User from '../schemas/user_schema.js';

const router = express.Router()

// 목록 조회
router.get('/user', async (req, res) => {
    const users = await User.find().exec();

    // _id를 userId로 변경한 데이터로 변환
    const transformedUsers = users.map(user => {
        return {
            userId: user._id,
            email: user.email,
            name: user.name,
            pw: user.pw,
        };
    });

    return res.status(200).json(transformedUsers);
});


// 상세 조회
router.get('/user/:userId', async (req, res) => {
    const params = req.params;
    const userId = params.userId;
    const search = await User.findOne({ _id: userId }).exec();

    if (search) {
        return res.status(200).json({
            userId: search._id,
            name: search.name,
            email: search.email,
            pw: search.pw
        });
    }
});


export default router;