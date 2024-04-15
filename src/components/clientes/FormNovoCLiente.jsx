import React from "react";
import { useForm } from "react-hook-form";
import { inserirCliente } from "../../infra/clientes";

export default function FormNovoCliente({ setClienteId, setFormNovoClienteOpen }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function submeterDados(dados) {
        let novoCliente = { ...dados, nome: dados.nome.toUpperCase(), bairro: dados.bairro.toUpperCase(), complemento: dados.complemento.toUpperCase() };
        let id = await inserirCliente(novoCliente);
        setClienteId(id);
        setFormNovoClienteOpen(false);
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="nome">
                        Nome
                    </label>
                    <input
                        size={30}
                        {...register("nome", {
                            required: "Nome do cliente é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 3 || "Nome do cliente deve ter pelo menos 3 caracteres",
                            },
                        })}
                    />
                    <br />

                    <label className="formLabel" htmlFor="cpf">
                        CPF
                    </label>
                    <input
                        size={30}
                        {...register("cpf", {
                            required: "CPF é obrigatório",
                            validate: {
                                minLength: (value) => value.length == 11 || "CPF tem que ter 11 dígitos",
                                matchPattern: (value) => /^[0-9]+$/g.test(value) || "CPF não pode conter caracteres que não sejam dígitos",
                            },
                        })}
                    />
                    <br />

                    <label className="formLabel" htmlFor="bairro">
                        Bairro
                    </label>
                    <input
                        size={30}
                        {...register("bairro", {
                            required: "Bairro é obrigatório",
                        })}
                    />
                    <br />

                    <label className="formLabel" htmlFor="complemento">
                        Complemento
                    </label>
                    <input
                        size={30}
                        {...register("complemento", {
                            required: "Complemento é obrigatório",
                        })}
                    />
                    <br />

                    <button type="submit">salvar</button>
                    <button
                        type="button"
                        onClick={() => {
                            setFormNovoClienteOpen(false);
                        }}
                    >
                        fechar
                    </button>
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nome?.message && <div>{errors.nome.message}</div>}
                {errors.cpf?.message && <div>{errors.cpf.message}</div>}
                {errors.bairro?.message && <div>{errors.bairro.message}</div>}
                {errors.complemento?.message && <div>{errors.complemento.message}</div>}
            </div>
        </>
    );
}
