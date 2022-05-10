import React from "react";
import Task from "./Task";

const Dock = () => {
    return (
        <section className="dock display-flex justify-content-center position-abs">
            <ul className="dock-container bg-menu  display-flex justify-content-center align-items-end">
                <Task />
            </ul>
        </section>
    );
};

export default Dock;
