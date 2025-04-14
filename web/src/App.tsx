import { useEffect, useState } from "react";
import Minesweeper from "./components/Minesweeper";
type Level = {
  number: number;
  size: number;
  mine: number;
};
function App() {
  const levels: Level[] = [
    { number: 1, size: 5, mine: 4 },
    { number: 2, size: 6, mine: 7 },
    { number: 3, size: 8, mine: 16 },
    { number: 4, size: 10, mine: 30 },
    { number: 5, size: 12, mine: 49 },
    { number: 6, size: 15, mine: 85 },
    { number: 7, size: 16, mine: 105 },
    { number: 8, size: 20, mine: 176 },
    { number: 9, size: 25, mine: 293 },
    { number: 10, size: 30, mine: 441 },
  ];
  const [currentlevel, setCurrentlevel] = useState<Level>(levels[0]);
  const [wasmReady, setWasmReady] = useState<boolean>(false);
  useEffect(()=> {
    async function initWasm() {
      try {
        const wasm = await import('@/assets/pkg/minesweeper.js');
        await wasm.default();
        setWasmReady(true);
      } catch (error) {
        console.error("Wasm initilization failed:", error);
      }
    }
    initWasm();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="h-16 bg-blue-500 text-white flex items-center justify-center p-4">
        <h1 className="text-xl font-semibold mr-4">Minesweeper</h1>
        <select
          id="level"
          value={currentlevel.number}
          onChange={(e)=> {
            const level = levels.find((l)=>l.number === Number(e.target.value));
            if (level) setCurrentlevel(level);
          }}
          className="p-2 rounded text-gray-800"
          aria-label="Select game level"
        >
          {levels.map((level)=>(
            <option key={level.number} value={level.number}>
              Level {level.number}
            </option>
          ))}
        </select>
      </header>
      <main className="flex-1 flex items-center justify-center  p-4">
        {wasmReady ? (
          <Minesweeper boardSize={currentlevel.size} mineCount={currentlevel.mine} />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </main>
    </div>
  );
};

export default App;
