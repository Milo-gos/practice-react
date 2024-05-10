import { useNavigate } from 'react-router-dom';
import './index.scss';

function MainLayout({ children }) {
    const navigate = useNavigate();
    const value = () => {
        const origin = window.location.origin;
        const value = window.location.href.substring(origin.length);
        return value;
    };
    return (
        <div className="main-layout">
            <div className="menu">
                <select
                    onChange={(e) => navigate(e.target.value)}
                    value={value()}
                >
                    <option value="/todo-list">Todo List Custom Hook</option>
                    <option value="/contact-book">Contact Book</option>
                    <option value="/timer">Timer Count Down</option>
                    <option value="/movie-search">Search Movie API</option>
                    <option value="/shopping-list">
                        Shopping List LocalStorage
                    </option>
                    <option value="/shopping-cart">
                        Shopping Cart React Query
                    </option>
                </select>
            </div>
            {children}
        </div>
    );
}

export default MainLayout;
