import React, { useState } from "react";
import styled from "styled-components";
import { alterarPizza } from "../../infra/pizzas";

const Modal = styled.div`
    max-width: 500px;
    background-color: white;
    position: fixed;
    top: 75px;
    z-index: 5;
    max-height: calc(100% - 200px);
    left: calc(50% - 250px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
        left: 0px;
        margin: 0px 10px;
    }
`;

export const ModalContent = styled.div`
    overflow: auto;
    min-height: 200px;
    padding: 0px 40px;
    padding-bottom: 80px;
`;

export const ModalFooter = styled.div`
    box-shadow: 0px -2px 10px 0px grey;
    display: flex;
    padding: 8px;
    justify-content: center;
`;

export const Button = styled.button`
    padding: 4px;
    color: white;
    height: 40px;
    font-size: 16px;
    text-transform: uppercase;
    border: 0px;
    align-self: center;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    width: 200px;
    cursor: pointer;
    background-color: gray;
    margin: 10px;
`;

const ModalShadow = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    background-color: black;
    opacity: 0.7;
    z-index: 4;
`;

const ModalBanner = styled.div`
    margin-bottom: 20px;
    background-color: gray;
    color: white;
    padding: 10px;
`;

function ModalContainer({ setOpen, pizza, setPizzaId }) {
    const [pizzaAlterada, setPizzaAlterada] = useState(pizza);

    let handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setPizzaAlterada((pizzaAlterada) => {
            const alteracao = {
                ...pizza,
                [fieldName]: fieldValue,
            };

            return alteracao;
        });
    };

    function close() {
        setOpen(false);
    }

    async function submit() {
        setPizzaId(pizzaAlterada.id);
        pizzaAlterada.sabor = pizzaAlterada.sabor.toUpperCase();
        pizzaAlterada.tamanho = pizzaAlterada.tamanho.toUpperCase();
        pizzaAlterada.preco = parseFloat(pizzaAlterada.preco).toFixed(2);
        await alterarPizza(pizzaAlterada);
        setPizzaId("");
        close();
    }

    return (
        <>
            <ModalShadow onClick={close} left={"0px"} />
            <Modal>
                <ModalBanner>Alterando pizza</ModalBanner>

                <ModalContent>
                    <label className="formLabel" htmlFor="sabor" style={{ marginBottom: 10 }}>
                        Sabor
                        <input type="text" value={pizzaAlterada.sabor} name="sabor" size={30} onChange={handleChange} />
                    </label>

                    <label className="formLabel" htmlFor="tamanho" style={{ marginBottom: "10px" }}>
                        Tamanho
                        <div>
                            <select name="tamanho" value={pizzaAlterada.tamanho}>
                                <option value="media">MÉDIA</option>
                                <option value="grande">GRANDE</option>
                            </select>
                        </div>
                    </label>

                    <label className="formLabel" htmlFor="preco" style={{ marginBottom: 10 }}>
                        Preço
                        <input type="number" value={pizzaAlterada.preco} name="preco" size={30} onChange={handleChange} step={"0.01"} placeholder="10.00" min={10.0} max={100.0} />
                    </label>
                </ModalContent>

                <ModalFooter>
                    <Button onClick={submit}> Alterar </Button>
                    <Button onClick={() => close()}> Fechar </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default function ModalNovaPizza({ pizza, setPizzaId }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => {
                    setOpen(true);
                }}
            >
                alterar
            </button>
            {open && <ModalContainer pizza={pizza} setPizzaId={setPizzaId} setOpen={setOpen} />}
        </div>
    );
}
