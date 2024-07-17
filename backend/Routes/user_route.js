import express from 'express';
import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user_controller.js';
import  {middleWare}  from '../Middleware/middleware.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', middleWare, updateUser)
router.delete('/delete/:id', middleWare, deleteUser)
router.get('/listings/:id', middleWare, getUserListings)
router.get('/:id', middleWare, getUser)

export default router;