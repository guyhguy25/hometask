import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { FilterProvider } from "./context/FilterContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<FilterProvider>
				<App />
			</FilterProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
