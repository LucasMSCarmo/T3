import React, { useState } from 'react';
import { Cliente, Pet, Produto, Servico } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    onSubmit: (cliente: Cliente, petNome: string, produtos: {produto: Produto, quantidade: number}[], servicos: Servico[]) => void;
    onCancelar: () => void;
}

export default function FormularioRegistroCompra(props: Props) {
    const { tema, clientes, produtos, servicos, onSubmit, onCancelar } = props;

    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [petSelecionadoNome, setPetSelecionadoNome] = useState<string>('');
    const [produtosSelecionados, setProdutosSelecionados] = useState<{ produto: Produto; quantidade: number }[]>([]);
    const [servicosSelecionados, setServicosSelecionados] = useState<Servico[]>([]);

    const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clienteEmail = e.target.value;
        const cliente = clientes.find(c => c.email === clienteEmail) || null;
        setClienteSelecionado(cliente);
        setPetSelecionadoNome('');
        setProdutosSelecionados([]);
        setServicosSelecionados([]);
    };

    const handlePetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPetSelecionadoNome(e.target.value);
    };

    const handleProdutoChange = (produto: Produto, quantidadeStr: string) => {
        const quantidade = parseInt(quantidadeStr) || 0;
        setProdutosSelecionados(prev => {
            const existentes = prev.filter(p => p.produto.nome !== produto.nome);
            if (quantidade > 0) {
                return [...existentes, { produto, quantidade }];
            }
            return existentes;
        });
    };

    const handleServicoChange = (servico: Servico, isChecked: boolean) => {
        setServicosSelecionados(prev => {
            const existentes = prev.filter(s => s.nome !== servico.nome);
            if (isChecked) {
                return [...existentes, servico];
            }
            return existentes;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!clienteSelecionado || !petSelecionadoNome || (produtosSelecionados.length === 0 && servicosSelecionados.length === 0)) {
            alert("Por favor, selecione um cliente, um pet e pelo menos um produto ou serviço.");
            return;
        }
        
        onSubmit(
            clienteSelecionado,
            petSelecionadoNome,
            produtosSelecionados,
            servicosSelecionados
        );

        setClienteSelecionado(null);
        setPetSelecionadoNome('');
        setProdutosSelecionados([]);
        setServicosSelecionados([]);
    };
    
    const isSubmitDisabled = !clienteSelecionado || !petSelecionadoNome || (produtosSelecionados.length === 0 && servicosSelecionados.length === 0);

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{ backgroundColor: tema, color: 'white' }}>
                <h5 className="mb-0 fw-bold"><i className="bi bi-cart-plus me-2"></i>Registrar Consumo</h5>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h6 className="fw-bold text-muted mb-3"><i className="bi bi-person me-2" style={{ color: tema }}></i>Seleção do Cliente e Pet</h6>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold">Cliente*</label>
                                <select className="form-select rounded-2" value={clienteSelecionado?.email || ''} onChange={handleClienteChange} required>
                                    <option value="">Selecione um cliente...</option>
                                    {clientes.map(c => <option key={c.email} value={c.email}>{c.nome}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold">Pet*</label>
                                <select className="form-select rounded-2" value={petSelecionadoNome} onChange={handlePetChange} disabled={!clienteSelecionado} required>
                                    <option value="">Selecione um pet...</option>
                                    {clienteSelecionado?.pets.map(p => <option key={p.nome} value={p.nome}>{p.nome} ({p.raca})</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <h6 className="fw-bold text-muted mb-3"><i className="bi bi-cart3 me-2" style={{ color: tema }}></i>Produtos</h6>
                            <div className="table-responsive" style={{maxHeight: '300px'}}>
                                <table className="table table-sm table-hover">
                                    <tbody>
                                        {produtos.map(produto => (
                                            <tr key={produto.nome}>
                                                <td>{produto.nome}<br/><small className="text-success">R$ {produto.preco.toFixed(2)}</small></td>
                                                <td className="text-end">
                                                    <input type="number" min="0" className="form-control form-control-sm" style={{ width: '80px' }}
                                                        onChange={(e) => handleProdutoChange(produto, e.target.value)}
                                                        value={produtosSelecionados.find(p => p.produto.nome === produto.nome)?.quantidade || 0} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold text-muted mb-3"><i className="bi bi-wrench me-2" style={{ color: tema }}></i>Serviços</h6>
                            <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                                {servicos.map(servico => (
                                    <div key={servico.nome} className="form-check">
                                        <input className="form-check-input" type="checkbox" id={`servico-${servico.nome}`} onChange={(e) => handleServicoChange(servico, e.target.checked)} />
                                        <label className="form-check-label" htmlFor={`servico-${servico.nome}`}>{servico.nome} (R$ {servico.preco.toFixed(2)})</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-4">
                        <button type="button" className="btn btn-outline-secondary rounded-2" onClick={onCancelar}>Cancelar</button>
                        <button type="submit" className="btn rounded-2 fw-bold" style={{ backgroundColor: tema, color: 'white' }} disabled={isSubmitDisabled}>Registrar Compra</button>
                    </div>
                </form>
            </div>
        </div>
    );
}