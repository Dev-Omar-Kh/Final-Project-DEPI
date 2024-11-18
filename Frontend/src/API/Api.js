import axios from "axios";

export const Axios = axios.create({

    baseURL: 'http://localhost:8080/',
    // baseURL: 'https://book-store-backend-mauve.vercel.app/',

});

export const RegisterUser = 'user/add-user';
export const LoginUser = 'authentication/signin';
export const LogOutUser = 'authentication/logout';

export const BookAdd = 'book/add';
export const BookGetAll = 'book/all';
export const BookGetSingle = 'book/single';
export const DeleteBook = 'book/delete';
export const BookUpdate = 'book/update';


export const GetUsers = 'user/all-users';
export const GetUserSingle = 'user/single';
export const DeleteUsers = 'user/delete';
export const UsersUpdateRole = 'user/update';


export const GetNews = 'news/getNews';
export const NewsAdd = 'news/add';
export const GetNewsSingle = 'news/getSingleNews';
export const NewsUpdate = 'news/update';
export const NewsDelete = 'news/delete';

export const CartAdd = 'cart/add';
export const CartGetAll = 'cart/allProducts';
export const CartUpdate = 'cart/update';
export const CartDelete = 'cart/delete';
export const AllCartDelete = 'cart/deleteAll';

export const OrderCreate = 'order/add';
export const GetOrdersByUserId = 'order/userOrders';
export const GetAllOrders = 'order/allOrders';