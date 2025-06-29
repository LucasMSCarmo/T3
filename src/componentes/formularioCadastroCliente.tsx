import React, { useState } from 'react';
import { Cliente, RG, Pet } from "./dados";

type Props = {
    tema: string;
    onSubmit: (cliente: Cliente) => void;
}

type PetState = Omit<Pet, 'produtosConsumidos' | 'servicosConsumidos'>;
type RgState = Omit<RG, 'dataEmissao'> & { dataEmissao: string };

export default function FormularioCadastroCliente(props: Props) {
    const { tema, onSubmit } = props;

    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');

    const [rgs, setRgs] = useState<RgState[]>([]);
    const [rgTemp, setRgTemp] = useState({ numero: '', dataEmissao: '' });

    const [pets, setPets] = useState<PetState[]>([]);
    const [petTemp, setPetTemp] = useState<PetState>({ nome: '', tipo: '', raca: '', genero: 'Macho' });

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

    const handlePetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPetTemp(prev => ({ ...prev, [name]: value }));
    };

    const adicionarPet = () => {
        if (!petTemp.nome || !petTemp.raca || !petTemp.tipo) {
            alert("Por favor, preencha o nome, tipo e a raça do pet.");
            return;
        }
        setPets(prevPets => [...prevPets, petTemp]);
        setPetTemp({ nome: '', tipo: '', raca: '', genero: 'Macho' });
    };

    const removerPet = (indexToRemove: number) => {
        setPets(prevPets => prevPets.filter((_, index) => index !== indexToRemove));
    };
    
    const resetForm = () => {
        setNome('');
        setNomeSocial('');
        setEmail('');
        setTelefone('');
        setCpf('');
        setRgs([]);
        setRgTemp({ numero: '', dataEmissao: '' });
        setPets([]);
        setPetTemp({ nome: '', tipo: '', raca: '', genero: 'Macho' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const novoCliente: Cliente = {
            nome,
            nomeSocial,
            email,
            cpf,
            rgs: rgs.map(rg => ({
                numero: rg.numero,
                dataEmissao: new Date(rg.dataEmissao + 'T00:00:00')
            })),
            telefones: [telefone],
            pets: pets.map(pet => ({ ...pet, produtosConsumidos: [], servicosConsumidos: [] }))
        };

        onSubmit(novoCliente);
        resetForm();
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header py-3" style={{ backgroundColor: tema, color: 'white', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                <h5 className="mb-0 fw-bold"><i className="bi bi-person-plus me-2"></i>Cadastro de Cliente</h5>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center"><i className="bi bi-person-lines-fill me-2" style={{ color: tema }}></i>Dados Pessoais</h6>
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
                                <label className="form-label small fw-semibold">Telefone*</label>
                                <input type="tel" className="form-control rounded-2" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold">CPF*</label>
                                <input type="text" className="form-control rounded-2" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center"><i className="bi bi-person-badge me-2" style={{ color: tema }}></i>Documentos de RG</h6>
                            {rgs.length > 0 && (
                                <div className="mb-3">
                                    {rgs.map((rg, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div>
                                                <span className="fw-semibold">{rg.numero}</span>
                                                <small className="text-muted ms-2"><i className="bi bi-calendar me-1"></i>{new Date(rg.dataEmissao + 'T00:00:00').toLocaleDateString()}</small>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger btn-sm rounded-2" onClick={() => removerRg(index)} title="Remover RG"><i className="bi bi-trash"></i></button>
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
                                    <button type="button" className="btn btn-sm w-100 rounded-2" style={{ backgroundColor: tema, color: 'white' }} onClick={adicionarRg} disabled={!rgTemp.numero || !rgTemp.dataEmissao}><i className="bi bi-plus-lg"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center"><i className="bi bi-heart me-2" style={{ color: tema }}></i>Pets do Cliente</h6>
                            {pets.length > 0 && (
                                <div className="mb-3">
                                    {pets.map((pet, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div>
                                                <span className="fw-semibold">{pet.nome}</span>
                                                <small className="text-muted ms-2">{pet.tipo} • {pet.raca} • {pet.genero}</small>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger btn-sm rounded-2" onClick={() => removerPet(index)} title="Remover Pet"><i className="bi bi-trash"></i></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="row g-3 mb-3">
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold">Nome*</label>
                                    <input type="text" className="form-control rounded-2" name="nome" value={petTemp.nome} onChange={handlePetChange} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label small fw-semibold">Tipo*</label>
                                    <input type="text" className="form-control rounded-2" name="tipo" value={petTemp.tipo} onChange={handlePetChange} placeholder="Ex: Cão, Gato..." />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label small fw-semibold">Raça*</label>
                                    <input type="text" className="form-control rounded-2" name="raca" value={petTemp.raca} onChange={handlePetChange} />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label small fw-semibold">Gênero</label>
                                    <select className="form-select rounded-2" name="genero" value={petTemp.genero} onChange={handlePetChange}>
                                        <option value="Macho">Macho</option>
                                        <option value="Fêmea">Fêmea</option>
                                        <option value="Não se aplica">N/A</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" className="btn btn-sm rounded-2 w-100" style={{ backgroundColor: tema, color: 'white', opacity: (!petTemp.nome || !petTemp.raca) ? 0.65 : 1 }} onClick={adicionarPet} disabled={!petTemp.nome || !petTemp.raca}><i className="bi bi-plus-circle me-2"></i>Adicionar Pet</button>
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-lg rounded-2 fw-bold" style={{ backgroundColor: tema, color: 'white' }}>
                            <i className="bi bi-save me-2"></i>
                            Cadastrar Cliente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}