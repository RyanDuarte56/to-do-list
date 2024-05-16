const inputTarefa = document.getElementById('input-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const mensagemErro = document.getElementById('mensagem-erro-escondida');
const listaTarefas = document.getElementById('lista-tarefas');

let lista = JSON.parse(localStorage.getItem('lista')) || [];

exibirLista();

if (lista.length > 0) {
  adicionarEventoBotaoRemover();
}

inputTarefa.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    botaoAdicionar.click();
  }
});

botaoAdicionar.addEventListener('click', () => {
  adicionarTarefa();
  exibirLista();
  adicionarEventoBotaoRemover();
});

function adicionarEventoBotaoRemover() {
  const botaoRemover = document.querySelectorAll('.botao-remover');
  botaoRemover.forEach((botao) => {
    botao.addEventListener('click', () => {
      removerTarefa(botao.parentElement);
    });
  });
}

function adicionarTarefa() {
  const tarefaDigitada = inputTarefa.value;

  if (tarefaDigitada === '') {
    exibirErro();
  } else {
    lista.push(tarefaDigitada);
    esconderErro();
  }

  inputTarefa.value = '';

  salvarStorage();
}

function removerTarefa(tarefa) {
  const index = Number(tarefa.id);
  lista.splice(index, 1);
  tarefa.remove();

  const tarefas = document.querySelectorAll('li');
  for(let i = index; i < tarefas.length; i++) {
    idAtual = Number(tarefas[i].id);
    tarefas[i].id = `${idAtual - 1}`;
  }

  salvarStorage();
}

function exibirLista() {
  let html = '';
  lista.forEach((tarefa) => {
    html += `
      <li id="${lista.indexOf(tarefa)}">
        ${tarefa}
        <button class="botao-remover">Remover</button>
      </li>
    `;
  });
  listaTarefas.innerHTML = html;
}

function exibirErro() {
  mensagemErro.id = 'mensagem-erro-visivel';
}

function esconderErro() {
  mensagemErro.id = 'mensagem-erro-escondida';
}

function salvarStorage() {
  localStorage.setItem('lista', JSON.stringify(lista));
}