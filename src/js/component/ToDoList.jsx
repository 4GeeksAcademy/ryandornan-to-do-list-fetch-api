import React, { useState } from 'react';
import ClearList from './ClearList';

const ToDoList = () => {

    const [list, setList] = useState([]);
    const [input, setInput] = useState("");

    const addToDo = (toDo) => {
        const newToDo = {
            id: Math.random(),
            toDo: toDo,
        };

        // add the todo to the list
        setList([...list, newToDo]);

        // clear input box
        setInput("");
    };

    const deleteToDo = (id) => {
        // filter out to do with the id
        const newList = list.filter((toDo) => toDo.id !== id);

        setList(newList);
    };

    const handleKeyPress = (e) => {
        // Check if the enter key is pressed (key code 13)
        if (e.key === 'Enter') {
            addToDo(input);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='container'>
                <h1 className='todo-heading'>What Would You Like To Do?</h1>

                <input
                    className='todo-input'
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <button className='todo-button' onClick={() => addToDo(input)}>
                    Add Task
                </button>

                <ul className='todo-list'>
                    {list.map((toDo) => (
                        <li className='todo-list-item' key={toDo.id}>
                            {toDo.toDo}
                            <button onClick={() => deleteToDo(toDo.id)} className="clear-list-button">
                                -
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;
