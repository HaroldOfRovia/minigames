import React, { CSSProperties, useEffect, useState } from "react"
import { Cell, MineCell } from "./Cell"
import '../../styles/minesweeper/Minesweeper.css'

export const Minesweeper = () => {
    let generated = false,
        lose = false, 
        width = 10,
        height = 10,
        bombs = Math.floor((width*height) / 10);
    const [cells, setCells] = useState<MineCell[][]>(initCells);

    function initCells(): MineCell[][]{
        let arr: MineCell[][] = [];
        for(let i = 0; i < width; i++){
            arr.push([]);
            for(let j = 0; j < height; j++)
                arr[i].push({ x: j, y: i, content: "", open: false });
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
            if(arr[y][x].content !== 'bomb'){
                arr[y][x].content = 'bomb';
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
                if (arr[i][j].content === "bomb")
                    count++;
            }
        }
        return count;
    }

    function setNumbers(arr: MineCell[][]){
        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                if(arr[i][j].content === 'bomb')
                    continue;
                let num = getNumCell(arr, j, i);
                if(num)
                    arr[i][j].content = num;
            }
        }
    }

    function generateGame(arr: MineCell[][], clickX: number, clickY: number){
        generated = true;
        setMines(arr, clickX, clickY);
        setNumbers(arr)
        console.log(arr);
        setCells([...arr]);
    }   

    function showArea(x: number, y: number, visited: string[]){
        cells[y][x].open = true;
        if (typeof cells[y][x].content === 'number')
            return;
        for (let i = y - 1; i < y + 2 && i < cells.length; i++){
            for (let j = x - 1; j < x + 2 && j < cells[0].length; j++){
                if (i < 0 || j < 0)
                    continue;
                if (i === y && j === x)
                    continue;
                if (visited.includes(""+j+i))
                    continue;
                visited.push(""+j+i);
                showArea(j, i, visited);
            }
        }
    }

    useEffect(()=>{
        document.getElementById('field')?.addEventListener('click', (e) => {
            const el = e.target as HTMLElement;
            let [x, y] = el.id.split("-");
            console.log(cells[+y][+x])
            if(!generated)
                generateGame(cells, +x, +y);
            cells[+y][+x].open = true;
            if(cells[+y][+x].content === '')
                showArea(+x, +y, []);
            else if (cells[+y][+x].content === 'bomb'){
                lose = true;
                alert("You gay!");
            }
            setCells([...cells]);
        }, true)
    }, []);

    return (
        <>
            <form id="gameSettings">
                <input placeholder="высота поля"></input>
                <input placeholder="ширина поля"></input>
                <input placeholder="кол-во мин"></input>
                <button>Обновить</button>
            </form>
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

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
