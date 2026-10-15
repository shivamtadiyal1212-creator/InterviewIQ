import {createBrowserRouter, Navigate} from 'react-router';
import Login from './features/auth/pages/Login.jsx'
import Registor from './features/auth/pages/Registor.jsx'
import Protected from './features/auth/components/Protected.jsx'
import Home from './features/interview/pages/Home.jsx'
import Interview from './features/interview/pages/Interview.jsx';

export const router=createBrowserRouter([{
    path:"/login",
    element:<Login/>,

},{
    path:"/registor",
    element:<Registor/>
},{
    path:"/",
    element:<Protected>
        <Home/>   
    </Protected>
},
{
    path:"/interview/:interviewId",
    element:<Protected><Interview/></Protected>
}])