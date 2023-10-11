import styled from 'styled-components'


export const DivContainer = styled.div`
    
  font-family: sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

`

export const ListaDeTarefas = styled.ul`
  padding: 0;
  width: 200px;
`

export const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

export const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`