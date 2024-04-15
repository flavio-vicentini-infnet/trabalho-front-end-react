import React from "react";
import PizzaLinha from "./PizzaLinha";

export default function ListaPizzas({ pizzas = [], setPizzaId }) {
    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sabor</th>
                        <th scope="col">Tamanho</th>
                        <th scope="col">Preço</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas.map((pizza) => (
                        <PizzaLinha pizza={pizza} setPizzaId={setPizzaId} key={pizza.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
