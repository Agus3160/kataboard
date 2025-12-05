import Typography from "./components/shared/Typography";
import { useProjectContext } from "./context/useProjectContext";
import Board from "./components/Board";

function App() {
  const { title } = useProjectContext();
  return (
    <div className="p-8 space-y-6">
      <Typography variant="h1">{title}</Typography>
      <Board />
    </div>
  );
}

export default App;
