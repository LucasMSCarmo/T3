import React, { useState, useMemo } from 'react';
import { Cliente, Pet } from "./dados";

type Props = {
    cliente: Cliente;
    tema: string;
    onFechar: () => void;
    onCadastrarPet: (cliente: Cliente) => void;
    onExcluirPet: (pet: Pet) => void;
    onIniciarEdicaoPet: (pet: Pet) => void;
}

export default function DetalhesCliente(props: Props) {
    const { cliente, tema, onFechar, onCadastrarPet, onExcluirPet, onIniciarEdicaoPet } = props;

    const [petAberto, setPetAberto] = useState<string | null>(null);

    const togglePet = (petNome: string) => {
        setPetAberto(prevAberto => (prevAberto === petNome ? null : petNome));
    };

    const formatarMoeda = (valor: number): string => {
        return valor.toFixed(2).replace('.', ',');
    };

    const totalProdutos = useMemo(() => {
        return cliente.pets.reduce((totalPet, pet) => {
            const totalProdutosPet = pet.produtosConsumidos.reduce((totalProd, consumo) => {
                return totalProd + (consumo.produto.preco * consumo.quantidade);
            }, 0);
            return totalPet + totalProdutosPet;
        }, 0);
    }, [cliente.pets]);

    const totalServicos = useMemo(() => {
        return cliente.pets.reduce((totalPet, pet) => {
            const totalServicosPet = pet.servicosConsumidos.reduce((totalServ, consumo) => {
                return totalServ + consumo.servico.preco;
            }, 0);
            return totalPet + totalServicosPet;
        }, 0);
    }, [cliente.pets]);
    
    const totalGeral = totalProdutos + totalServicos;

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content border-0 shadow-sm">
                    <div className="modal-header py-3" style={{
                        backgroundColor: tema,
                        color: 'white',
                        borderBottom: '2px solid rgba(255,255,255,0.1)'
                    }}>
                        <h5 className="modal-title fw-bold mb-0">
                            <i className="bi bi-person-circle me-2"></i>
                            Detalhes do Cliente: {cliente.nome}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onFechar} aria-label="Fechar"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-6 border-end">
                                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                            <i className="bi bi-info-circle me-2" style={{ fontSize: '1.1rem' }}></i>
                                            Informações Pessoais
                                        </h6>
                                        <div className="mb-3">
                                            <p className="mb-2"><i className="bi bi-person me-2 text-muted"></i><strong>Nome:</strong> {cliente.nome}</p>
                                            <p className="mb-2"><i className="bi bi-person-badge me-2 text-muted"></i><strong>Nome Social:</strong> {cliente.nomeSocial || 'Não informado'}</p>
                                            <p className="mb-2"><i className="bi bi-envelope me-2 text-muted"></i><strong>Email:</strong> {cliente.email}</p>
                                            <p className="mb-2"><i className="bi bi-person-vcard me-2 text-muted"></i><strong>CPF:</strong> {cliente.cpf}</p>
                                            <p className="mb-0"><i className="bi bi-telephone me-2 text-muted"></i><strong>Telefones:</strong> {cliente.telefones.join(', ') || 'Não informado'}</p>
                                        </div>
                                        {cliente.rgs.length > 0 && (
                                            <>
                                                <h6 className="fw-bold text-muted mt-4 mb-3 d-flex align-items-center"><i className="bi bi-person-badge-fill me-2" style={{ fontSize: '1.1rem' }}></i>Documentos de RG</h6>
                                                {cliente.rgs.map((rg, index) => (
                                                    <div key={index} className="mb-2 ps-3">
                                                        <p className="mb-1"><strong>RG:</strong> {rg.numero}</p>
                                                        <small className="text-muted"><i className="bi bi-calendar me-1"></i>Emissão: {rg.dataEmissao.toLocaleDateString()}</small>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                    <div className="col-md-6 ps-4">
                                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center"><i className="bi bi-cash-stack me-2" style={{ fontSize: '1.1rem' }}></i>Resumo Financeiro</h6>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span><i className="bi bi-basket3 me-2 text-muted"></i>Produtos:</span>
                                                <span className="fw-bold text-success">R$ {formatarMoeda(totalProdutos)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span><i className="bi bi-tools me-2 text-muted"></i>Serviços:</span>
                                                <span className="fw-bold text-success">R$ {formatarMoeda(totalServicos)}</span>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="d-flex justify-content-between">
                                                <span><i className="bi bi-check-all me-2 text-muted"></i><strong>Total Geral:</strong></span>
                                                <span className="fw-bold text-success" style={{ fontSize: '1.1rem' }}>R$ {formatarMoeda(totalGeral)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0"><i className="bi bi-heart-fill me-2" style={{ color: tema }}></i>Pets</h5>
                                <button className="btn btn-sm rounded-2" style={{ backgroundColor: tema, color: 'white', padding: '0.25rem 0.75rem' }} onClick={() => onCadastrarPet(cliente)}><i className="bi bi-plus-circle me-1"></i>Novo Pet</button>
                            </div>
                            {cliente.pets.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <i className="bi bi-heart" style={{ fontSize: '2rem', color: tema }}></i>
                                    <p className="mt-2">Nenhum pet cadastrado</p>
                                </div>
                            ) : (
                                <div className="accordion" id="petsAccordion">
                                    {cliente.pets.map((pet, petIndex) => (
                                        <div key={petIndex} className="accordion-item border-0 shadow-sm mb-3">
                                            <h2 className="accordion-header">
                                                <button className={`accordion-button ${petAberto === pet.nome ? '' : 'collapsed'} p-3`} type="button" onClick={() => togglePet(pet.nome)} style={{ backgroundColor: petAberto === pet.nome ? '#f8f9fa' : 'white' }}>
                                                    <div className="d-flex justify-content-between w-100 align-items-center pe-3">
                                                        <span className="fw-bold"><i className="bi bi-heart me-2" style={{ color: tema }}></i>{pet.nome}<small className="fw-normal text-muted ms-2">({pet.tipo} - {pet.raca})</small></span>
                                                        <div className="d-flex align-items-center">
                                                            <span className="badge rounded-pill me-3" style={{ backgroundColor: tema, fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>{pet.genero === 'Fêmea' ? '♀' : '♂'} {pet.genero}</span>
                                                            <div className="btn-group btn-group-sm">
                                                                <button className="btn btn-outline-primary rounded-2 me-1" title="Editar Pet" onClick={(e) => { e.stopPropagation(); onIniciarEdicaoPet(pet); }}><i className="bi bi-pencil"></i></button>
                                                                <button className="btn btn-outline-danger rounded-2" title="Excluir Pet" onClick={(e) => { e.stopPropagation(); onExcluirPet(pet); }}><i className="bi bi-trash"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div className={`accordion-collapse collapse ${petAberto === pet.nome ? 'show' : ''}`}>
                                                <div className="accordion-body p-3">
                                                    <div className="mb-4">
                                                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center"><i className="bi bi-basket3 me-2" style={{ color: tema }}></i>Produtos Consumidos</h6>
                                                        {pet.produtosConsumidos.length > 0 ? (
                                                            <div className="table-responsive">
                                                                <table className="table table-sm table-hover mb-0">
                                                                    <thead>
                                                                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                                                                            <th>Produto</th>
                                                                            <th className="text-end">Quantidade</th>
                                                                            <th className="text-end">Preço Unitário</th>
                                                                            <th className="text-end">Total</th>
                                                                            <th>Data</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {pet.produtosConsumidos.map((produto, index) => (
                                                                            <tr key={index}>
                                                                                <td><i className="bi bi-basket me-2 text-muted"></i>{produto.produto.nome}</td>
                                                                                <td className="text-end">{produto.quantidade}</td>
                                                                                <td className="text-end">R$ {formatarMoeda(produto.produto.preco)}</td>
                                                                                <td className="text-end fw-bold">R$ {formatarMoeda(produto.quantidade * produto.produto.preco)}</td>
                                                                                <td><small className="text-muted">{produto.data.toLocaleDateString()}</small></td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="alert alert-info mb-0"><i className="bi bi-info-circle me-2"></i>Nenhum produto consumido por este pet</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center"><i className="bi bi-tools me-2" style={{ color: tema }}></i>Serviços Consumidos</h6>
                                                        {pet.servicosConsumidos.length > 0 ? (
                                                            <div className="table-responsive">
                                                                <table className="table table-sm table-hover mb-0">
                                                                    <thead>
                                                                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                                                                            <th>Serviço</th>
                                                                            <th className="text-end">Preço</th>
                                                                            <th>Data</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {pet.servicosConsumidos.map((servico, index) => (
                                                                            <tr key={index}>
                                                                                <td><i className="bi bi-scissors me-2 text-muted"></i>{servico.servico.nome}</td>
                                                                                <td className="text-end fw-bold">R$ {formatarMoeda(servico.servico.preco)}</td>
                                                                                <td><small className="text-muted">{servico.data.toLocaleDateString()}</small></td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="alert alert-info mb-0"><i className="bi bi-info-circle me-2"></i>Nenhum serviço consumido por este pet</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="modal-footer border-top-0 pt-0">
                        <button className="btn btn-outline-secondary rounded-2" onClick={onFechar}><i className="bi bi-x-lg me-1"></i>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}