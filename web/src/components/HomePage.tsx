import { Github } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="w-full h-14 bg-gray-900 flex items-center px-6">
        <p className="text-2xl font-semibold text-white font-mono">
          Minesweeper.wasm
        </p>
        <div className="flex-1"></div>
        <div className="flex space-x-4 items-center">
          <a
            href="/play"
            className="text-white font-semibold text-2xl hover:text-blue-300"
          >
            Play
          </a>
          <a
            href="/about"
            className="text-white font-semibold text-2xl hover:text-blue-400"
          >
            About
          </a>
          <a
            href="https://github.com/itsNavinSingh/minesweeper"
            className="bg-gray-500 p-2 rounded hover:bg-white"
          >
            <Github />
          </a>
        </div>
      </div>
      <div className="w-full text-white px-6 space-y-2 mt-4">
        <div className="w-full">
          <h1 className="font-bold text-2xl mb-2">Introdution</h1>
          <p className="font-medium font-mono">
            Minesweeper is a classic single-player puzzle game that challenges
            player to clear a grid filled with hidden mines without detonating
            any of them. The game combines logic, strategy, and a bit of luck,
            making it both engaging and mentally stimulating. Each cell in the
            grid can either contain a mine or be empty. When a player clicks on
            a cell that does not contain a mine, the game reveals a number
            indicating how many neighbouring cells contain mines. Using these
            clues, the player must deduce the locations of the hidden mines and
            mark them with flags. The objective is to reveal all the non-mine
            cells and flag all mine cells without triggering a mine. With
            increaseing deffuculty levels. Minesweeper offers a progressively
            challenging experience that sharpens analytical thinking and
            decision-making skills.
          </p>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-2xl pb-2">Rules</h1>
          <p className="font-medium font-mono px-6">
            <ul className="text-white">
              <li>
                Find and mark all the hidden mines without clicking on them.
              </li>
              <li>You win by opening all the cells that don't have mines.</li>
              <li>The board is a grid of squares.</li>
              <li>Some squares have mines, other are safe.</li>
              <li>Each game has a set number of hidden mines.</li>
              <li>
                <span className="font-bold bg-gray-700 rounded">
                  Left-click:
                </span>{" "}
                Opens the square
              </li>
              <li>
                If it has mine,{" "}
                <span className="font-bold bg-gray-700 rounded">Game Over</span>
              </li>
              <li>If it's safe, it shows a number.</li>
              <li>
                <span className="font-bold bg-gray-700 rounded">
                  Shift + Left-click:
                </span>{" "}
                Marks the square with a flag.
              </li>
              <li>
                When you click on a safe square, it shows a number from 0 to 8.
              </li>
              <li>
                This numbers tells how many mines are in the 8 surrounding
                squares.
              </li>
              <li>
                <span className="font-bold bg-gray-700 rounded">
                  Shift + Left-click
                </span>{" "}
                to place a flag where you think a mine is.
              </li>
              <li>
                <span className="font-bold bg-gray-700 rounded">
                  Shift + Left-click
                </span>{" "}
                again to remove it.
              </li>
              <li>If you click on a square with a mine, you lose.</li>
              <li>Open all the non-mine and flag mine squares to win.</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-6">
        <div className="w-full">
          <h1 className="font-bold text-2xl pb-2 text-white">Levels</h1>
        </div>
        <table className="table-fixed text-white w-[50%] border-t border-white text-center text-xl">
          <thead>
            <tr className="border-b border-white border-x bg-gray-900">
              <th className="border-r border-white">Level</th>
              <th className="border-r border-white">Shape</th>
              <th>Mines</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white border-x">
              <td className="border-r border-white">1</td>
              <td className="border-r border-white">5x5</td>
              <td>4</td>
            </tr>
            <tr className="border-b border-white border-x bg-gray-900">
              <td className="border-r border-white">2</td>
              <td className="border-r border-white">6x6</td>
              <td>7</td>
            </tr>
            <tr className="border-b border-white border-x">
              <td className="border-r border-white">3</td>
              <td className="border-r border-white">8x8</td>
              <td>16</td>
            </tr>
            <tr className="border-b border-white border-x bg-gray-900">
              <td className="border-r border-white">4</td>
              <td className="border-r border-white">10x10</td>
              <td>30</td>
            </tr>
            <tr className="border-b border-white border-x">
              <td className="border-r border-white">5</td>
              <td className="border-r border-white">12x12</td>
              <td>49</td>
            </tr>
            <tr className="border-b border-white border-x bg-gray-900">
              <td className="border-r border-white">6</td>
              <td className="border-r border-white">15x15</td>
              <td>85</td>
            </tr>
            <tr className="border-b border-white border-x">
              <td className="border-r border-white">7</td>
              <td className="border-r border-white">16x16</td>
              <td>105</td>
            </tr>
            <tr className="border-b border-white border-x bg-gray-900">
              <td className="border-r border-white">8</td>
              <td className="border-r border-white">20x20</td>
              <td>176</td>
            </tr>
            <tr className="border-b border-white border-x">
              <td className="border-r border-white">9</td>
              <td className="border-r border-white">25x25</td>
              <td>293</td>
            </tr>
            <tr className="border-b border-white border-x bg-gray-900">
              <td className="border-r border-white">10</td>
              <td className="border-r border-white">30x30</td>
              <td>441</td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer className="h-10 w-full text-white items-center flex flex-col justify-center bg-gray-900 mt-4 italic">
        <p>@itsNavinSingh</p>
      </footer>
    </div>
  );
};

export default HomePage;
