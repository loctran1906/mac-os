// import { useState } from "react";
import listData from "./data";
const ListItem = () => {
    return (
        <>
            {listData.map((data, index) => {
                return (
                    <li className="item position-rel" key={index}>
                        <div>{data.name}</div>
                        <ul className="dropdown position-abs effect-hide-hover border-rd-5 overflow-hidden color-light">
                            {data.items.map((itm, index) => {
                                return (
                                    <li key={index}>
                                        <button className="dropdown__child border-rd-5 cursor-pointer border-none full-width  text-left text-capitalize">
                                            {itm}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </>
    );
};

export default ListItem;
