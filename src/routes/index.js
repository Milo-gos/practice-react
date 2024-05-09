import ContactBookPage from '../pages/ContactBook';
import MovieSearchPage from '../pages/MovieSearch';
import ShoppingCartPage from '../pages/ShoppingCart';
import ShoppingCart from '../pages/ShoppingCart';
import ShoppingListPage from '../pages/ShoppingList';
import TimerPage from '../pages/Timer';
import TodoListLocalStoragePage from '../pages/TodoListLocalStorage';

const routes = [
    {
        path: '/',
        component: TodoListLocalStoragePage,
    },
    {
        path: '/todo-list',
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
    {
        path: '/shopping-list',
        component: ShoppingListPage,
    },
    {
        path: '/shopping-cart',
        component: ShoppingCartPage,
    },
];

export default routes;
