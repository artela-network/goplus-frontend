import React from "react";
import { ReactComponent as CompletedIcon } from "./completed.svg";

const SuccessCover = () => (
    <div className="task_box_cover">
        <CompletedIcon style={{width:'35px',height:'35px',margin:'10px',}}/>
    </div>
);

export default SuccessCover;
