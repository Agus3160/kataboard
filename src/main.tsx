import { PomodoroProvider } from "./context/pomodoro/PomodoroProvider.tsx";
import { ProjectProvider } from "./context/project/ProjectProvider.tsx";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ProjectProvider>
    <PomodoroProvider>
      <App />
    </PomodoroProvider>
  </ProjectProvider>
);
