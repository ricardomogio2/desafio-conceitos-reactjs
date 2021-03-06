import React, {useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories')
      .then(response => {
        setRepositories(response.data)
      })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repo ${Date.now()}`,
      url: 'https://github.com/repositories',
      techs: ['React', 'ReactJS', 'JS']
    })

    const repository = response.data
    console.log(repository)

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const filteredRepos = repositories.filter(repository => repository.id != id)
    
    setRepositories(filteredRepos)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        {
          repositories.map(repository => (
            <li key={repository.id}>
              <p>{repository.title}</p>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
