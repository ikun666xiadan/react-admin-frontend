import { createBrowserRouter, Navigate } from "react-router-dom";

import User from '../pages/User'
import Layout from '../pages/Layout'
import Home from '../pages/Home'
import Goods from '../pages/Goods'
import Other from '../pages/Other'


const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            // 路由重定向
            {
                path:'/',
                element:<Navigate to='home' replace/>
            },
            {
                path:'home',
                element:<Home/>
            },
            {
                path:'goods',
                element:<Goods/>
            },
            {
                path:'user',
                element:<User/>
            },
            {
                path:'other',
                element:<Other/>
            }
        ]
    },
])

export default router