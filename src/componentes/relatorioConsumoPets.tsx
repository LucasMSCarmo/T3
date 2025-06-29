import React, { useMemo } from 'react';
import { Cliente, Produto, Servico } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
}

type ConsumoItem = {
    nome: string;
    valor: number;
    quantidade: number;
};

type ConsumoRaca = {
    raca: string;
    valorProdutos: number;
    quantidadeProdutos: number;
    valorServicos: number;
    quantidadeServicos: number;
    produtos: ConsumoItem[];
    servicos: ConsumoItem[];
};

type ConsumoTipo = {
    tipo: string;
    valorProdutos: number;
    quantidadeProdutos: number;
    valorServicos: number;
    quantidadeServicos: number;
    racas: ConsumoRaca[];
};

export default function RelatorioConsumoPets(props: Props) {
    const { tema, clientes } = props;

    const dadosRelatorio = useMemo(() => {
        const agregado: any = {};

        clientes.forEach(cliente => {
            cliente.pets.forEach(pet => {
                const { tipo, raca } = pet;
                if (!agregado[tipo]) agregado[tipo] = {};
                if (!agregado[tipo][raca]) agregado[tipo][raca] = { produtos: {}, servicos: {} };

                pet.produtosConsumidos.forEach(p => {
                    const nome = p.produto.nome;
                    const valor = p.produto.preco * p.quantidade;
                    if (!agregado[tipo][raca].produtos[nome]) {
                        agregado[tipo][raca].produtos[nome] = { valor: 0, quantidade: 0 };
                    }
                    agregado[tipo][raca].produtos[nome].valor += valor;
                    agregado[tipo][raca].produtos[nome].quantidade += p.quantidade;
                });

                pet.servicosConsumidos.forEach(s => {
                    const nome = s.servico.nome;
                    const valor = s.servico.preco;
                    if (!agregado[tipo][raca].servicos[nome]) {
                        agregado[tipo][raca].servicos[nome] = { valor: 0, quantidade: 0 };
                    }
                    agregado[tipo][raca].servicos[nome].valor += valor;
                    agregado[tipo][raca].servicos[nome].quantidade += 1;
                });
            });
        });

        const tiposOrdenados = Object.keys(agregado).sort();

        return tiposOrdenados.map((tipo): ConsumoTipo => {
            let totalProdutosTipo = 0;
            let totalQtdProdutosTipo = 0;
            let totalServicosTipo = 0;
            let totalQtdServicosTipo = 0;

            const racasOrdenadas = Object.keys(agregado[tipo]).sort().map((raca): ConsumoRaca => {
                const produtos = Object.entries(agregado[tipo][raca].produtos)
                    .map(([nome, dados]) => ({
                        nome,
                        valor: (dados as any).valor,
                        quantidade: (dados as any).quantidade
                    }))
                    .sort((a, b) => b.valor - a.valor);

                const servicos = Object.entries(agregado[tipo][raca].servicos)
                    .map(([nome, dados]) => ({
                        nome,
                        valor: (dados as any).valor,
                        quantidade: (dados as any).quantidade
                    }))
                    .sort((a, b) => b.valor - a.valor);

                const valorProdutosRaca = produtos.reduce((s, p) => s + p.valor, 0);
                const qtdProdutosRaca = produtos.reduce((s, p) => s + p.quantidade, 0);
                const valorServicosRaca = servicos.reduce((s, p) => s + p.valor, 0);
                const qtdServicosRaca = servicos.reduce((s, p) => s + p.quantidade, 0);

                totalProdutosTipo += valorProdutosRaca;
                totalQtdProdutosTipo += qtdProdutosRaca;
                totalServicosTipo += valorServicosRaca;
                totalQtdServicosTipo += qtdServicosRaca;

                return {
                    raca,
                    valorProdutos: valorProdutosRaca,
                    quantidadeProdutos: qtdProdutosRaca,
                    valorServicos: valorServicosRaca,
                    quantidadeServicos: qtdServicosRaca,
                    produtos,
                    servicos
                };
            });

            return {
                tipo,
                valorProdutos: totalProdutosTipo,
                quantidadeProdutos: totalQtdProdutosTipo,
                valorServicos: totalServicosTipo,
                quantidadeServicos: totalQtdServicosTipo,
                racas: racasOrdenadas
            };
        });
    }, [clientes]);

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{
                backgroundColor: tema,
                color: 'white',
                borderBottom: '2px solid rgba(255,255,255,0.1)'
            }}>
                <h5 className="mb-0 fw-bold">
                    <i className="bi bi-graph-up me-2"></i>
                    Relatório de Consumo por Tipo e Raça de Pet
                </h5>
            </div>

            <div className="card-body p-0">
                {dadosRelatorio.length > 0 ? (
                    <div className="accordion" id="relatorioAccordion">
                        {dadosRelatorio.map((dadosTipo, index) => (
                            <div className="accordion-item border-0" key={index}>
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed shadow-none"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${index}`}
                                    >
                                        <div className="d-flex justify-content-between w-100 pe-3">
                                            <strong>{dadosTipo.tipo}</strong>
                                            <div className="d-flex gap-2">
                                                <span className="badge bg-primary">
                                                    Produtos: R$ {dadosTipo.valorProdutos.toFixed(2).replace('.', ',')} ({dadosTipo.quantidadeProdutos} un)
                                                </span>
                                                <span className="badge bg-info text-dark">
                                                    Serviços: R$ {dadosTipo.valorServicos.toFixed(2).replace('.', ',')} ({dadosTipo.quantidadeServicos} un)
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </h2>
                                <div
                                    id={`collapse-${index}`}
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#relatorioAccordion"
                                >
                                    <div className="accordion-body pt-0">
                                        {dadosTipo.racas.map((dadosRaca, racaIndex) => (
                                            <div key={racaIndex} className="mb-4 border-bottom pb-3">
                                                <h6 className="pb-2 d-flex justify-content-between align-items-center">
                                                    <span>{dadosRaca.raca}</span>
                                                    <div className="d-flex gap-2">
                                                        <small className="badge bg-primary">
                                                            Produtos: R$ {dadosRaca.valorProdutos.toFixed(2).replace('.', ',')} ({dadosRaca.quantidadeProdutos} un)
                                                        </small>
                                                        <small className="badge bg-info text-dark">
                                                            Serviços: R$ {dadosRaca.valorServicos.toFixed(2).replace('.', ',')} ({dadosRaca.quantidadeServicos} un)
                                                        </small>
                                                    </div>
                                                </h6>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <div className="card border-0 shadow-sm">
                                                            <div className="card-header bg-light">
                                                                <small>Produtos Consumidos</small>
                                                            </div>
                                                            <div className="card-body p-0">
                                                                {dadosRaca.produtos.length > 0 ? (
                                                                    <ul className="list-group list-group-flush">
                                                                        {dadosRaca.produtos.map((p, pIndex) => (
                                                                            <li
                                                                                key={pIndex}
                                                                                className="list-group-item d-flex justify-content-between align-items-center"
                                                                            >
                                                                                <span>
                                                                                    {p.nome}
                                                                                    <span className="badge bg-secondary ms-2">
                                                                                        {p.quantidade}x
                                                                                    </span>
                                                                                </span>
                                                                                <span className="fw-bold text-success">
                                                                                    R$ {p.valor.toFixed(2).replace('.', ',')}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <div className="text-center py-3 text-muted">
                                                                        <i className="bi bi-cart-x"></i> Nenhum produto consumido
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="card border-0 shadow-sm">
                                                            <div className="card-header bg-light">
                                                                <small>Serviços Consumidos</small>
                                                            </div>
                                                            <div className="card-body p-0">
                                                                {dadosRaca.servicos.length > 0 ? (
                                                                    <ul className="list-group list-group-flush">
                                                                        {dadosRaca.servicos.map((s, sIndex) => (
                                                                            <li
                                                                                key={sIndex}
                                                                                className="list-group-item d-flex justify-content-between align-items-center"
                                                                            >
                                                                                <span>
                                                                                    {s.nome}
                                                                                    <span className="badge bg-secondary ms-2">
                                                                                        {s.quantidade}x
                                                                                    </span>
                                                                                </span>
                                                                                <span className="fw-bold text-success">
                                                                                    R$ {s.valor.toFixed(2).replace('.', ',')}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <div className="text-center py-3 text-muted">
                                                                        <i className="bi bi-wrench"></i> Nenhum serviço consumido
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 text-muted">
                        <i className="bi bi-database-exclamation" style={{ fontSize: '2rem' }}></i>
                        <p className="mt-2">Nenhum dado disponível para exibir</p>
                    </div>
                )}
            </div>
        </div>
    );
}