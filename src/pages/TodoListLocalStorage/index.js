import { useEffect, useMemo, useState } from 'react';
import './index.scss';

function TodoListLocalStoragePage() {
    const [todo, setTodo] = useState('');
    const [listTodo, setListTodo] = useState(() => {
        const listStringIfy = localStorage.getItem('todoList');
        return listStringIfy ? JSON.parse(listStringIfy) : [];
    });
    const handleClickAD = () => {
        if (sumChecked === 0) {
            if (todo.trim() === '') return;
            setListTodo((prev) => [
                ...prev,
                {
                    name: todo,
                    isChecked: false,
                },
            ]);
            setTodo('');
        } else {
            setListTodo((prev) =>
                [...prev].filter((item) => item.isChecked === false)
            );
        }
    };
    const handleChangeChecked = (indexChange, checked) => {
        setListTodo((prev) =>
            [...prev].map((item, index) => {
                if (index !== indexChange) return item;
                else
                    return {
                        ...item,
                        isChecked: checked,
                    };
            })
        );
    };
    const sumChecked = useMemo(() => {
        return listTodo.reduce((acc, cur) => (acc + cur.isChecked ? 1 : 0), 0);
    }, [listTodo]);
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(listTodo));
    }, [listTodo]);
    return (
        <div className="container-todo">
            <h2>Todo List App</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button onClick={handleClickAD}>
                    {sumChecked > 0 ? 'Delete' : 'Add'}
                </button>
            </div>
            <ul className="list-todo">
                {listTodo.map((todo, index) => {
                    return (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={todo.isChecked}
                                onChange={(e) =>
                                    handleChangeChecked(index, e.target.checked)
                                }
                            />
                            <label style={{ marginLeft: '8px' }}>
                                {todo.name}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoListLocalStoragePage;
