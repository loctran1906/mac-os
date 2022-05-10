import { useEffect, useState } from "react";

const RightHeader = () => {
    const [date, setDate] = useState("");
    useEffect(() => {
        let dt = new Date()
            .toUTCString()
            .split("2022")
            .join("")
            .slice(0, -7)
            .concat("AM");
        setDate(dt);
    }, []);
    return (
        <ul className="top__icons display-flex-center justify-content-end list-style-none">
            <li className="item position-rel">
                <i className="bx bx-wifi"></i>
            </li>
            <li className="item position-rel">
                <i className="bx bxs-battery-low"></i>
            </li>
            <li className="item position-rel">
                <p>
                    <span id="date-time">{date}</span>
                </p>
            </li>
        </ul>
    );
};
export default RightHeader;
