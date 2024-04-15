import React, { useState } from "react";
import styled from "styled-components";
import { alterarCliente } from "../../infra/clientes";
import ReactInputMask from "react-input-mask";

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

function ModalContainer({ setOpen, cliente, setClienteId }) {
    const [clienteAlterado, setClienteAlterado] = useState(cliente);

    let handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setClienteAlterado(() => {
            const alteracao = {
                ...cliente,
                [fieldName]: fieldValue,
            };

            return alteracao;
        });
    };

    function close() {
        setOpen(false);
    }

    async function submit() {
        setClienteId(clienteAlterado.id);
        await alterarCliente(clienteAlterado);
        setClienteId("");
        close();
    }

    return (
        <>
            <ModalShadow onClick={close} left={"0px"} />
            <Modal>
                <ModalBanner>Alterando cliente</ModalBanner>

                <ModalContent>
                    <label className="formLabel" htmlFor="nome" style={{ marginBottom: 10 }}>
                        Nome
                        <input type="text" value={clienteAlterado.nome} name="nome" size={30} onChange={handleChange} />
                    </label>

                    <label className="formLabel" htmlFor="cpf" style={{ marginBottom: 10 }}>
                        CPF
                        <ReactInputMask mask={"999.999.999-99"} type="text" value={clienteAlterado.cpf} name="cpf" size={30} onChange={handleChange} />
                    </label>

                    <label className="formLabel" htmlFor="bairro" style={{ marginBottom: 10 }}>
                        Bairro
                        <input type="text" value={clienteAlterado.bairro} name="bairro" size={30} onChange={handleChange} />
                    </label>

                    <label className="formLabel" htmlFor="complemento" style={{ marginBottom: 10 }}>
                        Complemento
                        <input type="text" value={clienteAlterado.complemento} name="complemento" size={30} onChange={handleChange} />
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

export default function ModalNovoCliente({ cliente, setClienteId }) {
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
            {open && <ModalContainer cliente={cliente} setClienteId={setClienteId} setOpen={setOpen} />}
        </div>
    );
}
