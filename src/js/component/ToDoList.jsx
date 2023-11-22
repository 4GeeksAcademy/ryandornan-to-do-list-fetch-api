import React, { useState, useEffect } from 'react';

const ToDoList = () => {

    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const domain = "https://playground.4geeks.com/apis/fake/todos/user/ryandornan";



    const handleFetchTasks = async () => {
        const textResponse = await fetch(domain);
        const jsonResponse = await textResponse.json();
        setList (jsonResponse);
    }

    useEffect (() => {
        handleFetchTasks();
    }, []);

    async function updateToDo (newList) {

        await fetch (domain, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json"
            }, body: JSON.stringify(newList),
         });
          handleFetchTasks();
    }

    const addToDo = (toDo) => {
        const newToDo = {
            label : toDo,
            done : false,
        };

        // add the todo to the list
        setList([...list, newToDo]);

        // clear input box
        setInput("");

        updateToDo ([...list, newToDo]);
    };

    const deleteToDo = (id) => {
        // filter out to do with the id
        const newList = list.filter((toDo) => toDo.id !== id);

        setList(newList);
        updateToDo (newList);
        
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
                    onKeyDown = {handleKeyPress}
                />

                <button className='todo-button' onClick={() => addToDo(input)}>
                    Add Task
                </button>

                <ul className='todo-list'>
                    {list.map((toDo) => (
                        <li className='todo-list-item' key={toDo.id}>
                            {toDo.label}
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
