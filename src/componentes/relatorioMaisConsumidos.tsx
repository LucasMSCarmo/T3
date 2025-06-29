import React, { useMemo } from 'react';
import { Cliente } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
}

type ItemConsumo = {
    nome: string;
    quantidade: number;
    valor: number;
}

export default function RelatorioMaisConsumidos(props: Props) {
    const { tema, clientes } = props;

    const produtosMaisConsumidos = useMemo(() => {
        const consumoProdutosMap = new Map<string, { quantidade: number; valor: number }>();
        clientes.forEach(cliente => {
            cliente.pets.forEach(pet => {
                pet.produtosConsumidos.forEach(consumo => {
                    const nomeProduto = consumo.produto.nome;
                    const valorConsumo = consumo.produto.preco * consumo.quantidade;
                    const consumoAtual = consumoProdutosMap.get(nomeProduto) || { quantidade: 0, valor: 0 };
                    consumoProdutosMap.set(nomeProduto, {
                        quantidade: consumoAtual.quantidade + consumo.quantidade,
                        valor: consumoAtual.valor + valorConsumo
                    });
                });
            });
        });

        const listaProdutos: ItemConsumo[] = Array.from(consumoProdutosMap.entries()).map(([nome, dados]) => ({
            nome,
            quantidade: dados.quantidade,
            valor: dados.valor
        }));
        return listaProdutos.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);
    }, [clientes]);

    const servicosMaisConsumidos = useMemo(() => {
        const consumoServicosMap = new Map<string, { quantidade: number; valor: number }>();
        clientes.forEach(cliente => {
            cliente.pets.forEach(pet => {
                pet.servicosConsumidos.forEach(consumo => {
                    const nomeServico = consumo.servico.nome;
                    const valorConsumo = consumo.servico.preco;
                    const consumoAtual = consumoServicosMap.get(nomeServico) || { quantidade: 0, valor: 0 };
                    consumoServicosMap.set(nomeServico, {
                        quantidade: consumoAtual.quantidade + 1,
                        valor: consumoAtual.valor + valorConsumo
                    });
                });
            });
        });

        const listaServicos: ItemConsumo[] = Array.from(consumoServicosMap.entries()).map(([nome, dados]) => ({
            nome,
            quantidade: dados.quantidade,
            valor: dados.valor
        }));
        return listaServicos.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);
    }, [clientes]);

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{
                backgroundColor: tema,
                color: 'white',
                borderBottom: '2px solid rgba(255,255,255,0.1)'
            }}>
                <h5 className="mb-0 fw-bold">
                    <i className="bi bi-trophy me-2"></i>
                    Produtos e Serviços Mais Consumidos
                </h5>
            </div>

            <div className="card-body">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-header bg-light">
                                <h6 className="mb-0">
                                    <i className="bi bi-cart3 me-2"></i>
                                    Produtos Mais Consumidos
                                </h6>
                            </div>
                            <div className="card-body p-0">
                                {produtosMaisConsumidos.length > 0 ? (
                                    <ul className="list-group list-group-flush">
                                        {produtosMaisConsumidos.map((item, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="fw-bold">{item.nome}</span>
                                                    <div className="text-success small">
                                                        R$ {item.valor.toFixed(2).replace('.', ',')}
                                                    </div>
                                                </div>
                                                <span className="badge bg-primary rounded-pill">
                                                    {item.quantidade} un
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center py-4 text-muted">
                                        <i className="bi bi-cart-x" style={{ fontSize: '1.5rem' }}></i>
                                        <p className="mt-2 mb-0">Nenhum produto consumido</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-header bg-light">
                                <h6 className="mb-0">
                                    <i className="bi bi-wrench me-2"></i>
                                    Serviços Mais Consumidos
                                </h6>
                            </div>
                            <div className="card-body p-0">
                                {servicosMaisConsumidos.length > 0 ? (
                                    <ul className="list-group list-group-flush">
                                        {servicosMaisConsumidos.map((item, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="fw-bold">{item.nome}</span>
                                                    <div className="text-success small">
                                                        R$ {item.valor.toFixed(2).replace('.', ',')}
                                                    </div>
                                                </div>
                                                <span className="badge bg-info text-dark rounded-pill">
                                                    {item.quantidade} un
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center py-4 text-muted">
                                        <i className="bi bi-wrench" style={{ fontSize: '1.5rem' }}></i>
                                        <p className="mt-2 mb-0">Nenhum serviço consumido</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}