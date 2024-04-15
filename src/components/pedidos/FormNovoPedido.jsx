import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { inserirPedido } from "../../infra/pedidos";
import { buscarClientes } from "../../infra/clientes";
import { buscarPizzas } from "../../infra/pizzas";

export default function FormNovoPedido({ pedidoId, setPedidoId, setFormNovoPedidoOpen }) {
    const [clientes, setClientes] = useState([]);
    const [pizzas, setPizzas] = useState([]);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        async function fetchData() {
            let clientes = await buscarClientes();
            setClientes(clientes);

            let pizzas = await buscarPizzas();
            setPizzas(pizzas);
        }

        fetchData();
    }, []);

    async function submeterDados(dados) {
        let novoPedido = { ...dados, horaPedido: new Date().toLocaleString("pt-BR") };
        let id = await inserirPedido(novoPedido);
        setPedidoId(!pedidoId);
        setFormNovoPedidoOpen(false);
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="cliente">
                        Cliente
                    </label>
                    <select name="cliente" {...register("cliente")} required>
                        <option></option>
                        {clientes.map((cliente) => (
                            <option value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </select>
                    <br />

                    <label className="formLabel" htmlFor="pizza">
                        Pizza
                    </label>
                    <select name="pizza" {...register("pizza")} required>
                        <option></option>
                        {pizzas.map((pizza) => (
                            <option value={pizza.id}>
                                {pizza.sabor} | {pizza.tamanho} | R$ {pizza.preco}
                            </option>
                        ))}
                    </select>
                    <br />

                    <button type="submit">salvar</button>
                    <button
                        type="button"
                        onClick={() => {
                            setFormNovoPedidoOpen(false);
                        }}
                    >
                        fechar
                    </button>
                </form>
            </div>
        </>
    );
}
