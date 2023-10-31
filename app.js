import express from 'express';
import connect from './schemas/index.js';
import storerouter from './routes/products.router.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = express.Router();

connect();

router.get('/', (req, res) => {
    return res.json({message : 'hii'});
})

app.use('/api', [router, storerouter]);

app.listen(PORT, () => {
    console.log(PORT, "번으로 서버가 열렸습니다.");
})