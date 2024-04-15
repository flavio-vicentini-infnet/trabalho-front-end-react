import { useEffect, useState } from "react";
import { buscarPizzaPorId } from "../../infra/pizzas";
import { buscaCliente } from "../../infra/clientes";
import { excluirPedido } from "../../infra/pedidos";

export default function PedidoLinha({ pedido, pedidoId, setPedidoId }) {
    const [cliente, setCliente] = useState({});
    const [pizza, setPizza] = useState({});

    useEffect(() => {
        async function fetchData() {
            let cliente = await buscaCliente(pedido.cliente);
            setCliente(cliente);

            let pizza = await buscarPizzaPorId(pedido.pizza);
            setPizza(pizza);
        }

        fetchData();
    }, []);

    async function handleClickExcluir() {
        await excluirPedido(pedido.id);
        setPedidoId(!pedidoId);
    }

    return (
        <>
            <tr>
                <td>{cliente.nome}</td>
                <td>{pizza.sabor}</td>
                <td>{pizza.tamanho}</td>
                <td>R$ {pizza.preco}</td>
                <td>{pedido.horaPedido.toString()}</td>
                <td onClick={handleClickExcluir}>
                    <button>excluir</button>
                </td>
            </tr>
        </>
    );
}
