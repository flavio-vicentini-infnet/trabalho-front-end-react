import { deslogarUsuario } from "../../infra/usuarios";

export default function Logout({ user, setUser }) {
    let handleLogout = (event) => {
        console.log("Usuário saindo: ", user);
        deslogarUsuario(user, setUser);
    };

    return (
        <a onClick={handleLogout}>
            <b>Sair</b>
        </a>
    );
}
