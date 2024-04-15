import React from "react";
import PedidoLinha from "./PedidoLinha";

export default function ListaPedidos({ pedidos = [], pedidoId, setPedidoId }) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Sabor</th>
                        <th scope="col">Tamanho</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Data</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <PedidoLinha pedido={pedido} pedidoId={pedidoId} setPedidoId={setPedidoId} key={pedido.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
