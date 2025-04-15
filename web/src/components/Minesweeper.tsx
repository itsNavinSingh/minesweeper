import React, { useEffect, useRef, useState } from "react";
import gameOverSound from "@/assets/audiofile.mp3";

interface Board {
    get_show_code(x: number, y: number): number;
    dig_cell(x: number, y: number): boolean;
    toggle_flag(x: number, y: number): void;
    is_completed(): boolean;
    get_final_code(x: number, y: number): number;
}
interface MinesweeperProf{
    boardSize: number;
    mineCount: number;
    nextLevel: () => void;
    className?: string;
}
const Minesweeper: React.FC<MinesweeperProf> = ({boardSize, mineCount, nextLevel, className = ""}: MinesweeperProf) => {
    const [board, setBoard] = useState<Board | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [error, setError] = useState<string | null >(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const cellSize = 40;

    useEffect(()=>{
        async function createBoard() {
            try {
                const wasm = await import('@/assets/pkg/minesweeper.js');
                const newBoard = new wasm.Board(boardSize, mineCount);
                setBoard(newBoard);
            } catch (error) {
                console.error('Failed to create Board:', error);
                setError("Failed to initialize game");
            }
        }
        createBoard();
    }, [boardSize, mineCount]);

    useEffect(()=>{
        if (!board || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
            setError("Canvas context unavailable");
            return;
        }
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const drawBoard = () => {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            for (let y = 0; y < boardSize; y++) {
                for (let x = 0; x < boardSize; x++) {
                    let code;
                    try {
                        code = board.get_show_code(x, y);
                    } catch(error) {
                        console.error(`get_show_code(${x}, ${y}) failed: `, error);
                        code = 10;
                    }
                    const isEven = (x+y)%2 === 0;
                    ctx.fillStyle =
                        code === 10
                            ? isEven
                                ? '#d1d5db'
                                : '#e5e7eb'
                            : code === 9
                            ? '#f87171'
                            : code === 11
                            ? '#000000'
                            : isEven
                            ? '#f3f4f6'
                            : '#ffffff';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    ctx.strokeStyle = '#374151';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

                    if (code >= 0 && code <= 8) {
                        ctx.fillStyle = '#1f2937';
                        ctx.fillText(code.toString(), x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
                    }
                }
            }
        };
        try {
            drawBoard();
        } catch (error) {
            console.error("drawBoard failed: ", error);
            setError('Failed to render game');
        }
    }, [board, updateCounter, boardSize]);
    useEffect(()=> {
        if (gameOver) {
            drawFinalBoard();
        }
    }, [gameOver]);

    const drawFinalBoard = () => {
        if (!canvasRef.current || !board) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                let code;
                try {
                    code = board.get_final_code(x, y);
                } catch (error) {
                    console.error(`get_final_code(${x}, ${y}) failed: `, error);
                    code = 10;
                }
                const isEven = (x + y) % 2 === 0;
                ctx.fillStyle =
                    code === 10
                        ? isEven
                            ? '#d1d5db'
                            : '#e5e7eb'
                        : code === 11
                        ? '#ffffff'
                        : isEven
                        ? '#f3f4f6'
                        : '#ffffff'
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeStyle = '#374151';
                ctx.lineWidth = 1;
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
                if (code >= 0 && code <= 8) {
                    ctx.fillStyle = '#1f2937';
                    ctx.fillText(code.toString(), x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
                }else if (code === 11) {
                    ctx.fillText("💣", x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
                }
            }
        }
    }

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!board || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);

        if (event.shiftKey) {
            board.toggle_flag(x, y);
        } else {
            const result = board.dig_cell(x, y);
            if (!result) {
                setGameOver(true);
                const audio = new Audio(gameOverSound);
                audio.play();
            }
        }
        setUpdateCounter((prev)=>prev+1);
        if (board.is_completed()) {
            alert("Congratulations! You  won!");
        }
    };

    const resetBoard = async () => {
        try {
            const wasm = await import('@/assets/pkg/minesweeper.js');
            const newBoard = new wasm.Board(boardSize, mineCount);
            setBoard(newBoard);
            setUpdateCounter(0);
            setGameOver(false);
            setError(null);
        } catch (error) {
            console.error('Failed to reset Board: ', error);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-xl font-medium text-red-500">{error? error : ""}</p>
            <canvas
                ref={canvasRef}
                width={boardSize * cellSize}
                height={boardSize * cellSize}
                onClick={handleCanvasClick}
                className={`border border-gray-800 shadow-lg ${className}`}
            />
           <div className="flex space-x-4">
           <button
                onClick={resetBoard}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Reset Game
            </button>
            <button
                onClick={nextLevel}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Next Level
            </button>
           </div>
        </div>
    );
}

export default Minesweeper;