import { useEffect, useState } from "react";
import { buscarPedidos } from "../infra/pedidos.js";
import ListaPedidos from "../components/pedidos/ListaPedidos";
import FormNovoPedido from "../components/pedidos/FormNovoPedido.jsx";

export default function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [pedidoId, setPedidoId] = useState(true);

    const [formNovoPedidoOpen, setFormNovoPedidoOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let lista = await buscarPedidos();
            setPedidos(lista);
        }

        fetchData();
    }, [pedidoId]);

    return (
        <div>
            <h2>Pedidos</h2>
            <button
                onClick={() => {
                    setFormNovoPedidoOpen(true);
                }}
            >
                Novo Pedido
            </button>
            <br />
            {formNovoPedidoOpen && <FormNovoPedido setFormNovoPedidoOpen={setFormNovoPedidoOpen} pedidoId={pedidoId} setPedidoId={setPedidoId} />}
            <ListaPedidos pedidos={pedidos} pedidoId={pedidoId} setPedidoId={setPedidoId} />
        </div>
    );
}
