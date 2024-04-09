
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/router.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
   
    <>
    <AuthProvider>
       <RouterProvider router={router} />
       <Toaster  position="top-center"/>
    </AuthProvider>
  
    </>
   
 
)
