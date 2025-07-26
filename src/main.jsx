import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/DashBoard/Dashboard.jsx";
import Hero from "./components/Hero.jsx";
import MigratePage from "./components/Migrate/Migrate.jsx";

const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Hero />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/migrate" element={<MigratePage />} />
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={Router} />
);
