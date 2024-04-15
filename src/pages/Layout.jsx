import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import BarraLogin from "../components/login/BarraLogin";
import Logout from "../components/login/Logout";

export default function Layout() {
    const [user, setUser] = useState({
        id: "",
        email: "",
        senha: "",
    });

    if (user.id) {
        return (
            <div>
                <nav>
                    <ul>
                        <p>
                            Usuario: <b>{user.email}</b>
                        </p>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/clientes"}>Clientes</Link>
                        </li>
                        <li>
                            <Link to={"/pizzas"}>Pizzas</Link>
                        </li>
                        <li>
                            <Link to={"/pedidos"}>Pedidos</Link>
                        </li>
                        <li>
                            <Logout user={user} setUser={setUser} />
                        </li>
                    </ul>
                </nav>
                <Outlet context={[user, useState]} />
            </div>
        );
    } else {
        return <BarraLogin user={user} setUser={setUser} />;
    }
}
