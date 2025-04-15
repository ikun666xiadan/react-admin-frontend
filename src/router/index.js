import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react'

const Layout = lazy(()=>import('../pages/Layout'))
const Home = lazy(()=>import('../pages/Home'))
const Goods = lazy(()=>import('../pages/Goods'))
const User = lazy(()=>import('../pages/User'))
const Other = lazy(()=>import('../pages/Other'))


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
                element: <Suspense fallback={'loading...'}><Home /> </Suspense>
            },
            {
                path:'goods',
                element:<Suspense fallback={'loading...'}><Goods /> </Suspense>
            },
            {
                path:'user',
                element:<Suspense fallback={'loading...'}><User /> </Suspense>
            },
            {
                path:'other',
                element:<Suspense fallback={'loading...'}><Other /> </Suspense>
            }
        ]
    },
])

export default router