import React from "react"
import '../../styles/minesweeper/Cell.css';

export interface MineCell{
    x: number;
    y: number;
}

export const Cell = ({ x, y }: MineCell) => {
    return(
        <div className="closedCell" id={x + "-" + y}/>
    )
}