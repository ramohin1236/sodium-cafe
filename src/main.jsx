
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/router.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';
// tanstac query
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(

    <>
        <AuthProvider>

            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster position="top-center" />
            </QueryClientProvider>

        </AuthProvider>

    </>


)
