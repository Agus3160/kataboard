import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProjectProvider } from "./context/ProjectProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ProjectProvider>
    <App />
  </ProjectProvider>
);
