import { useEffect, useState } from "react";
import { buscarPizzas } from "../infra/pizzas";
import FormNovaPizza from "../components/pizzas/FormNovaPizza";
import ListaPizzas from "../components/pizzas/ListaPizzas";

export default function pizzas() {
    const [pizzas, setpizzas] = useState([]);
    const [pizzaId, setPizzaId] = useState("");

    const [formNovaPizzaOpen, setFormNovaPizzaOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let lista = await buscarPizzas();
            setpizzas(lista);
        }

        fetchData();
    }, [pizzaId]);

    return (
        <div>
            <h2>Pizzas</h2>
            <button
                onClick={() => {
                    setFormNovaPizzaOpen(true);
                }}
            >
                Nova Pizza
            </button>
            <br />
            {formNovaPizzaOpen && <FormNovaPizza setFormNovaPizzaOpen={setFormNovaPizzaOpen} setPizzaId={setPizzaId} />}
            <ListaPizzas pizzas={pizzas} setPizzaId={setPizzaId} />
        </div>
    );
}
