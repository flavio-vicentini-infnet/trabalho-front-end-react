import { useEffect, useState } from "react";
import FormNovoCliente from "../components/clientes/FormNovoCLiente";
import { buscarClientes } from "../infra/clientes";
import ListaClientes from "../components/clientes/ListaClientes";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [clienteId, setClienteId] = useState("");

    const [formNovoClienteOpen, setFormNovoClienteOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (clienteId === "" || clientes.filter((item) => item.id === clienteId).length === 0) {
                let lista = await buscarClientes();
                setClientes(lista);
            }
        }

        fetchData();
    }, [clienteId]);

    return (
        <div>
            <h2>Clientes</h2>
            <button
                onClick={() => {
                    setFormNovoClienteOpen(true);
                }}
            >
                Novo Cliente
            </button>
            <br />
            {formNovoClienteOpen && <FormNovoCliente clienteId={clienteId} setClienteId={setClienteId} setFormNovoClienteOpen={setFormNovoClienteOpen} />}
            <ListaClientes clientes={clientes} setClienteId={setClienteId} />
        </div>
    );
}
