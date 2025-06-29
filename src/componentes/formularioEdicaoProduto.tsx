import React, { useState } from 'react';
import { Produto } from "./dados";

type Props = {
    tema: string;
    produto: Produto;
    onSalvar: (produto: Produto) => void;
    onCancelar: () => void;
}

export default function FormularioEdicaoProduto(props: Props) {
    const { tema, produto, onSalvar, onCancelar } = props;

    const [preco, setPreco] = useState(produto.preco.toString());
    const [tipo, setTipo] = useState(produto.tipo);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const produtoAtualizado: Produto = {
            nome: produto.nome,
            preco: parseFloat(preco),
            tipo: tipo,
        };

        onSalvar(produtoAtualizado);
    }

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header py-3" style={{
                        backgroundColor: tema,
                        color: 'white',
                        borderBottom: '2px solid rgba(255,255,255,0.1)'
                    }}>
                        <h5 className="modal-title fw-bold mb-0">
                            <i className="bi bi-pencil-square me-2"></i>
                            Editando Produto: {produto.nome}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onCancelar}
                            aria-label="Fechar"
                        ></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <div className="mb-4">
                                <label htmlFor="preco" className="form-label small fw-semibold">
                                    <i className="bi bi-currency-dollar me-2" style={{ color: tema }}></i>
                                    Preço (R$)*
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control rounded-2"
                                    id="preco"
                                    name="preco"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tipo" className="form-label small fw-semibold">
                                    <i className="bi bi-tags me-2" style={{ color: tema }}></i>
                                    Tipo de Produto*
                                </label>
                                <select
                                    className="form-select rounded-2"
                                    id="tipo"
                                    name="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    required
                                >
                                    <option value="Alimento">Alimento</option>
                                    <option value="Higiene">Higiene</option>
                                    <option value="Brinquedo">Brinquedo</option>
                                    <option value="Acessório">Acessório</option>
                                    <option value="Saúde">Saúde</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer border-top-0 px-4 pb-4 pt-0">
                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-2 px-4"
                                onClick={onCancelar}
                            >
                                <i className="bi bi-x-lg me-2"></i>
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn rounded-2 px-4 fw-semibold"
                                style={{
                                    backgroundColor: tema,
                                    color: 'white',
                                    border: 'none'
                                }}
                            >
                                <i className="bi bi-check-lg me-2"></i>
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}