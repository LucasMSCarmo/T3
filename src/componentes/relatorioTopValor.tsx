import { Component } from "react";
import { Cliente } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
    onClienteSelect: (cliente: Cliente) => void;
}

type ClienteConsumo = {
    cliente: Cliente;
    valor: number;
    quantidade: number;
}

type ClienteConsumoTotal = {
    cliente: Cliente;
    valorTotal: number;
    quantidadeProdutos: number;
    quantidadeServicos: number;
}

export default class RelatorioTopValor extends Component<Props> {
    render() {
        const { tema, clientes, onClienteSelect } = this.props;

        const consumoProdutos: ClienteConsumo[] = clientes.map(cliente => {
            let valorTotal = 0;
            let quantidadeTotal = 0;
            cliente.pets.forEach(pet => {
                pet.produtosConsumidos.forEach(consumo => {
                    valorTotal += consumo.produto.preco * consumo.quantidade;
                    quantidadeTotal += consumo.quantidade;
                });
            });
            return { cliente, valor: valorTotal, quantidade: quantidadeTotal };
        });
        const top5Produtos = consumoProdutos.sort((a, b) => b.valor - a.valor).slice(0, 5);

        const consumoServicos: ClienteConsumo[] = clientes.map(cliente => {
            let valorTotal = 0;
            let quantidadeTotal = 0;
            cliente.pets.forEach(pet => {
                pet.servicosConsumidos.forEach(consumo => {
                    valorTotal += consumo.servico.preco;
                    quantidadeTotal += 1;
                });
            });
            return { cliente, valor: valorTotal, quantidade: quantidadeTotal };
        });
        const top5Servicos = consumoServicos.sort((a, b) => b.valor - a.valor).slice(0, 5);

        const consumoTotal: ClienteConsumoTotal[] = clientes.map(cliente => {
            const dadosProdutos = consumoProdutos.find(c => c.cliente.email === cliente.email);
            const dadosServicos = consumoServicos.find(c => c.cliente.email === cliente.email);

            const valorProdutos = dadosProdutos?.valor || 0;
            const qtdProdutos = dadosProdutos?.quantidade || 0;
            const valorServicos = dadosServicos?.valor || 0;
            const qtdServicos = dadosServicos?.quantidade || 0;

            return {
                cliente,
                valorTotal: valorProdutos + valorServicos,
                quantidadeProdutos: qtdProdutos,
                quantidadeServicos: qtdServicos
            };
        });
        const top5Total = consumoTotal.sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 5);

        return (
            <div className="card border-0 shadow-sm">
                <div className="card-header py-3" style={{
                    backgroundColor: tema,
                    color: 'white',
                    borderBottom: '2px solid rgba(255,255,255,0.1)'
                }}>
                    <h5 className="mb-0 fw-bold">
                        <i className="bi bi-cash-stack me-2"></i>
                        Top por Valor
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0">
                                        <i className="bi bi-box-seam me-2"></i>
                                        Top Produtos (Valor)
                                    </h6>
                                </div>
                                <div className="card-body p-0">
                                    {top5Produtos.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {top5Produtos.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                                                    onClick={() => onClienteSelect(item.cliente)}
                                                >
                                                    <div>
                                                        <span className="fw-bold">{index + 1}. {item.cliente.nome}</span>
                                                        <div className="text-muted small">
                                                            {item.quantidade} un
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-primary rounded-pill">
                                                        R$ {item.valor.toFixed(2).replace('.', ',')}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            <i className="bi bi-cart-x" style={{ fontSize: '1.5rem' }}></i>
                                            <p className="mt-2 mb-0">Nenhum consumo registrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0">
                                        <i className="bi bi-tools me-2"></i>
                                        Top Serviços (Valor)
                                    </h6>
                                </div>
                                <div className="card-body p-0">
                                    {top5Servicos.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {top5Servicos.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                                                    onClick={() => onClienteSelect(item.cliente)}
                                                >
                                                    <div>
                                                        <span className="fw-bold">{index + 1}. {item.cliente.nome}</span>
                                                        <div className="text-muted small">
                                                            {item.quantidade} un
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-info text-dark rounded-pill">
                                                        R$ {item.valor.toFixed(2).replace('.', ',')}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            <i className="bi bi-wrench" style={{ fontSize: '1.5rem' }}></i>
                                            <p className="mt-2 mb-0">Nenhum consumo registrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0">
                                        <i className="bi bi-trophy-fill me-2"></i>
                                        Top Geral (Valor)
                                    </h6>
                                </div>
                                <div className="card-body p-0">
                                    {top5Total.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {top5Total.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                                                    onClick={() => onClienteSelect(item.cliente)}
                                                >
                                                    <div>
                                                        <span className="fw-bold">{index + 1}. {item.cliente.nome}</span>
                                                        <div className="text-muted small">
                                                            {item.quantidadeProdutos} prod | {item.quantidadeServicos} serv
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-success rounded-pill">
                                                        R$ {item.valorTotal.toFixed(2).replace('.', ',')}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            <i className="bi bi-emoji-frown" style={{ fontSize: '1.5rem' }}></i>
                                            <p className="mt-2 mb-0">Nenhum consumo registrado</p>
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
}