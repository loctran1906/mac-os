import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Finder = () => {
    const statusList = ["Doing", "Refus", "Done"];
    const [todoList, setTodoList] = useState([]);
    const [todoName, setTodoName] = useState("");
    const [email, setEmail] = useState("");
    const [statusChoosed, setStatusChoosed] = useState("");
    const [hideFinder, setHideFinder] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [todoSelected, setTodoSelected] = useState(-1);
    const [errorName, setErrorName] = useState("");
    const [errorStatus, setErrorStatus] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    useEffect(() => {
        if (isEditing && todoSelected !== -1) {
            const todoItem = todoList[todoSelected];
            setTodoName(todoItem.todo);
            setStatusChoosed(todoItem.status);
            setEmail(todoItem.email);
        }
    }, [isEditing, todoSelected]);
    useEffect(() => {
        function dragElement(elmnt) {
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                document.getElementById(elmnt.id + "header").onmousedown =
                    dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = elmnt.offsetTop - pos2 + "px";
                elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        dragElement(document.getElementById("finder"));
    }, []);

    const hideItem = () => {
        setHideFinder((o) => !o);
    };

    const getTodoName = (e) => {
        setTodoName(e.target.value);
        if (todoName === "") setErrorName("");
        setErrorName("");
    };
    const getEmail = (e) => {
        setEmail(e.target.value);
        setErrorEmail("");
    };
    const getStatus = (e) => {
        setStatusChoosed(e.target.value);
        setErrorStatus("");
    };
    const focus = () => {
        setErrorName("input something here");
    };
    const blur = () => {
        if (todoName === "") setErrorName("input please");
    };
    const handleSubmit = (e) => {
        const name = todoName;
        const status = statusChoosed;
        const emailInit = email;
        e.preventDefault();
        if (email === "") {
            setErrorEmail("not blank!");
            return false;
        } else if (email.length < 5) {
            setErrorEmail("email must has 5 characters at less");
            return false;
        } else if (!email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
            setErrorEmail("email invalid.example: chien@xxx.com");
            return false;
        } else if (name === "") {
            setErrorName("Todo doesn't blank!");
            return false;
        } else if (status === "") {
            setErrorStatus("Please chose one status!");
            return false;
        }
        if (!isEditing) {
            setTodoList((values) => [
                ...values,
                { todo: name, status: status, email: emailInit, id: uuidv4() },
            ]);
            setTodoName("");
            setStatusChoosed("");
            setEmail("");
            setErrorName("");
            setErrorStatus("");
            setErrorEmail("");
        } else {
            const newTodoList = [...todoList];
            const newTodo = {
                ...todoList[todoSelected],
                todo: name,
                status: status,
                email: emailInit,
            };
            newTodoList[todoSelected] = newTodo;

            setTodoList(newTodoList);
            setIsEditing(false);
            setStatusChoosed("");
            setTodoName("");
            setEmail("");
        }
    };

    const deleteJob = (id) => {
        const newJobs = [...todoList];
        newJobs.splice(id, 1);
        setTodoList(newJobs);
    };

    const editJob = (id) => {
        setIsEditing(true);
        setTodoSelected(id);
    };

    return (
        <section
            className={`finder border-rd-10 position-abs bg-color-light box-shadow container ${
                hideFinder ? "active" : ""
            }`}
            id="finder"
        >
            <div className="finder__header position-rel" id="finderheader">
                <div className="finder__header__actions position-abs">
                    <i
                        className="bx bx-x bg-color-red border-rd-50"
                        onClick={hideItem}
                    ></i>
                    <i className="bx bx-minus bg-color-yellow border-rd-50"></i>
                    <i className="bx bx-expand-alt bg-color-green border-rd-50"></i>
                </div>
                <h4 className="text-center color-dark font-weight-normal">
                    Finder
                </h4>
            </div>
            <div className="finder__form">
                <h1 className="finder__form__tittle text-center primary-color">
                    Control Todo list
                </h1>
                <form onSubmit={handleSubmit}>
                    <ul className="finder__form__list list-style-none display-flex-wrap">
                        <li className="item">
                            <input
                                type="text"
                                id="email"
                                placeholder="email of person make todo"
                                name="email"
                                value={email}
                                onChange={getEmail}
                            />
                            <p className="error">{errorEmail}</p>
                        </li>
                        <li className="item">
                            <input
                                type="text"
                                id="job-name"
                                placeholder="job name"
                                name="todo"
                                onChange={getTodoName}
                                onBlur={blur}
                                onFocus={focus}
                                value={todoName}
                            />
                            <p className="error">{errorName}</p>
                        </li>
                        <li className="item">
                            <select
                                id="status"
                                name="status"
                                onChange={getStatus}
                                value={statusChoosed}
                            >
                                <option value="" disabled selected>
                                    ---chose status---
                                </option>
                                {statusList.map((status, index) => {
                                    return (
                                        <>
                                            <option key={index} value={status}>
                                                {status}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                            <p className="error">{errorStatus}</p>
                        </li>
                        <li className="item">
                            <input
                                className="btn bg-secondary-color color-light"
                                type="submit"
                                id="submit"
                                value={isEditing ? "Edit" : "Add"}
                            />
                        </li>
                    </ul>
                </form>
            </div>
            <hr />
            <div className="finder__work__list">
                <table
                    className="finder__work__list__table"
                    cellPadding="5"
                    cellSpacing="0"
                    border="1"
                >
                    <caption className="finder__work__list__table__cap">
                        <h2 className="primary-color">Todo list</h2>
                    </caption>
                    <thead id="table-head">
                        <tr>
                            <th>No</th>
                            <th>Email</th>
                            <th>Job name</th>
                            <th>Status</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody id="table-body">
                        {todoList.map((todo, index) => {
                            return (
                                <>
                                    <tr key={todo.id}>
                                        <td>{index + 1}</td>
                                        <td>{todo.email}</td>
                                        <td>{todo.todo}</td>
                                        <td>{todo.status}</td>
                                        <td>
                                            <i
                                                onClick={() => editJob(index)}
                                                className="bx bx-edit"
                                            ></i>
                                        </td>
                                        <td>
                                            <i
                                                onClick={() => deleteJob(index)}
                                                className="bx bxs-trash-alt"
                                            ></i>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Finder;
