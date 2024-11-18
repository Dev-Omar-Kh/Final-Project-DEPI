import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SiteLayout from './Layouts/SiteLayout';
import Register from './Site/Auth/Register';
import Login from './Site/Auth/Login';
import Home from './Site/Pages/Home/Home';
import SingleBook from './Site/Pages/Single-Book/SingleBook';
import Books from './Site/Pages/Books/Books';
import SuggestionPage from './Site/Pages/Suggestion-Page/SuggestionPage';
import Newsletter from './Site/Pages/Newsletter/Newsletter';
import NewsMessages from './Site/Pages/Newsletter/NewsMessages';
import AdminLayout from './Layouts/Admin-Layout/AdminLayout';
import AllUsers from './Admin/Pages/Users/AllUsers';
import Empty from './Components/Admin/Empty/Empty';
import BooksList from './Admin/Pages/Books/BooksList';
import AddBook from './Admin/Pages/Books/AddBook';
import AddAdmin from './Admin/Pages/Users/AddAdmin';
import NewsList from './Admin/Pages/News/NewsList';
import AddNews from './Admin/Pages/News/AddNews';
import Suggestion from './Admin/Pages/Suggestion/Suggestion';
import Orders from './Admin/Pages/Orders/Orders';
import { QueryClient, QueryClientProvider } from 'react-query';
import UpdateBook from './Admin/Pages/Books/UpdateBook';
import UpdateNews from './Admin/Pages/News/UpdateNews';
import Profile from './Site/Pages/Profile/Profile';
import AuthRoute from './Protected-Routes/AuthRoute';
import BlockAuthRoute from './Protected-Routes/BlockAuthRoute';
import AdminRoute from './Protected-Routes/AdminRoute';
import { Provider } from 'react-redux';
import { Store } from './Store/Store';
import OffersPage from './Site/Pages/Offers/OffersPage';
import Cart from './Site/Pages/Cart/Cart';
import CheckOut from './Site/Pages/Check-Out/CheckOut';
import Order from './Site/Pages/Orders/Order';

const routes = createBrowserRouter([

    // ====== site-routes ====== //

    {path : '/' , element : <SiteLayout /> , children : [

        {path : '/' , element : <Home />},
        {path : '/profile' , element : <AuthRoute><Profile /></AuthRoute>},
        {path : '/cart' , element : <AuthRoute><Cart /></AuthRoute>},
        {path : '/orders' , element : <AuthRoute><Order /></AuthRoute>},
        {path : '/checkout' , element : <AuthRoute><CheckOut /></AuthRoute>},
        {path : '/books' , element : <Books />},
        {path : '/offers' , element : <OffersPage />},
        {path : '/suggestBook' , element : <SuggestionPage />},
        {path : '/single_book/:id' , element : <SingleBook />},

    ]},

    // ====== newsletter-routes ====== //

    {path : '/newsletter' , element : <AuthRoute><Newsletter /></AuthRoute> , children: [

        {path : '/newsletter', element : <NewsMessages noData={true} />},
        {path : '/newsletter/:id', element : <NewsMessages />}

    ]},

    // ====== authentication-routes ====== //

    {path: '/register' , element : <BlockAuthRoute><Register /></BlockAuthRoute>},
    {path: '/login' , element : <BlockAuthRoute><Login /></BlockAuthRoute>},

    // ====== admin-routes ====== //

    {path: '/admin' , element : <AdminRoute><AdminLayout /></AdminRoute> , children: [

        {path: '/admin' , element: <Empty />},
        
        {path: 'users' , element: <AllUsers />},
        {path: 'users/update/:id' , element: <AddAdmin />},

        {path: 'books' , element: <BooksList />},
        {path: 'books/add' , element: <AddBook />},
        {path: 'books/update/:id' , element: <UpdateBook />},

        {path: 'news' , element: <NewsList />},
        {path: 'news/add' , element: <AddNews />},
        {path: 'news/update/:id' , element: <UpdateNews />},

        {path: 'orders' , element: <Orders />},

        {path: 'suggestion' , element: <Suggestion />},

    ]},

]);

export default function App() {

    let clientQuery = new QueryClient();

    return <React.Fragment>

        <Provider store={Store}>

            <QueryClientProvider client={clientQuery}>

                <RouterProvider router={routes} />

            </QueryClientProvider>

        </Provider>

    </React.Fragment>

}
