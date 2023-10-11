import { useEffect, useState } from "react";
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from "./style";

function App() {
  //Estado de tarefas, esse vai ser o array de tarefas
  const [tarefas, setTarefas] = useState([]);
  //Isso aqui vai ser o lugar onde entram os inputs
  const [valorDoInput, setValorDoInput] = useState("");
  //Aqui vai ser o estado dos filtros
  const [filtro, setFiltro] = useState("");

  //useEffect para armazenas as tarefas no LocalStorage
  useEffect(() => {
    const tarefasString = JSON.stringify(tarefas);
    if (tarefas.length > 0) {
      localStorage.setItem("tarefas", tarefasString);
    }
    //Aqui é o array de dependência --> Nesse caso indica que o useEffect acontecerá quando [tarefas] mudar
  }, [tarefas]);

  //UseEffect para manter as atividades na tela após recarregar
  useEffect(() => {
    //Aqui pego o que foi guardado no LocalStorage e transformo num array novamente para exibir na tela
    const pegarTarefas = JSON.parse(localStorage.getItem("tarefas"));
    //Esse if é para ver se o pegarTarefas está vazio ou não
    if (pegarTarefas) {
      //setTarefas muda o estado tarefas e coloca o pegarTarefas
      setTarefas(pegarTarefas);
    }
  }, []);
  //Função para pegar o valor do input, permitindo também digitar no input(Lá embaixo declarando o onChange)
  const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value);
  };

  //Função para criar tarefa
  const criarTarefa = () => {
    //Primeiro criando uma variável para ser a base de informações das tarefas
    const baseTarefas = {
      //id que vai ser
      id: Date.now(),
      //texto que vai ser pego do input preenchido pelo usuário
      texto: valorDoInput,
      //atributo inicial das tarefas
      completa: false,
    };
    //Ainda dentro da função criar tarefa, pegamos a baseTarefas e inserimos no array tarefas
    const copiaDoEstado = [...tarefas, baseTarefas];
    //Para evitar adição de tarefas em branco
    if (valorDoInput.trim() !== "") {
      //Para mudar o estado tarefas
      setTarefas(copiaDoEstado);
      //Pra deixar o espaço que vou digitar em branco
      setValorDoInput("");
    }
  };
  //id vai representar o array tarefas, "item" representará cada tarefa do array tarefas
  const selecionarTarefa = (id) => {
    //Criei variável para poder fazer o map e setar nas tarefas
    const tarefasAtualizadas = tarefas.map((item) => {
      //Lógica: se a propriedade id da tarefa selecionada for igual a algum "item" presente no array tarefas
      if (item.id === id) {
        //...ele irá repetir as propriedades da tarefa, invertendo o valor de completa.
        return { ...item, completa: !item.completa };
      } else {
        //caso não seja igual, retorne o item sem alteração
        return item;
      }
    });
    //Atualiza em tarefas as mudanças da função, mudança da propriedade "completa" 
    setTarefas(tarefasAtualizadas);
  };
//Atualiza valor do select
  const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value);
  };

  //função para filtrar as tarefas em pendentes ou completas
  const listaFiltrada = tarefas.filter((tarefa) => {
    //filtro é o value do select, que tem duas options com value "pendentes" e "completas"
    switch (filtro) {
      //Caso "pendentes"
      case "pendentes":
        //retornará o oposto do valor da propriedade "completa"
        return !tarefa.completa;
        //caso completa
      case "completas":
        //retornará o valor da propriedade completa sem alteração
        return tarefa.completa;
      default:
        //default true?
        return true;
    }
  });
//-----------------> Criando ação para remover tarefas e limpar o LocalStorage
const limparStorage = ()=>{
  localStorage.removeItem("tarefas")
  setTarefas([])
}


  return (
    <DivContainer>
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={valorDoInput} onChange={pegarValorDoInput} />
        <button onClick={criarTarefa}>Adicionar</button>
        <button onClick={limparStorage}>Limpar tudo</button>
      </InputsContainer>
      <br />
      

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={pegarValorDoSelect}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <ListaDeTarefas>
        {listaFiltrada.map((tarefa) => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selecionarTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          );
        })}
      </ListaDeTarefas>
    </DivContainer>
  );
}

export default App;