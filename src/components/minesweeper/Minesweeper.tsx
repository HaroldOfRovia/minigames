import React, { CSSProperties, useEffect, useState } from "react"
import { Cell, MineCell } from "./Cell"
import '../../styles/minesweeper/Minesweeper.css'

export const Minesweeper = () => {
    let generated = false;
    const [width, setWidth] = useState(25);
    const [height, setHeight] = useState(25);
    const [cells, setCells] = useState<MineCell[][]>();

    function initCells(){
        let arr: MineCell[][] = [];
        for(let i = 0; i < width; i++){
            arr.push([]);
            for(let j = 0; j < height; j++)
                arr[i].push({ x: i, y: j});
        }
        setCells(arr);
    }

    function generateGame(){

    }

    document.getElementById('field')?.addEventListener('click', (e) => {
        const el = e.target as HTMLElement;
        console.log(el);
    })

    useEffect(()=>{
        initCells();
    }, []);

    return (
        <div id="field" style={ cssField(width, height) }>
            { 
            (function(){
                if(!cells)
                    return;
                return cells.map((row) => {
                    return row.map((el) => {
                        return <Cell key={el.x + "-" + el.y} {...el} />});
                    });
                }())
            }
        </div>
    )
}

function cssField(width: number, height: number){
    let field: CSSProperties = {
        gridTemplateColumns: `repeat(${width}, auto)`,
        gridTemplateRows: `repeat(${height}, auto)`
    }
    return field;
}