export type RG = {
    numero: string;
    dataEmissao: Date;
}

export type Pet = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    produtosConsumidos: ProdutoConsumido[];
    servicosConsumidos: ServicoConsumido[];
}

export type Produto = {
    nome: string;
    preco: number;
    tipo: string;
}

export type Servico = {
    nome: string;
    preco: number;
    tipo: string;
}

export type ProdutoConsumido = {
    produto: Produto;
    quantidade: number;
    data: Date;
}

export type ServicoConsumido = {
    servico: Servico;
    data: Date;
}

export type Cliente = {
    nome: string;
    nomeSocial: string;
    email: string;
    cpf: string;
    rgs: RG[];
    telefones: string[];
    pets: Pet[];
}

const produtos: Produto[] = [
    { nome: "Ração Premium Cachorro", preco: 120.00, tipo: "Alimento" },
    { nome: "Ração Premium Gato", preco: 110.00, tipo: "Alimento" },
    { nome: "Ração Filhote", preco: 95.00, tipo: "Alimento" },
    { nome: "Coleira Couro", preco: 45.90, tipo: "Acessório" },
    { nome: "Coleira Nylon", preco: 32.50, tipo: "Acessório" },
    { nome: "Brinquedo Osso", preco: 29.90, tipo: "Brinquedo" },
    { nome: "Brinquedo Ratinho", preco: 18.50, tipo: "Brinquedo" },
    { nome: "Cama Premium", preco: 199.90, tipo: "Conforto" },
    { nome: "Shampoo Hidratante", preco: 42.80, tipo: "Higiene" },
    { nome: "Vermífugo", preco: 35.00, tipo: "Saúde" },
    { nome: "Anti-pulgas", preco: 55.90, tipo: "Saúde" },
    { nome: "Transportadora", preco: 89.90, tipo: "Acessório" },
    { nome: "Arranhador", preco: 120.00, tipo: "Brinquedo" },
    { nome: "Tapete Higiênico", preco: 65.00, tipo: "Higiene" },
    { nome: "Comedouro Automático", preco: 220.00, tipo: "Acessório" }
];

const servicos: Servico[] = [
    { nome: "Banho e Tosa Completo", preco: 80.00, tipo: "Higiene" },
    { nome: "Banho Simples", preco: 50.00, tipo: "Higiene" },
    { nome: "Tosa Higiênica", preco: 45.00, tipo: "Higiene" },
    { nome: "Consulta Veterinária", preco: 150.00, tipo: "Saúde" },
    { nome: "Vacinação", preco: 90.00, tipo: "Saúde" },
    { nome: "Hospedagem Diária", preco: 100.00, tipo: "Hotel" },
    { nome: "Creche", preco: 65.00, tipo: "Hotel" },
    { nome: "Adestramento Básico", preco: 120.00, tipo: "Treinamento" },
    { nome: "Passeio Diário", preco: 40.00, tipo: "Passeio" },
    { nome: "Taxi Dog", preco: 70.00, tipo: "Transporte" },
    { nome: "Corte de Unhas", preco: 25.00, tipo: "Higiene" },
    { nome: "Limpeza de Ouvidos", preco: 30.00, tipo: "Higiene" },
    { nome: "Spa Pet", preco: 180.00, tipo: "Higiene" },
    { nome: "Massagem Terapêutica", preco: 95.00, tipo: "Bem-estar" },
    { nome: "Fisioterapia", preco: 120.00, tipo: "Saúde" }
];

function randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function generateConsumos(petTipo: string) {
    const produtosFiltrados = produtos.filter(p =>
        p.tipo !== "Alimento" || p.nome.includes(petTipo)
    );
    const servicosFiltrados = servicos.filter(s =>
        !s.nome.includes("Cachorro") || petTipo === "Cachorro"
    );

    const produtosConsumidos = randomItems(produtosFiltrados, Math.floor(Math.random() * 5) + 1)
        .map(produto => ({
            produto,
            quantidade: Math.floor(Math.random() * 3) + 1,
            data: randomDate(new Date(2021, 0, 1), new Date())
        }));

    const servicosConsumidos = randomItems(servicosFiltrados, Math.floor(Math.random() * 4) + 1)
        .map(servico => ({
            servico,
            data: randomDate(new Date(2021, 0, 1), new Date())
        }));

    return { produtosConsumidos, servicosConsumidos };
}

const tiposRacas = {
    Cachorro: ["Labrador", "Golden Retriever", "Poodle", "Bulldog", "Beagle", "Pug", "Shih Tzu", "Dachshund"],
    Gato: ["Siamês", "Persa", "Maine Coon", "Sphynx", "Angorá", "Ragdoll", "Bengal", "Scottish Fold"],
    Pássaro: ["Canário", "Calopsita", "Papagaio", "Agapornis", "Periquito"],
    Roedor: ["Hamster", "Porquinho-da-índia", "Chinchila", "Esquilo", "Furão"]
};

function generateCPF(): string {
    const rnd = (n: number) => Math.round(Math.random() * n);
    const n = Array(9).fill(0).map(() => rnd(9));
    let d1 = 10 - (n.reduce((acc, val, i) => acc + val * (10 - i), 0) % 11);
    if (d1 >= 10) d1 = 0;
    let d2 = 10 - ((n.reduce((acc, val, i) => acc + val * (11 - i), 0) + (d1 * 2)) % 11);
    if (d2 >= 10) d2 = 0;
    return `${n.slice(0, 3).join('')}.${n.slice(3, 6).join('')}.${n.slice(6, 9).join('')}-${d1}${d2}`;
}

