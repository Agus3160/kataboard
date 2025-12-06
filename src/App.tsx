import Board from "./components/Board";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="flex flex-col gap-4 h-screen custom-scroll">
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
