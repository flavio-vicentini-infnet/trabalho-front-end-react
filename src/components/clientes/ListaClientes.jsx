import ClienteLinha from "./ClienteLinha";

export default function ListaClientes({ clientes, setClienteId }) {
    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Bairro</th>
                        <th scope="col">Complemento</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <ClienteLinha cliente={cliente} setClienteId={setClienteId} key={cliente.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
