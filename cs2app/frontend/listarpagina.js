let corpoTabela = document.getElementById('corpo-tabela');

async function buscarPaginas () 
{
  let resposta = await fetch('http://localhost:3000/paginas');
  let paginas = await resposta.json();

  for (let pagina of paginas) 
  {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td');
    
    tdId.innerText = pagina.id;
    tdNome.innerText = pagina.nome;
    tdAcoes.innerHTML = `
      <a href="formulariopagina.html?id=${pagina.id}">Editar</a>
      <button onclick="excluirPagina(${pagina.id})">Excluir</button>
    `;

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluirPagina (id) 
{
    if (confirm('Confirma remoção de registro?'))
    {
      await fetch('http://localhost:3000/paginas/' + id,
      {
          method: 'DELETE',
          headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
          }
      });

      window.location.reload();
    }
}

buscarPaginas();
