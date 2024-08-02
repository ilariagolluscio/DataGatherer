import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {CookiesProvider, useCookies} from 'react-cookie';

/* Import delle varie pagine */
import CropDemo from "./pages/CropDemo";
import HomePage from "./pages/HomePage";
import ProjectOverviewPage from "./pages/ProjectOverviewPage";
import DataGatheringPage from "./pages/data_gatering_page/DataGatheringPage";
import DataParsingPage from "./pages/data_parsing_page/DataParsingPage";
import DataEditingPage from "./pages/data_editing_page/DataEditingPage";

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
                        <Route path="/parse" element={
                            <DataParsingPage/>
                        }/>
                        <Route path="/edit" element={
                            <DataEditingPage/>
                        }/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default App;
