import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {CookiesProvider, useCookies} from 'react-cookie';

/* Import delle varie pagine */
import HomePage from "./pages/home_page/HomePage";
import ProjectOverviewPage from "./pages/project_overview_page/ProjectOverviewPage";
import DataGatheringPage from "./pages/data_gatering_page/DataGatheringPage";
import DataStructuringPage from "./pages/data_structuring_page/DataStructuringPage";
import DataEditingPage from "./pages/data_editing_page/DataEditingPage";
import {useHotkeys} from "react-hotkeys-hook";
import {useDispatch, useSelector} from "react-redux";
import {keySetSelector, toggleKeySet} from "./slices/keyboardSlice";

// Create a client
const queryClient = new QueryClient()





function App() {

    const dispatch = useDispatch()

    useHotkeys('ctrl+k', () => {
        if (keySetSelector) dispatch(toggleKeySet())
    })


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
                        <Route path="/structure" element={
                            <DataStructuringPage/>
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
