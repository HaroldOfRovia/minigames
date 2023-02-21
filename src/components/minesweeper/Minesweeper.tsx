import React, { CSSProperties, useEffect, useState } from "react"
import { Cell, MineCell } from "./Cell"
import '../../styles/minesweeper/Minesweeper.css'

export const Minesweeper = () => {
    let generated = false,
        lose = false, 
        width = 25,
        height = 25,
        bombs = Math.floor((width*height) / 10);
    const [cells, setCells] = useState<MineCell[][]>(initCells);

    function initCells(): MineCell[][]{
        let arr: MineCell[][] = [];
        for(let i = 0; i < width; i++){
            arr.push([]);
            for(let j = 0; j < height; j++)
                arr[i].push({ x: j, y: i, content: 0, open: false, bomb: false, flag: false });
        }
        return arr;
    }

    function setMines(arr: MineCell[][], clickX: number, clickY: number){
        let placedBombs = 0;
        for(let i = 0; placedBombs < bombs; i++){
            let x = Math.floor(Math.random() * width),
                y = Math.floor(Math.random() * height);
            if(clickX === x && clickY === y)
                continue;
            if(!arr[y][x].bomb){
                arr[y][x].bomb = true;
                placedBombs++;
            }
        }
    }

    function getNumCell(arr: MineCell[][], x: number, y: number){
        let count = 0;
        for (let i = y - 1; i < y + 2 && i < arr.length; i++){
            for (let j = x - 1; j < x + 2 && j < arr[0].length; j++){
                if (i < 0 || j < 0)
                    continue;
                if (arr[i][j].bomb)
                    count++;
            }
        }
        return count;
    }

    function setNumbers(arr: MineCell[][]){
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                if(arr[i][j].bomb)
                    continue;
                arr[i][j].content = getNumCell(arr, j, i);
            }
        }
    }

    function generateGame(arr: MineCell[][], clickX: number, clickY: number){
        generated = true;
        setMines(arr, clickX, clickY);
        setNumbers(arr)
        setCells([...arr]);
    }   

    function showArea(x: number, y: number, visited: string[]){
        cells[y][x].open = true;
        if (cells[y][x].content > 0)
            return;
        for (let i = y - 1; i < y + 2 && i < cells.length; i++){
            for (let j = x - 1; j < x + 2 && j < cells[0].length; j++){
                if (i < 0 || j < 0)
                    continue;
                if (i === y && j === x)
                    continue;
                if (visited.includes(j+"-"+i))
                    continue;
                visited.push(j+"-"+i);
                showArea(j, i, visited);
            }
        }
    }

    function showBombs(){
        for(let i = 0; i < cells.length; i++){
            for(let j = 0; j < cells[0].length; j++){
                if (cells[i][j].bomb)
                    cells[i][j].open = true;
            }
        }
    }

    useEffect(()=>{
        document.getElementById('field')?.addEventListener('click', (e) => {
            if(lose)
                return;

            const el = e.target as HTMLElement;
            let [x, y] = el.id.split("-");
            if(!generated)
                generateGame(cells, +x, +y);

            cells[+y][+x].open = true;
            cells[+y][+x].flag = false;
            if (cells[+y][+x].bomb){
                showBombs();
                lose = true;
            }
            else if(cells[+y][+x].content <= 0)
                showArea(+x, +y, []);
            setCells([...cells]);
        }, true)

        document.getElementById('field')?.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if(lose || !generated)
                return;
            const el = e.target as HTMLElement;
            let [x, y] = el.id.split("-");
            cells[+y][+x].flag = !cells[+y][+x].flag;
            setCells([...cells]);
        })
    }, []);

    function reset(e: any){
        e.preventDefault();
        generated = false;
        lose = false;
        bombs = Math.floor((width*height) / 10);
        let arr = initCells();
        console.log(arr);
        setCells(arr);
    }

    return (
        <>
            {/* <form id="gameSettings">
                <input placeholder="размер поля"></input>
                <input placeholder="кол-во мин"></input>
                <button onClick={ reset }>Обновить</button>
            </form> */}
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
        </>
    )
}

function cssField(width: number, height: number){
    let field: CSSProperties = {
        gridTemplateColumns: `repeat(${width}, auto)`,
        gridTemplateRows: `repeat(${height}, auto)`
    }
    return field;
}
