import React, { useState } from 'react';
import { Cliente, RG } from "./dados";

type Props = {
    tema: string;
    cliente: Cliente;
    onSalvar: (clienteEditado: Cliente) => void;
    onFechar: () => void;
}

export default function FormularioEdicaoCliente(props: Props) {
    const { tema, cliente, onSalvar, onFechar } = props;

    const [nome, setNome] = useState(cliente.nome);
    const [nomeSocial, setNomeSocial] = useState(cliente.nomeSocial);
    const [email, setEmail] = useState(cliente.email);
    const [cpf, setCpf] = useState(cliente.cpf);
    const [telefones, setTelefones] = useState(cliente.telefones.join(', '));

    const [rgs, setRgs] = useState(cliente.rgs.map(rg => ({
        numero: rg.numero,
        dataEmissao: rg.dataEmissao.toISOString().split('T')[0]
    })));
    const [rgTemp, setRgTemp] = useState({ numero: '', dataEmissao: '' });

    const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRgTemp(prev => ({ ...prev, [name]: value }));
    };

    const adicionarRg = () => {
        if (!rgTemp.numero || !rgTemp.dataEmissao) {
            alert("Por favor, preencha o número e a data de emissão do RG.");
            return;
        }
        setRgs(prevRgs => [...prevRgs, rgTemp]);
        setRgTemp({ numero: '', dataEmissao: '' });
    };

    const removerRg = (indexToRemove: number) => {
        setRgs(prevRgs => prevRgs.filter((_, index) => index !== indexToRemove));
    };

    const handleSalvar = (event: React.FormEvent) => {
        event.preventDefault();

        const clienteEditado: Cliente = {
            ...cliente,
            nome: nome,
            nomeSocial: nomeSocial,
            email: email,
            cpf: cpf,
            telefones: telefones.split(',').map(t => t.trim()).filter(t => t),
            rgs: rgs.map(rg => ({
                numero: rg.numero,
                dataEmissao: new Date(rg.dataEmissao + 'T00:00:00')
            }))
        };

        onSalvar(clienteEditado);
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header py-3" style={{
                        backgroundColor: tema,
                        color: 'white',
                        borderBottom: '2px solid rgba(255,255,255,0.1)'
                    }}>
                        <h5 className="modal-title fw-bold">
                            <i className="bi bi-pencil-square me-2"></i>
                            Editando Cliente: {cliente.nome}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onFechar}></button>
                    </div>

                    <form onSubmit={handleSalvar}>
                        <div className="modal-body p-4">
                            <div className="mb-4">
                                <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                    <i className="bi bi-person-lines-fill me-2" style={{ color: tema }}></i>
                                    Dados Pessoais
                                </h6>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Nome Completo*</label>
                                        <input type="text" className="form-control rounded-2" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Nome Social</label>
                                        <input type="text" className="form-control rounded-2" name="nomeSocial" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Email*</label>
                                        <input type="email" className="form-control rounded-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">CPF*</label>
                                        <input type="text" className="form-control rounded-2" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Telefones (separados por vírgula)</label>
                                        <input type="text" className="form-control rounded-2" name="telefones" value={telefones} onChange={(e) => setTelefones(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                        <i className="bi bi-person-badge me-2" style={{ color: tema }}></i>
                                        Documentos de RG
                                    </h6>
                                    {rgs.length > 0 && (
                                        <div className="mb-3">
                                            {rgs.map((rg, index) => (
                                                <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                                    <div>
                                                        <span className="fw-semibold">{rg.numero}</span>
                                                        <small className="text-muted ms-2"><i className="bi bi-calendar me-1"></i>{new Date(rg.dataEmissao + 'T00:00:00').toLocaleDateString()}</small>
                                                    </div>
                                                    <button type="button" className="btn btn-outline-danger btn-sm rounded-2" onClick={() => removerRg(index)}><i className="bi bi-trash"></i> Remover</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="row g-3">
                                        <div className="col-md-5">
                                            <label className="form-label small fw-semibold">Número do RG</label>
                                            <input type="text" className="form-control rounded-2" name="numero" value={rgTemp.numero} onChange={handleRgChange} />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label small fw-semibold">Data de Emissão</label>
                                            <input type="date" className="form-control rounded-2" name="dataEmissao" value={rgTemp.dataEmissao} onChange={handleRgChange} />
                                        </div>
                                        <div className="col-md-2 d-flex align-items-end">
                                            <button type="button" className="btn btn-sm w-100 rounded-2" style={{ backgroundColor: tema, color: 'white', opacity: (!rgTemp.numero || !rgTemp.dataEmissao) ? 0.65 : 1 }} onClick={adicionarRg} disabled={!rgTemp.numero || !rgTemp.dataEmissao}><i className="bi bi-plus-lg me-1"></i> Adicionar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer border-top-0">
                            <button type="button" className="btn btn-outline-secondary rounded-2 fw-semibold" onClick={onFechar}><i className="bi bi-x-circle me-2"></i>Cancelar</button>
                            <button type="submit" className="btn rounded-2 fw-bold" style={{ backgroundColor: tema, color: 'white', padding: '0.5rem 1.5rem' }}><i className="bi bi-save me-2"></i>Salvar Alterações</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}