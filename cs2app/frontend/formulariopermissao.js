let form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', async (event) =>
{
    event.stopPropagation();
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const idUsuario = urlParams.get('idUsuario');
    const id = urlParams.get('id');
  
    let tipoEl = document.getElementById('tipo')
    let tipo = tipoEl.options[tipoEl.selectedIndex].value;
    let idPagina = document.getElementById('idPagina').value;
  
    let payload = {
      tipo,
      idPagina,
      idUsuario
    }
    console.log(payload);
  
    let url = 'http://localhost:3000/permissoes';
    let method = 'POST';

    if (id) 
    {
      url += '/' + id;
      method = 'PUT';
    }
  
    let resposta = await fetch(url, 
    {
      method: method,
      headers: 
      {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log(resposta);
  
    if (resposta.ok) 
    {
        window.location.href = 'formulario.html?id='+idUsuario
    }
    else
    {
        alert('Ops! Algo deu errado!');
    }

  });
  