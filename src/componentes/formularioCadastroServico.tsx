import React, { useState } from 'react';
import { Servico } from "./dados";

type Props = {
    tema: string;
    onSubmit: (servico: Omit<Servico, 'id'>) => void;
}

export default function FormularioCadastroServico(props: Props) {
    const { tema, onSubmit } = props;

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !preco || !tipo) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const novoServico = {
            nome: nome,
            preco: parseFloat(preco),
            tipo: tipo
        };

        onSubmit(novoServico);

        setNome('');
        setPreco('');
        setTipo('');
    }

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{
                backgroundColor: tema,
                color: 'white',
                borderBottom: '2px solid rgba(255,255,255,0.1)'
            }}>
                <h5 className="mb-0 fw-bold">
                    <i className="bi bi-tools me-2"></i>
                    Cadastro de Serviço
                </h5>
            </div>

            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                            <i className="bi bi-clipboard2-data me-2" style={{ color: tema }}></i>
                            Dados do Serviço
                        </h6>

                        <div className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="nome" className="form-label small fw-semibold">Nome do Serviço*</label>
                                <input
                                    type="text"
                                    className="form-control rounded-2"
                                    id="nome"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    placeholder="Ex: Banho e Tosa, Consulta Veterinária..."
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="preco" className="form-label small fw-semibold">Preço (R$)*</label>
                                <div className="input-group">
                                    <span className="input-group-text rounded-start-2">R$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="form-control rounded-end-2"
                                        id="preco"
                                        name="preco"
                                        value={preco}
                                        onChange={(e) => setPreco(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="tipo" className="form-label small fw-semibold">Tipo de Serviço*</label>
                                <select
                                    className="form-select rounded-2"
                                    id="tipo"
                                    name="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione o tipo...</option>
                                    <option value="Higiene">Higiene</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Estética">Estética</option>
                                    <option value="Hotelaria">Hotelaria</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-lg rounded-2 fw-bold"
                            style={{
                                backgroundColor: tema,
                                color: 'white',
                                opacity: (!nome || !preco || !tipo) ? 0.65 : 1
                            }}
                            disabled={!nome || !preco || !tipo}
                        >
                            <i className="bi bi-save me-2"></i>
                            Cadastrar Serviço
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}