import axios from "axios";

export const Axios = axios.create({

    // baseURL: 'http://localhost:8080/',
    baseURL: 'https://book-store-backend-mauve.vercel.app/',

});

export const RegisterUser = 'user/add-user';
export const LoginUser = 'authentication/signin';

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
export const NewsDelete = 'news/delete';