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
import HomePage from "./pages/HomePage";
import ProjectOverviewPage from "./pages/ProjectOverviewPage";
import DataGatheringPage from "./pages/DataGatheringPage";

// Create a client
const queryClient = new QueryClient()





function App() {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <HomePage/>
                        }/>
                        <Route path="/prj" element={
                            <ProjectOverviewPage/>
                        }/>
                        <Route path="/gather" element={
                            <DataGatheringPage/>
                        }/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default App;
