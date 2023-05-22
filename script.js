let livros = [];
let proximoId = 1;

function adicionarLivro(event) {
  event.preventDefault();

  let titulo = document.getElementById("titulo").value;
  let autor = document.getElementById("autor").value;

  if (!titulo || !autor) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let novoLivro = {
    id: proximoId,
    titulo: titulo,
    autor: autor,
    emprestado: false,
    aluno: "",
    turma: "",
    ano: "",
  };

  livros.push(novoLivro);
  proximoId++;

  limparFormulario("adicionarLivroForm");
  atualizarTabelaLivros();
  atualizarTabelaBiblioteca();

  alert("Livro adicionado com sucesso.");
}

function emprestarLivro(event) {
  event.preventDefault();

  let id = document.getElementById("idEmprestar").value;
  let aluno = document.getElementById("aluno").value;
  let turma = document.getElementById("turma").value;

  let livro = livros.find(function (livro) {
    return livro.id == id;
  });

  if (livro && !livro.emprestado) {
    let confirmacao = confirm(`Você deseja emprestar o livro para ${aluno} da turma ${turma}?`);

    if (confirmacao) {
      livro.emprestado = true;
      livro.aluno = aluno;
      livro.turma = turma;

      limparFormulario("emprestarLivroForm");
      atualizarTabelaLivros();
      atualizarTabelaBiblioteca();

      alert("Livro emprestado com sucesso.");
    }
  } else if (livro && livro.emprestado) {
    alert("O livro já está emprestado.");
  } else {
    alert("Livro não encontrado.");
  }
}

function devolverLivro(event) {
  event.preventDefault();

  let id = document.getElementById("idDevolver").value;

  let livro = livros.find(function (livro) {
    return livro.id == id;
  });

  if (livro && livro.emprestado) {
    let aluno = livro.aluno;
    let turma = livro.turma;

    let confirmacao = confirm(`Você deseja devolver o livro emprestado para ${aluno} da turma ${turma}?`);

    if (confirmacao) {
      livro.emprestado = false;
      livro.aluno = "";
      livro.turma = "";

      limparFormulario("devolverLivroForm");
      atualizarTabelaLivros();
      atualizarTabelaBiblioteca();

      alert(`Livro devolvido com sucesso.\nVocê devolveu o livro emprestado para ${aluno} da turma ${turma}.`);
    }
  } else if (livro && !livro.emprestado) {
    alert("O livro não está emprestado.");
  } else {
    alert("Livro não encontrado.");
  }
}

function excluirLivro(event, id) {
  event.preventDefault();

  let index = livros.findIndex(function (livro) {
    return livro.id == id;
  });

  if (index !== -1) {
    let confirmacao = confirm("Você deseja excluir o livro?");

    if (confirmacao) {
      livros.splice(index, 1);
      atualizarTabelaLivros();
      atualizarTabelaBiblioteca();

      alert("Livro excluído com sucesso.");
    }
  } else {
    alert("Livro não encontrado.");
  }
}

function editarLivro(event) {
  event.preventDefault();

  let id = event.target.dataset.id;
  let livro = livros.find(function (livro) {
    return livro.id == id;
  });

  if (livro) {
    let novoTitulo = prompt("Digite o novo título:", livro.titulo);
    let novoAutor = prompt("Digite o novo autor:", livro.autor);

    if (novoTitulo !== null && novoAutor !== null) {
      livro.titulo = novoTitulo;
      livro.autor = novoAutor;

      atualizarTabelaLivros();
      atualizarTabelaBiblioteca();

      alert("Livro atualizado com sucesso.");
    }
  } else {
    alert("Livro não encontrado.");
  }
}

function pesquisarLivro(event) {
  event.preventDefault();

  let termoPesquisa = document.getElementById("termoPesquisa").value;

  let resultado = livros.filter(function (livro) {
    return (
      livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      livro.autor.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
  });

  exibirResultadoPesquisa(resultado);
}

function exibirResultadoPesquisa(resultado) {
  let resultadoPesquisa = document.getElementById("resultadoPesquisa");
  resultadoPesquisa.innerHTML = "";

  if (resultado.length > 0) {
    let ul = document.createElement("ul");

    resultado.forEach(function (livro) {
      let li = document.createElement("li");
      li.textContent = `${livro.titulo} - ${livro.autor}`;
      ul.appendChild(li);
    });

    resultadoPesquisa.appendChild(ul);
  } else {
    resultadoPesquisa.textContent = "Nenhum livro encontrado.";
  }
}

function limparFormulario(formId) {
  let form = document.getElementById(formId);
  form.reset();
}

function atualizarTabelaLivros() {
  let livrosTable = document.getElementById("livrosTable");
  let tbody = livrosTable.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  livros.forEach(function (livro) {
    let tr = document.createElement("tr");

    let idTd = document.createElement("td");
    idTd.textContent = livro.id;
    tr.appendChild(idTd);

    let tituloTd = document.createElement("td");
    tituloTd.textContent = livro.titulo;
    tr.appendChild(tituloTd);

    let autorTd = document.createElement("td");
    autorTd.textContent = livro.autor;
    tr.appendChild(autorTd);

    let acoesTd = document.createElement("td");
    let editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.dataset.id = livro.id;
    editarBtn.addEventListener("click", editarLivro);
    acoesTd.appendChild(editarBtn);

    let excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";
    excluirBtn.addEventListener("click", function (event) {
      excluirLivro(event, livro.id);
    });
    acoesTd.appendChild(excluirBtn);

    tr.appendChild(acoesTd);

    tbody.appendChild(tr);
  });
}

function atualizarTabelaBiblioteca() {
  let bibliotecaTable = document.getElementById("bibliotecaTable");
  let tbody = bibliotecaTable.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  livros.forEach(function (livro) {
    let tr = document.createElement("tr");

    let idTd = document.createElement("td");
    idTd.textContent = livro.id;
    tr.appendChild(idTd);

    let tituloTd = document.createElement("td");
    tituloTd.textContent = livro.titulo;
    tr.appendChild(tituloTd);

    let autorTd = document.createElement("td");
    autorTd.textContent = livro.autor;
    tr.appendChild(autorTd);

    let alunoTd = document.createElement("td");
    alunoTd.textContent = livro.aluno;
    tr.appendChild(alunoTd);

    let turmaTd = document.createElement("td");
    turmaTd.textContent = livro.turma;
    tr.appendChild(turmaTd);

    let anoTd = document.createElement("td");
    anoTd.textContent = livro.ano;
    tr.appendChild(anoTd);

    let acoesTd = document.createElement("td");
    let devolverBtn = document.createElement("button");
    devolverBtn.textContent = "Devolver";
    devolverBtn.addEventListener("click", function (event) {
      devolverLivro(event, livro.id);
    });
    acoesTd.appendChild(devolverBtn);

    tr.appendChild(acoesTd);

    tbody.appendChild(tr);
  });
}


document.getElementById("adicionarLivroForm").addEventListener("submit", adicionarLivro);
document.getElementById("emprestarLivroForm").addEventListener("submit", emprestarLivro);
document.getElementById("devolverLivroForm").addEventListener("submit", devolverLivro);
document.getElementById("pesquisarLivroForm").addEventListener("submit", pesquisarLivro);

atualizarTabelaLivros();
atualizarTabelaBiblioteca();
