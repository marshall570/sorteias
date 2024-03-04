let nomes = [];
let temas = [];
let string_teste = "";

async function loadAlunos(file) {
  let text = await file.text();
  nomes = text.trim().split("\n");
}

async function loadTemas(file) {
  let text = await file.text();
  temas = text.trim().split("\n");
}

function handleDeletes(array, key) {
  let index = array.indexOf(key);
  array.splice(index, 1);
}

function handleEscolha(array) {
  let escolha = array[Math.floor(Math.random() * array.length)];

  return escolha;
}

function appendGrupo(tema, grupo, contador) {
  let div = document.createElement("div");
  let titulo = document.createElement("h1");

  membros = grupo.split("-");
  membros.pop();

  document.querySelector('.sorteio').appendChild(div);
  div.classList.add(`grupos_${contador}`);

  document.querySelector(`.grupos_${contador}`).appendChild(titulo);
  titulo.classList.add("tema");

  titulo.innerHTML = tema.toUpperCase();

  for (let index = 0; index < membros.length; index++) {
    let texto = document.createElement("p");
    document.querySelector(`.grupos_${contador}`).appendChild(texto);
    texto.classList.add("grupo");
    texto.innerHTML = membros[index];
  }
}

function handleSorteio() {
  let tamanho = Math.floor(nomes.length / temas.length);
  let extras = nomes.length % temas.length;
  let contador = 0;

  while (temas.length > 0) {
    let grupo = "";
    let quantidade_membros = 0;

    let tema_sorteado = handleEscolha(temas);
    handleDeletes(temas, tema_sorteado);

    while (quantidade_membros < tamanho) {
      let nome_sorteado = handleEscolha(nomes);
      handleDeletes(nomes, nome_sorteado);
      grupo += `${nome_sorteado}-`;

      quantidade_membros += 1;
    }

    if (extras > 0) {
      let nome_sorteado = handleEscolha(nomes);
      handleDeletes(nomes, nome_sorteado);
      grupo += `${nome_sorteado}-`;

      extras -= 1;
    }

    contador += 1;

    appendGrupo(tema_sorteado, grupo, contador);
  }
}