function generateRGs(): RG[] {
    const rgs = [];
    const count = Math.random() > 0.7 ? 2 : 1;
    for (let i = 0; i < count; i++) {
        rgs.push({
            numero: `${Math.floor(10 + Math.random() * 90)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}-${Math.floor(Math.random() * 10)}`,
            dataEmissao: new Date(2010 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28))
        });
    }
    return rgs;
}

function generatePets(count: number) {
    const pets: Pet[] = [];
    const tipos = Object.keys(tiposRacas) as Array<keyof typeof tiposRacas>;

    for (let i = 0; i < count; i++) {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const racas = tiposRacas[tipo];
        const raca = racas[Math.floor(Math.random() * racas.length)];
        const genero = Math.random() > 0.5 ? "Macho" : "Fêmea";

        const { produtosConsumidos, servicosConsumidos } = generateConsumos(tipo);

        pets.push({
            nome: tipo === "Cachorro" ?
                ["Rex", "Thor", "Bella", "Luna", "Max", "Mel", "Bob", "Nina"][Math.floor(Math.random() * 8)] :
                tipo === "Gato" ?
                    ["Mimi", "Luna", "Simba", "Nala", "Oliver", "Leo", "Lily", "Milo"][Math.floor(Math.random() * 8)] :
                    tipo === "Pássaro" ?
                        ["Piu", "Loro", "Tweety", "Blue", "Sunny"][Math.floor(Math.random() * 5)] :
                        ["Fofinho", "Peludo", "Bolinha", "Quick"][Math.floor(Math.random() * 4)],
            tipo,
            raca,
            genero,
            produtosConsumidos,
            servicosConsumidos
        });
    }

    return pets;
}

// Lista de 20 clientes com dados diversos
const clientes: Cliente[] = [
    {
        nome: "João Silva",
        nomeSocial: "João",
        email: "joao.silva@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(11) 9999-8888", "(11) 3333-4444"],
        pets: generatePets(2)
    },
    {
        nome: "Maria Souza",
        nomeSocial: "Maria",
        email: "maria.souza@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(11) 7777-6666"],
        pets: generatePets(1)
    },
    {
        nome: "Carlos Oliveira",
        nomeSocial: "Carlos",
        email: "carlos.oliveira@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(21) 8888-7777"],
        pets: generatePets(3)
    },
    {
        nome: "Ana Santos",
        nomeSocial: "Ana",
        email: "ana.santos@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(31) 6666-5555", "(31) 2222-1111"],
        pets: generatePets(1)
    },
    {
        nome: "Pedro Costa",
        nomeSocial: "Pedro",
        email: "pedro.costa@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(41) 5555-4444"],
        pets: generatePets(2)
    },
    {
        nome: "Luiza Pereira",
        nomeSocial: "Luiza",
        email: "luiza.pereira@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(51) 4444-3333"],
        pets: generatePets(4)
    },
    {
        nome: "Rafael Almeida",
        nomeSocial: "Rafa",
        email: "rafael.almeida@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(61) 3333-2222", "(61) 9999-0000"],
        pets: generatePets(1)
    },
    {
        nome: "Fernanda Lima",
        nomeSocial: "Fê",
        email: "fernanda.lima@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(71) 2222-1111"],
        pets: generatePets(2)
    },
    {
        nome: "Marcos Ribeiro",
        nomeSocial: "Marcos",
        email: "marcos.ribeiro@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(81) 1111-0000"],
        pets: generatePets(3)
    },
    {
        nome: "Juliana Martins",
        nomeSocial: "Ju",
        email: "juliana.martins@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(11) 9876-5432"],
        pets: generatePets(1)
    },
    {
        nome: "Lucas Ferreira",
        nomeSocial: "Lucas",
        email: "lucas.ferreira@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(21) 8765-4321"],
        pets: generatePets(2)
    },
    {
        nome: "Patrícia Gomes",
        nomeSocial: "Paty",
        email: "patricia.gomes@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(31) 7654-3210"],
        pets: generatePets(1)
    },
    {
        nome: "Rodrigo Barbosa",
        nomeSocial: "Rod",
        email: "rodrigo.barbosa@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(41) 6543-2109"],
        pets: generatePets(3)
    },
    {
        nome: "Amanda Castro",
        nomeSocial: "Amanda",
        email: "amanda.castro@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(51) 5432-1098"],
        pets: generatePets(2)
    },
    {
        nome: "Gustavo Nunes",
        nomeSocial: "Guga",
        email: "gustavo.nunes@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(61) 4321-0987"],
        pets: generatePets(1)
    },
    {
        nome: "Isabela Rocha",
        nomeSocial: "Bela",
        email: "isabela.rocha@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(71) 3210-9876"],
        pets: generatePets(4)
    },
    {
        nome: "Daniel Mendes",
        nomeSocial: "Dani",
        email: "daniel.mendes@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(81) 2109-8765"],
        pets: generatePets(1)
    },
    {
        nome: "Tatiane Andrade",
        nomeSocial: "Tati",
        email: "tatiane.andrade@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(11) 1098-7654"],
        pets: generatePets(2)
    },
    {
        nome: "Bruno Carvalho",
        nomeSocial: "Bruno",
        email: "bruno.carvalho@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(21) 0987-6543"],
        pets: generatePets(1)
    },
    {
        nome: "Vanessa Teixeira",
        nomeSocial: "Vane",
        email: "vanessa.teixeira@email.com",
        cpf: generateCPF(),
        rgs: generateRGs(),
        telefones: ["(31) 9876-5432", "(31) 1234-5678"],
        pets: generatePets(3)
    }
];

export { clientes, produtos, servicos };