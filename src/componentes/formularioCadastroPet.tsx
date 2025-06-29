import React, { useState } from 'react';
import { Cliente, Pet } from "./dados";

type Props = {
    tema: string;
    cliente: Cliente | null;
    clientes: Cliente[];
    onSubmit: (cliente: Cliente | null, pet: Omit<Pet, 'produtosConsumidos' | 'servicosConsumidos'>) => void;
    onCancelar: () => void;
}

export default function FormularioCadastroPet(props: Props) {
    const { tema, cliente, clientes, onSubmit, onCancelar } = props;

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [genero, setGenero] = useState('Macho');

    const [clienteSelecionadoId, setClienteSelecionadoId] = useState<number | null>(() => {
        if (cliente) {
            return clientes.findIndex(c => c.email === cliente.email);
        }
        return null;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novoPet = {
            nome,
            tipo,
            raca,
            genero,
        };

        const donoDoPet = clienteSelecionadoId !== null
            ? clientes[clienteSelecionadoId]
            : cliente;

        onSubmit(donoDoPet, novoPet);
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{
                backgroundColor: tema,
                color: 'white',
                borderBottom: '2px solid rgba(255,255,255,0.1)'
            }}>
                <h5 className="mb-0 fw-bold">
                    <i className="bi bi-heart me-2"></i>
                    {cliente ? `Cadastrar Pet para ${cliente.nome}` : 'Cadastrar Pet'}
                </h5>
            </div>

            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    {!cliente && (
                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-person me-2" style={{ color: tema }}></i>
                                Dono do Pet
                            </h6>
                            <select
                                className="form-select rounded-2"
                                value={clienteSelecionadoId ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setClienteSelecionadoId(value ? parseInt(value) : null);
                                }}
                                required
                            >
                                <option value="">Selecione um cliente...</option>
                                {clientes.map((c, index) => (
                                    <option key={index} value={index}>
                                        {c.nome} ({c.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-4">
                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                            <i className="bi bi-heart-fill me-2" style={{ color: tema }}></i>
                            Dados do Pet
                        </h6>

                        <div className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="nome" className="form-label small fw-semibold">Nome do Pet*</label>
                                <input
                                    type="text"
                                    className="form-control rounded-2"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-semibold">Tipo*</label>
                                <input
                                    type="text"
                                    className="form-control rounded-2"
                                    name="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    placeholder="Ex: Cão, Gato, Calopsita..."
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-semibold">Raça*</label>
                                <input
                                    type="text"
                                    className="form-control rounded-2"
                                    name="raca"
                                    value={raca}
                                    onChange={(e) => setRaca(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-semibold">Gênero*</label>
                                <select
                                    className="form-select rounded-2"
                                    name="genero"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    required
                                >
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                    <option value="Não se aplica">Não se aplica</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary rounded-2 fw-semibold"
                            onClick={onCancelar}
                        >
                            <i className="bi bi-x-circle me-2"></i>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn rounded-2 fw-bold"
                            style={{
                                backgroundColor: tema,
                                color: 'white',
                                opacity: (!cliente && clienteSelecionadoId === null) ? 0.65 : 1
                            }}
                            disabled={!cliente && clienteSelecionadoId === null}
                        >
                            <i className="bi bi-save me-2"></i>
                            Cadastrar Pet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}