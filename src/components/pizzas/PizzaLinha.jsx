import { excluirPizza } from "../../infra/pizzas";
import ModalNovaPizza from "./ModalNovaPizza";

export default function PizzaLinha({ pizza, setPizzaId }) {
    async function handleClickExcluir() {
        setPizzaId(pizza.id);
        await excluirPizza(pizza.id);
        setPizzaId("");
    }

    return (
        <>
            <tr>
                <td>{pizza.sabor.toUpperCase()}</td>
                <td>{pizza.tamanho.toUpperCase()}</td>
                <td>R$ {parseFloat(pizza.preco).toFixed(2)}</td>
                <td>
                    <ModalNovaPizza pizza={pizza} setPizzaId={setPizzaId} />
                </td>

                <td onClick={handleClickExcluir}>
                    <button>excluir</button>
                </td>
            </tr>
        </>
    );
}
