import { excluirCliente } from "../../infra/clientes";
import ModalNovoCliente from "./ModalNovoCliente";

export default function ClienteLinha({ cliente, setClienteId }) {
    async function handleClickExcluir() {
        setClienteId(cliente.id);
        console.log("Excluindo cliente: ", cliente.id);
        await excluirCliente(cliente.id);
        setClienteId("");
    }

    function formatarCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return (
        <>
            <tr>
                <td>{cliente.nome.toUpperCase()}</td>
                <td>{formatarCPF(cliente.cpf)}</td>
                <td>{cliente.bairro.toUpperCase()}</td>
                <td>{cliente.complemento.toUpperCase()}</td>
                <td>
                    <ModalNovoCliente cliente={cliente} setClienteId={setClienteId} />
                </td>

                <td onClick={handleClickExcluir}>
                    <button>excluir</button>
                </td>
            </tr>
        </>
    );
}
