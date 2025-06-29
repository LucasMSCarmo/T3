import React, { useState } from 'react';
import { Pet } from "./dados";

type Props = {
    tema: string;
    pet: Pet;
    onSalvar: (petAtualizado: Pet) => void;
    onCancelar: () => void;
}

export default function FormularioEdicaoPet(props: Props) {
    const { tema, pet, onSalvar, onCancelar } = props;

    const [nome, setNome] = useState(pet.nome);
    const [tipo, setTipo] = useState(pet.tipo);
    const [raca, setRaca] = useState(pet.raca);
    const [genero, setGenero] = useState(pet.genero);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const petAtualizado: Pet = {
            ...pet,
            nome: nome,
            tipo: tipo,
            raca: raca,
            genero: genero
        };
        onSalvar(petAtualizado);
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
                        <h5 className="modal-title fw-bold">
                            <i className="bi bi-pencil-square me-2"></i>
                            Editando: {pet.nome}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancelar}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <div className="mb-4">
                                <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                    <i className="bi bi-heart-fill me-2" style={{ color: tema }}></i>
                                    Dados do Pet
                                </h6>

                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label small fw-semibold">Nome do Pet*</label>
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
                                        <label className="form-label small fw-semibold">Tipo/Espécie*</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-2"
                                            name="tipo"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                            required
                                            placeholder="Ex: Cão, Gato, Pássaro..."
                                        />
                                    </div>

                                    <div className="col-md-12">
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
                        </div>

                        <div className="modal-footer border-top-0">
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
                                    padding: '0.5rem 1.5rem'
                                }}
                                disabled={!nome || !raca || !tipo}
                            >
                                <i className="bi bi-save me-2"></i>
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}