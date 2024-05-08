import { useEffect, useState } from 'react';
import './index.scss';
function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useState(() => {
        const listStringIfy = localStorage.getItem('shoppingList');
        return listStringIfy ? JSON.parse(listStringIfy) : [];
    });
    const [newItem, setNewItem] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        setShoppingList([...shoppingList, newItem.trim()]);
        setNewItem('');
    };

    const handleRemoveItem = (itemToDelete) => {
        setShoppingList(shoppingList.filter((item) => item !== itemToDelete));
    };
    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }, [shoppingList]);
    return (
        <div className="shopping-container">
            <h1>Shopping list</h1>
            <div>
                <form onSubmit={handleAddItem}>
                    <input
                        name="newItem"
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                    />
                    <button type="submit">Add item</button>
                </form>
            </div>
            <ul>
                {shoppingList.map((item) => (
                    <li>
                        {item}
                        <button onClick={() => handleRemoveItem(item)}>
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingListPage;
