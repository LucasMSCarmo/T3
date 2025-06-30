import React, { useState, useCallback } from 'react';
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import DetalhesCliente from "./detalhesCliente";
import FormularioEdicaoCliente from "./formularioEdicaoCliente";
import FormularioCadastroPet from "./formularioCadastroPet";
import FormularioEdicaoPet from "./formularioEdicaoPet";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import FormularioCadastroServico from "./formularioCadastroServico";
import Catalogo from "./catalogo";
import FormularioEdicaoProduto from "./formularioEdicaoProduto";
import FormularioEdicaoServico from "./formularioEdicaoServico";
import RelatorioTopConsumidores from "./relatoriosTopConsumidores";
import RelatorioMaisConsumidos from "./relatorioMaisConsumidos";
import RelatorioConsumoPets from "./relatorioConsumoPets";
import RelatorioTopValor from "./relatorioTopValor";
import FormularioRegistroCompra from './formularioRegistroCompra';
import { clientes as dadosClientes, produtos as dadosProdutos, servicos as dadosServicos } from "./dados";
import { Cliente, Pet, Produto, Servico } from "./dados";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes');
    const [clientes, setClientes] = useState(dadosClientes);
    const [produtos, setProdutos] = useState(dadosProdutos);
    const [servicos, setServicos] = useState(dadosServicos);
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [origemCadastroPet, setOrigemCadastroPet] = useState<'detalhes' | 'menu' | null>(null);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [petSelecionadoParaEdicao, setPetSelecionadoParaEdicao] = useState<Pet | null>(null);
    const [produtoSelecionadoParaEdicao, setProdutoSelecionadoParaEdicao] = useState<Produto | null>(null);
    const [servicoSelecionadoParaEdicao, setServicoSelecionadoParaEdicao] = useState<Servico | null>(null);
    const [telaAnterior, setTelaAnterior] = useState('Clientes');

    const registrarCompra = useCallback((cliente: Cliente, petNome: string, produtos: { produto: Produto, quantidade: number }[], servicos: Servico[]) => {
        const dataAtual = new Date();

        setClientes(prevClientes => {
            const clientesAtualizados = prevClientes.map(c => {
                if (c.email === cliente.email) {
                    const petsAtualizados = c.pets.map(pet => {
                        if (pet.nome === petNome) {
                            const novosProdutos = produtos.map(p => ({
                                produto: p.produto,
                                quantidade: p.quantidade,
                                data: dataAtual
                            }));

                            const novosServicos = servicos.map(s => ({
                                servico: s,
                                data: dataAtual
                            }));

                            return {
                                ...pet,
                                produtosConsumidos: [...pet.produtosConsumidos, ...novosProdutos],
                                servicosConsumidos: [...pet.servicosConsumidos, ...novosServicos]
                            };
                        }
                        return pet;
                    });

                    return {
                        ...c,
                        pets: petsAtualizados
                    };
                }
                return c;
            });

            return clientesAtualizados;
        });

        alert("Compra registrada com sucesso!");
        setTela('Clientes');
    }, []);

    const selecionarView = useCallback((novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault();
        setTela(novaTela);
        setClienteSelecionado(null);
    }, []);

    const mostrarDetalhesCliente = useCallback((cliente: Cliente) => {
        setTelaAnterior(tela);
        setTela('Detalhes Cliente');
        setClienteSelecionado(cliente);
    }, [tela]);

    const fecharDetalhes = useCallback(() => {
        setTela(telaAnterior);
        setClienteSelecionado(null);
    }, [telaAnterior]);

    const adicionarCliente = useCallback((novoCliente: Cliente) => {
        setClientes(prevClientes => [...prevClientes, novoCliente]);
        setTela('Clientes');
    }, []);

    const editarCliente = useCallback((clienteEditado: Cliente) => {
        setClientes(prevClientes => prevClientes.map(c =>
            c.email === clienteSelecionado?.email ? clienteEditado : c
        ));
        setTela('Clientes');
    }, [clienteSelecionado]);

    const excluirCliente = useCallback((clienteParaExcluir: Cliente) => {
        if (window.confirm(`Tem certeza que deseja excluir ${clienteParaExcluir.nome}?`)) {
            setClientes(prevClientes => prevClientes.filter(c => c.email !== clienteParaExcluir.email));
            setTela('Clientes');
        }
    }, []);

    const abrirCadastroPet = useCallback((origem: 'detalhes' | 'menu', cliente?: Cliente) => {
        setTela('Cadastrar Pet');
        setClienteSelecionado(cliente || null);
        setOrigemCadastroPet(origem);
        setMostrarSucesso(false);
    }, []);

    const adicionarPet = useCallback((clienteAlvo: Cliente | null, novoPet: Omit<Pet, 'produtosConsumidos' | 'servicosConsumidos'>) => {
        if (!clienteAlvo) {
            alert("Ocorreu um erro: Nenhum cliente foi associado ao pet.");
            return;
        }
        const petCompleto = { ...novoPet, produtosConsumidos: [], servicosConsumidos: [] };

        let clienteAtualizado: Cliente | null = null;
        const clientesAtualizados = clientes.map(c => {
            if (c.email === clienteAlvo.email) {
                const clienteComNovoPet = { ...c, pets: [...c.pets, petCompleto] };
                clienteAtualizado = clienteComNovoPet;
                return clienteComNovoPet;
            }
            return c;
        });

        setClientes(clientesAtualizados);
        setTela('Detalhes Cliente');
        setClienteSelecionado(clienteAtualizado);
        setMostrarSucesso(origemCadastroPet === 'menu');
    }, [clientes, origemCadastroPet]);

    const excluirPet = useCallback((clienteAlvo: Cliente, petParaExcluir: Pet) => {
        if (!window.confirm(`Tem certeza que deseja excluir o pet ${petParaExcluir.nome}?`)) {
            return;
        }
        let clienteAtualizado: Cliente | null = null;
        const clientesAtualizados = clientes.map(cliente => {
            if (cliente.email === clienteAlvo.email) {
                const petsAtualizados = cliente.pets.filter(pet => pet !== petParaExcluir);
                clienteAtualizado = { ...cliente, pets: petsAtualizados };
                return clienteAtualizado;
            }
            return cliente;
        });

        setClientes(clientesAtualizados);
        setClienteSelecionado(clienteAtualizado);
    }, [clientes]);

    const salvarEdicaoPet = useCallback((petAtualizado: Pet) => {
        if (!clienteSelecionado || !petSelecionadoParaEdicao) return;

        const petOriginal = petSelecionadoParaEdicao;
        let clienteAtualizado: Cliente | null = null;
        const clientesAtualizados = clientes.map(cliente => {
            if (cliente.email === clienteSelecionado.email) {
                const petsAtualizados = cliente.pets.map(pet => pet === petOriginal ? petAtualizado : pet);
                clienteAtualizado = { ...cliente, pets: petsAtualizados };
                return clienteAtualizado;
            }
            return cliente;
        });

        setClientes(clientesAtualizados);
        setClienteSelecionado(clienteAtualizado);
        setPetSelecionadoParaEdicao(null);
    }, [clientes, clienteSelecionado, petSelecionadoParaEdicao]);

    const iniciarEdicaoPet = useCallback((pet: Pet) => { setPetSelecionadoParaEdicao(pet); }, []);
    const cancelarEdicaoPet = useCallback(() => { setPetSelecionadoParaEdicao(null); }, []);

    const adicionarProduto = useCallback((novoProduto: Omit<Produto, 'id'>) => {
        setProdutos(prevProdutos => [...prevProdutos, novoProduto]);
        setTela('Catálogo');
    }, []);

    const excluirProduto = useCallback((produtoParaExcluir: Produto) => {
        if (window.confirm(`Tem certeza que deseja excluir o produto ${produtoParaExcluir.nome}?`)) {
            setProdutos(prevProdutos => prevProdutos.filter(p => p.nome !== produtoParaExcluir.nome));
        }
    }, []);

    const salvarEdicaoProduto = useCallback((produtoAtualizado: Produto) => {
        const produtoOriginal = produtoSelecionadoParaEdicao;
        if (!produtoOriginal) return;

        const produtosAtualizados = produtos.map(p => p.nome === produtoOriginal.nome ? produtoAtualizado : p);

        setProdutos(produtosAtualizados);
        setProdutoSelecionadoParaEdicao(null);
    }, [produtos, produtoSelecionadoParaEdicao]);

    const iniciarEdicaoProduto = useCallback((produto: Produto) => { setProdutoSelecionadoParaEdicao(produto); }, []);
    const cancelarEdicaoProduto = useCallback(() => { setProdutoSelecionadoParaEdicao(null); }, []);

    const adicionarServico = useCallback((novoServico: Omit<Servico, 'id'>) => {
        setServicos(prevServicos => [...prevServicos, novoServico]);
        setTela('Catálogo');
    }, []);

    const excluirServico = useCallback((servicoParaExcluir: Servico) => {
        if (window.confirm(`Tem certeza que deseja excluir o serviço ${servicoParaExcluir.nome}?`)) {
            setServicos(prevServicos => prevServicos.filter(s => s.nome !== servicoParaExcluir.nome));
        }
    }, []);

    const salvarEdicaoServico = useCallback((servicoAtualizado: Servico) => {
        const servicoOriginal = servicoSelecionadoParaEdicao;
        if (!servicoOriginal) return;

        const servicosAtualizados = servicos.map(s => s.nome === servicoOriginal.nome ? servicoAtualizado : s);

        setServicos(servicosAtualizados);
        setServicoSelecionadoParaEdicao(null);
    }, [servicos, servicoSelecionadoParaEdicao]);

    const iniciarEdicaoServico = useCallback((servico: Servico) => { setServicoSelecionadoParaEdicao(servico); }, []);
    const cancelarEdicaoServico = useCallback(() => { setServicoSelecionadoParaEdicao(null); }, []);

    return (
        <>
            <BarraNavegacao
                seletorView={selecionarView}
                onAbrirCadastroPet={() => abrirCadastroPet('menu')}
                tema="#6c757d"
            />
            <div className="container mt-4">
                {mostrarSucesso && (
                    <div className="alert alert-success alert-dismissible fade show">
                        <i className="bi bi-check-circle-fill me-2"></i>Pet cadastrado com sucesso!
                        <button type="button" className="btn-close" onClick={() => setMostrarSucesso(false)}></button>
                    </div>
                )}

                {tela === 'Clientes' && <ListaCliente tema="#6c757d" clientes={clientes} onDetalhes={mostrarDetalhesCliente} onEditar={(cliente) => { setTela('Editar Cliente'); setClienteSelecionado(cliente); }} onExcluir={excluirCliente} />}
                {tela === 'Catálogo' && <Catalogo tema="#6c757d" produtos={produtos} servicos={servicos} onEditarProduto={iniciarEdicaoProduto} onExcluirProduto={excluirProduto} onEditarServico={iniciarEdicaoServico} onExcluirServico={excluirServico} />}

                {tela === 'RelatoriosConsumo' && <RelatorioTopConsumidores tema="#6c757d" clientes={clientes} onClienteSelect={mostrarDetalhesCliente} />}
                {tela === 'RelatorioMaisConsumidos' && <RelatorioMaisConsumidos tema="#6c757d" clientes={clientes} />}
                {tela === 'RelatorioConsumoPets' && <RelatorioConsumoPets tema="#6c757d" clientes={clientes} />}
                {tela === 'RelatorioTopValor' && <RelatorioTopValor tema="#6c757d" clientes={clientes} onClienteSelect={mostrarDetalhesCliente} />}

                {tela === 'Cadastrar Cliente' && <FormularioCadastroCliente tema="#6c757d" onSubmit={adicionarCliente} />}
                {tela === 'Cadastrar Produto' && <FormularioCadastroProduto tema="#6c757d" onSubmit={adicionarProduto} />}
                {tela === 'Cadastrar Serviço' && <FormularioCadastroServico tema="#6c757d" onSubmit={adicionarServico} />}
                {tela === 'Cadastrar Pet' && <FormularioCadastroPet tema="#6c757d" cliente={clienteSelecionado} clientes={clientes} onSubmit={adicionarPet} onCancelar={() => { const proximaTela = origemCadastroPet === 'detalhes' ? 'Detalhes Cliente' : 'Clientes'; setTela(proximaTela); }} />}

                {tela === 'Editar Cliente' && clienteSelecionado && <FormularioEdicaoCliente cliente={clienteSelecionado} tema="#6c757d" onFechar={() => setTela('Clientes')} onSalvar={editarCliente} />}

                {tela === 'Detalhes Cliente' && clienteSelecionado && (
                    <>
                        <DetalhesCliente cliente={clienteSelecionado} tema="#6c757d" onFechar={fecharDetalhes} onCadastrarPet={() => abrirCadastroPet('detalhes', clienteSelecionado)} onExcluirPet={(pet) => excluirPet(clienteSelecionado, pet)} onIniciarEdicaoPet={iniciarEdicaoPet} />
                        {petSelecionadoParaEdicao && <FormularioEdicaoPet tema="#6c757d" pet={petSelecionadoParaEdicao} onSalvar={salvarEdicaoPet} onCancelar={cancelarEdicaoPet} />}
                    </>
                )}

                {produtoSelecionadoParaEdicao && <FormularioEdicaoProduto tema="#6c757d" produto={produtoSelecionadoParaEdicao} onSalvar={salvarEdicaoProduto} onCancelar={cancelarEdicaoProduto} />}
                {servicoSelecionadoParaEdicao && <FormularioEdicaoServico tema="#6c757d" servico={servicoSelecionadoParaEdicao} onSalvar={salvarEdicaoServico} onCancelar={cancelarEdicaoServico} />}

                {tela === 'Registrar Compra' && (
                    <FormularioRegistroCompra
                        tema="#6c757d"
                        clientes={clientes}
                        produtos={produtos}
                        servicos={servicos}
                        onSubmit={registrarCompra}
                        onCancelar={() => setTela('Clientes')}
                    />
                )}
            </div>
        </>
    );
}