import { logarUsuario } from "../../infra/usuarios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ user, setUser }) {
    let handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setUser((actualUser) => {
            const userInfos = {
                ...actualUser,
                [fieldName]: fieldValue,
            };

            return userInfos;
        });
    };

    let handleLogin = (event) => {
        logarUsuario(user, setUser);
    };

    return (
        <Form action="/layout" style={{ margin: "200px" }}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Digite seu email" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="senha">Senha</Form.Label>
                <Form.Control type="password" name="senha" placeholder="Insira sua senha" onChange={handleChange} />
            </Form.Group>
            <Button as="input" type="button" value="Entrar" onClick={handleLogin} />{" "}
        </Form>
    );
}
