import React from "react";
import "./bottom.css";
import Arrow from "../../images/arrow-icon.svg";

const Bottom = ({ title }) => {
    return (
        <div className="sectionB">
            <div className="contentsB">
                <h1 className="fontB">{title}</h1>
                {/* <div className="icon">
                    <img src={Arrow} alt="arrow icon" className="arrowIcon" />
                </div> */}
            </div>
        </div>
    );
};

export default Bottom;
