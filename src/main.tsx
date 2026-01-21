import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = document.getElementById("root")!;

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
