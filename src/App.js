import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routes from './routes';
import MainLayout from './layouts/MainLayout';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <MainLayout>
                                        <Page />
                                    </MainLayout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
