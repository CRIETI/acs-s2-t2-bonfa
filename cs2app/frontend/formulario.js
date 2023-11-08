const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputNome = document.getElementById('nome');
let inputEmail = document.getElementById('email');
let inputSenha = document.getElementById('senha');
let form = document.getElementById('formulario');

async function buscarDados ()
{
  let resposta = await fetch('http://localhost:3000/usuarios/' + id);

  if (resposta.ok) 
  {
    let usuario = await resposta.json();
    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputSenha.value = usuario.senha;

    buscarPermissoes(usuario.id);
  }
  else if (resposta.status === 422) 
  {
    let e = await resposta.json();
    alert(e.error);
  } 
  else 
  {
    alert('Ops! Algo deu errado!');
  }
}

async function buscarPermissoes(idUsuario) 
{
  let btnAdicionarPermissao = document.getElementById('adicionar-permissao');
  let corpoTabela = document.getElementById('corpo-tabela');
  let url = 'http://localhost:3000/permissoes/?idUsuario=' + idUsuario;
  console.log(url);
  let resposta = await fetch(url);
  let permissoes = await resposta.json();
  console.log(permissoes);

  btnAdicionarPermissao.href = 'formulariopermissao.html?idUsuario='+idUsuario

  for (let permissao of permissoes) 
  {
    let tr = document.createElement('tr');
    let tdCodigo = document.createElement('td');
    let tdTipo = document.createElement('td');
    let tdPagina = document.createElement('td');
    let tdAcoes = document.createElement('td');

    //let respostaPagina = await fetch('http://localhost:3000/paginas/'+permissao.idPagina)
    //pagina = await respostaPagina.json();
    //console.log(pagina);

    console.log(permissao)

    tdCodigo.innerText = permissao.id;
    tdTipo.innerText = permissao.tipo;
    tdPagina.innerText = permissao.pagina.nome;
    
    tdAcoes.innerHTML = `
      <a class="button" href="formulariopermissao.html?id=${permissao.id}">Editar</a>
      <button onclick="excluir(${permissao.id})">Excluir</button>
    `;

    tr.appendChild(tdCodigo);
    tr.appendChild(tdTipo);
    tr.appendChild(tdPagina);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

// Está editando
if (id) 
{
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let nome = inputNome.value;
  let email = inputEmail.value;
  let senha = inputSenha.value;

  let payload = {
    nome,
    email,
    senha,
  }

  let url = 'http://localhost:3000/usuarios';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = 'index.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});
