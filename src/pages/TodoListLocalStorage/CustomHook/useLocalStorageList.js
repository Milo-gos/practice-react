import { useEffect, useState } from 'react';

function useLocalStorageList() {
    const [list, setList] = useState(() => {
        const listStringIfy = localStorage.getItem('todoList');
        return listStringIfy ? JSON.parse(listStringIfy) : [];
    });
    const handleChangeList = (callback) => {
        if (typeof callback === 'function') {
            const nextState = callback(list);
            setList([...nextState]);
        } else {
            setList([...callback]);
        }
    };
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list));
    }, [list]);

    return [list, handleChangeList];
}

export default useLocalStorageList;
