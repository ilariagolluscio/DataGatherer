import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {CookiesProvider, useCookies} from 'react-cookie';
import {useEffect} from "react";

import { Gallery } from "react-grid-gallery";

/* Import delle varie pagine */
import CropDemo from "./pages/CropDemo";

// Create a client
const queryClient = new QueryClient()



const PrivateRoute = ({children}) => {

    const [cookies] = useCookies()
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies.auth) return navigate('/')
    }, [cookies.auth, navigate]);

    return(
        <>{children}</>
    )
}


function App() {
    return (
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <CropDemo/>
                        }/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default App;
