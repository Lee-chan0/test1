import express from 'express';
import Store from '../schemas/products.schema.js';

const router = express.Router()

// 상품 등록
router.post('/products', async(req, res) => {
    const {title, content, author, password, status} = req.body;

    if(!title && !author && !password && !status){
        return res.status(400).json({ message : "올바른 형식이 아닙니다. "})
    }
    const storeItem = new Store({title, content, author, password, status});
    await storeItem.save();
    return res.status(200).json({ message : "상품을 등록하였습니다." });
})

//  상품 목록 조회
router.get('/products', async(req, res) => {
    const stores = await Store.find().exec();
    return res.status(200).json({ stores });
})

// 상품 상세 조회
router.get('/products/:productId', async(req, res) => {
    const params = req.params;
    const productId = params.productId;
    const search = await Store.findOne({ title: productId }).exec();
    if(search){
        return res.status(200).json({ search });
    }else{
        return res.status(400).json({message : "상품 조회에 실패하였습니다."});
    }

})

//  상품 정보 수정
router.patch('/products/:productId', async(req, res) => {
    const params = req.params;
    const productId = params.productId;
    const {title, content, status, password} = req.body;
    const product = await Store.findOne({ password: productId});
    if(!product) {
        return res.status(404).json({message : "상품을 찾을 수 없습니다."})
    }
    if(+productId !== product.password){
        return res.status(404).json({message : "비밀번호가 일치하지 않습니다."});
    }
    if(title){
        product.title = title;
    }
    if(status){
        product.status = status;
    }
    if(content){
        product.content = content;
    }

    await product.save();

    return res.status(200).json({ message : "상품이 업데이트 됐습니다." })
})

//  상품 삭제
router.delete('/products/:productId', async(req, res) => {
    const params = req.params;
    const productId = params.productId;
    const product = await Store.findOne({password : productId});

    if(product.password === +productId){
        await Store.deleteOne({ password : productId }).exec();

        return res.status(200).json({});
    }else{
        return res.status(400).json({message : "상품 조회에 실패하였습니다."});
    }
})

export default router;