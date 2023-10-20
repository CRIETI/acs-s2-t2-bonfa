import * as fs from 'fs';
//npm install -g ts-node
//npm install -g typescript

let dados = [
	{
		nome: "Eduardo Bonfandini",
		fone: "51 99841 5375",
		cidade: "Estrela - RS"
	},
	{
		nome: "Fabricio Pretto",
		fone: "51 99684 9123",
		cidade: "Arroio do Meio - RS"
	},
	{
		nome: "Mateus Roveda",
		fone: "51 99555 8131",
		cidade: "Lajeado - RS"
	},
];

let header = '"Nome";"Fone";"Cidade"\r';
let csv = header;

for (let idx in dados)
{
	let pessoa = dados[idx];
	csv += '"'+pessoa.nome+'";"'+pessoa.fone+'";"'+pessoa.cidade+'"\r';
}

console.log(csv);

fs.writeFileSync('output.csv', csv);
