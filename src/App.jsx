import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Pizzas from "./pages/Pizzas";
import Pedidos from "./pages/Pedidos";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="pizzas" element={<Pizzas />} />
                    <Route path="pedidos" element={<Pedidos />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
