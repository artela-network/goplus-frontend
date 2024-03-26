import React, { useRef } from "react";
const TaskList = () => {
    const firstTaskRef = useRef<HTMLDivElement>(null);
    const secondTaskRef = useRef<HTMLDivElement>(null);
    const thirdTaskRef = useRef<HTMLDivElement>(null);
    const scrollToTaskScreen = (ref: React.RefObject<HTMLDivElement>): void => {
        const navbarHeight: number = 100;
        if (ref.current) {
            const secondScreenPosition = ref.current.offsetTop;
            window.scrollTo({
                top: secondScreenPosition - navbarHeight, // 减去Navbar的高度以避免遮挡
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className={`mt-20  w-full relative`}>
                <div className={`task-list-row`}>
                    <div>
                        <button onClick={() => scrollToTaskScreen(firstTaskRef)} className="task_button">1</button>
                    </div>
                    <div style={{ margin: '0 20px' }}>{'--->'}</div>
                    <div>
                        <button onClick={() => scrollToTaskScreen(secondTaskRef)} className="task_button">2</button>
                    </div>
                    <div style={{ margin: '0 20px' }}>{'--->'}</div>
                    <div>
                        <button onClick={() => scrollToTaskScreen(thirdTaskRef)} className="task_button">3</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskList;