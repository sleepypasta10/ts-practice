import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model/Model";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(
    todos.map((todo) => todo.todo).join(", ")
  );

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  

  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo));
    setEdit(false);
  };

 
  return (
    <div className="todos__single">
      {todos.map((item) => (
        <form className="todos__column" onSubmit={(e) => handleEdit(e, item.id)}>
          {edit ? (
            <input 
            ref={inputRef}
            value={editTodo} 
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__edit"/>
          ) : item.isDone ? (
            <s className="todos__single--text">{item.todo}</s>
          ) : (
            <span className="todos__single--text">{item.todo}</span>
          )}
          <div className="icon">
            <span
              onClick={() => {
                if (!edit && !item.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span onClick={() => handleDelete(item.id)}>
              <TiDelete />
            </span>
            <span onClick={() => handleComplete(item.id)}>
              <AiFillCheckCircle />
            </span>
          </div>
        </form>
      ))}
    </div>
  );
};

export default TodoList;
