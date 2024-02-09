import React, { useReducer, useState } from 'react';



const initialState = {
    todos: []
};

function reducer(state, action) {
    switch (action.type) {
    case 'ADD_TODO':
        return {
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
        };
    case 'TOGGLE_TODO':
        return {
        todos: state.todos.map(todo =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
        };
    case 'DELETE_TODO':
        return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
        };
    default:
        return state;
    }
}

function TodoList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');

    const handleChange = (e) => {
    setText(e.target.value);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
        dispatch({ type: 'ADD_TODO', payload: text });
        setText('');
    }
    };

    const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    };

    return (
    <div className="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit">Add Todo</button>
        </form>
        <ul>
        {state.todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
        ))}
        </ul>
        
    </div>
    );
}

export default TodoList;
