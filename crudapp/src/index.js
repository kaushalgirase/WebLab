import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./Components/App";
import Home from "./Components/Home";
import Register from "./Components/Register";
import ReactDOM from "react-dom";
import Show from "./Components/Show";
import Update from "./Components/Update";

var projectRoute = createBrowserRouter([{
    path: "/",
    element: <App></App>,
    children: [
        {
            path: "",
            element: <Home></Home>
        },
        {
            path: "register",
            element: <Register></Register>
        },
        {
            path: "show",
            element: <Show></Show>
        },
        {
            path: "update",
            element: <Update></Update>
        },
    ]
}]);
var ans = ReactDOM.createRoot(document.getElementById("root"));
ans.render(<RouterProvider router={projectRoute}></RouterProvider>);