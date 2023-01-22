import React, { CSSProperties, useState } from "react"
import '../../styles/minesweeper/Cell.css';

export interface MineCell{
    x: number;
    y: number;
    content: number;
    open: boolean;
    flag: boolean;
    bomb: boolean;
}

export const Cell = ({ x, y, content, open, flag, bomb }: MineCell) => {
    if(open){
        if(bomb){
            return (
                <div className="openCell" id={x + "-" + y} style={{ backgroundColor: 'black' }}/>
            )
        }
        else if(content > 0){
            return (
                <div className={`openCell num${content}`} id={x + "-" + y}>{ content }</div>
            )
        }
        return(
            <div className="openCell" id={x + "-" + y}></div>
            )
    }
    if(flag)
        return (
            <div className='cell' id={x + "-" + y}>
                <div className='stick'/>
                <div className='flag'/>
            </div>
        )
    return(
        <div className="cell" id={x + "-" + y}/>
    )
}