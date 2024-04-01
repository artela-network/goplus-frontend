import React from "react";
import { ReactComponent as CompletedIcon } from "./completed.svg";

const SuccessCover = () => (
    <div className="task_box_cover">
        <CompletedIcon style={{width:'135px',height:'135px',marginRight:'10px',}}/>
    </div>
);

export default SuccessCover;
