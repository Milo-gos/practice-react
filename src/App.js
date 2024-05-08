import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
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
    );
}

export default App;
