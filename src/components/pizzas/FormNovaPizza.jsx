import React from "react";
import { useForm } from "react-hook-form";
import { inserirPizza } from "../../infra/pizzas";

export default function FormNovaPizza({ setPizzaId, setFormNovaPizzaOpen }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function submeterDados(dados) {
        let novaPizza = { ...dados, sabor: dados.sabor.toUpperCase(), tamanho: dados.tamanho.toUpperCase(), preco: parseFloat(dados.preco).toFixed(2) };
        let id = await inserirPizza(novaPizza);
        setPizzaId(id);
        setFormNovaPizzaOpen(false);
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="sabor">
                        Sabor
                    </label>
                    <input size={30} {...register("sabor")} />
                    <br />

                    <label className="formLabel" htmlFor="tamanho">
                        Tamanho
                    </label>
                    <select name="tamanho" {...register("tamanho")}>
                        <option value="media">MÉDIA</option>
                        <option value="grande">GRANDE</option>
                    </select>

                    <br />

                    <label className="formLabel" htmlFor="preco">
                        Preço
                    </label>
                    <input size={30} {...register("preco")} type="number" step={"0.01"} placeholder="10.00" min={10.0} max={100.0} />
                    <br />

                    <button type="submit">salvar</button>
                    <button
                        type="button"
                        onClick={() => {
                            setFormNovaPizzaOpen(false);
                        }}
                    >
                        fechar
                    </button>
                </form>
            </div>
        </>
    );
}
