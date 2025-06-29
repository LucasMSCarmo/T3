import React, { useState } from 'react';
import { Servico } from "./dados";

type Props = {
    tema: string;
    servico: Servico;
    onSalvar: (servico: Servico) => void;
    onCancelar: () => void;
}

export default function FormularioEdicaoServico(props: Props) {
    const { tema, servico, onSalvar, onCancelar } = props;

    const [preco, setPreco] = useState(servico.preco.toString());
    const [tipo, setTipo] = useState(servico.tipo);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const servicoAtualizado: Servico = {
            nome: servico.nome,
            preco: parseFloat(preco),
            tipo: tipo
        };
        onSalvar(servicoAtualizado);
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
                            Editando Serviço: {servico.nome}
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
                                    <i className="bi bi-tag me-2" style={{ color: tema }}></i>
                                    Tipo de Serviço*
                                </label>
                                <select
                                    className="form-select rounded-2"
                                    id="tipo"
                                    name="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    required
                                >
                                    <option value="Higiene">Higiene</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Estética">Estética</option>
                                    <option value="Hotelaria">Hotelaria</option>
                                    <option value="Outro">Outro</option>
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