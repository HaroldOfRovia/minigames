import React, { CSSProperties, useState } from "react"
import '../../styles/minesweeper/Cell.css';

export interface MineCell{
    x: number;
    y: number;
    content: string | number;
    open: boolean
}

export const Cell = ({ x, y, content, open }: MineCell) => {
    const [show, setShow] = useState(open);

    document.getElementById(x + "-" + y)?.addEventListener('click', (e) =>{
        setShow(true);
    });

    if(show){
        if(content === 'bomb'){
            return (
                <div className="cell" id={x + "-" + y} style={{ backgroundColor: 'black' }}/>
            )
        }
        else if(typeof content === 'number'){
            return (
                <div className={`cell num${content}`} id={x + "-" + y}>{ content }</div>
            )
        }
        return(
            <div className="cell" id={x + "-" + y}>-</div>
            )
    }
    return(
        <div className="cell" id={x + "-" + y}/>
    )
}