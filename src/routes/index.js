import ContactBookPage from '../pages/ContactBook';
import MovieSearchPage from '../pages/MovieSearch';
import TimerPage from '../pages/Timer';
import TodoListLocalStoragePage from '../pages/TodoListLocalStorage';

const routes = [
    {
        path: '/',
        component: TodoListLocalStoragePage,
    },
    {
        path: '/todo',
        component: TodoListLocalStoragePage,
    },
    {
        path: '/contact-book',
        component: ContactBookPage,
    },
    {
        path: '/timer',
        component: TimerPage,
    },
    {
        path: '/movie-search',
        component: MovieSearchPage,
    },
];

export default routes;
