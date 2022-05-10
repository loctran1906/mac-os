import listData from "./data";
import { useEffect, useState } from "react";
const Task = () => {
    useEffect(() => {
        let icons = document.querySelectorAll(".dock-container li.item");
        icons.forEach((item, index) => {
            item.addEventListener("mouseover", (e) => {
                focus(item, index);
            });
            item.addEventListener("mouseleave", (e) => {
                icons.forEach((item) => {
                    item.style.width = "65px";
                    item.style.height = "50px";
                });
            });
        });

        const focus = (element, index) => {
            let previous = index - 1;
            let previous1 = index - 2;
            let next = index + 1;
            let next2 = index + 2;

            if (previous === -1) {
                element.style.width = "105px";
                element.style.height = "90px";
                icons[next].style.width = "90px";
                icons[next].style.height = "75px";
            } else if (previous === 0) {
                element.style.width = "105px";
                element.style.height = "90px";
                icons[previous].style.width = "90px";
                icons[previous].style.height = "75px";
                icons[next].style.width = "90px";
                icons[next].style.height = "75px";
            } else if (next === icons.length - 1) {
                element.style.width = "105px";
                element.style.height = "90px";
                icons[previous].style.width = "90px";
                icons[previous].style.height = "75px";
                icons[next].style.width = "90px";
                icons[next].style.height = "75px";
            } else if (next === icons.length) {
                element.style.width = "105px";
                element.style.height = "90px";
                icons[previous].style.width = "90px";
                icons[previous].style.height = "75px";
            } else {
                element.style.width = "105px";
                element.style.height = "90px";
                icons[previous].style.width = "90px";
                icons[previous].style.height = "75px";
                icons[previous1].style.width = "75px";
                icons[previous1].style.height = "60px";
                icons[next].style.width = "90px";
                icons[next].style.height = "75px";
                icons[next2].style.width = "75px";
                icons[next2].style.height = "60px";
            }
        };
    }, []);
    const [listTask, setListTask] = useState(listData);

    const showItem = (element) => {
        let item_main = document.querySelector(element);
        item_main.classList.toggle("active");
    };
    return (
        <>
            {listTask.map((task, index) => {
                return (
                    <li
                        key={index}
                        className="li-1 item display-flex-center justify-content-center vertical-align-bottom"
                    >
                        <div className="name position-abs display-flex-center justify-content-center  border-rd-5 visibility-hidden ">
                            {task.name}
                        </div>
                        <img
                            onClick={() => {
                                showItem(`.${task.name.toLowerCase()}`);
                            }}
                            className="icon full-height full-width object-cover"
                            src={require(`../../../MacOS/img/${task.image}.png`)}
                            alt={task.name}
                        />
                    </li>
                );
            })}
        </>
    );
};

export default Task;
