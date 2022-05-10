import React from "react";

const Loading = () => {
    return (
        <div className="loading">
            <ul className="loading__box">
                <li className="loading__box__icon">
                    <i className="bx bxl-apple"></i>
                </li>
                <li className="loading__box__line">
                    <span className="loading__box__line__span"></span>
                </li>
            </ul>
        </div>
    );
};

export default Loading;
