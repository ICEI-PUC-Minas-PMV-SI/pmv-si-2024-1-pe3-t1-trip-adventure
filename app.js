const API_URL =  'http://localhost:3000';

// Função para carregar um componente
function loadComponent(componentName) {
    const componentPath = `components/${componentName}/${componentName}.html`;
    fetch(componentPath)
      .then(response => response.text())
      .then(html => {
        const content = document.querySelector('#content');
  
        // Carrega o arquivo JS do componente
        const scriptPath = `components/${componentName}/${componentName}.js`;
        const script = document.createElement('script');
        script.src = scriptPath;
        content.appendChild(script);

        const stylePath = `components/${componentName}/${componentName}.css`;
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = stylePath;
        console.log(style);
        document.head.appendChild(style);

        content.innerHTML = html;
      });
  }
  
  // Função para gerenciar as rotas da aplicação
  function handleRoute(route) {
    var splitRoute = route.split('/');
    console.log(splitRoute);
    switch (splitRoute[0]) {
      case '':
        loadComponent('home');
        break;
      case 'home':
        loadComponent('home');
        break;
      case 'login':
      loadComponent('login');
        break;
      case 'create-point':
        loadComponent('create-point');
        break;    
        
      case 'register':
        loadComponent('register');
        break;   

      case 'find-point':
        loadComponent('find-point');
        break;  

      case 'edit-user':
        loadComponent('edit-user');
        break; 

      case 'user-painel':
        loadComponent('user-painel');
        break; 
      
      default:
        // Se a rota não for encontrada, redireciona para a página inicial
        window.location.hash = '';
        loadComponent('home');
    }
  }
  
  // Listener para o evento de mudança de hash
  window.addEventListener('hashchange', () => {
    const route = window.location.hash.substring(1);
    handleRoute(route);
  });
  
  // Carrega o componente inicial
  handleRoute(window.location.hash.substring(1));
  
  // FUNCOES API CRUD

  // Cria um novo item
  async function createItem(itemData, rota = null) {
    const response = await fetch(`${API_URL}/${rota}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    if (!response.ok) {
      throw new Error('Erro na criação');
    }
    
    return response.json();
  }
  
  // Busca todos os itens
  async function getItems(rota = null) {
    const response = await fetch(`${API_URL}/${rota}`);
    
    if (!response.ok) {
      throw new Error('Erro na busca');
    }
    
    return response.json();
  }
  
  // busca apenas um pelo id
  async function getItemById(itemId) {
    const response = await fetch(`${API_URL}/${itemId}`);
    
    if (!response.ok) {
      throw new Error('Erro na busca');
    }
    
    return response.json();
  }
  
  // Atualiza
  async function updateItem(itemId, itemData) {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    if (!response.ok) {
      throw new Error('Erro na atualização');
    }
    
    return response.json();
  }
  
  // Deleta
  async function deleteItem(itemId) {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Erro no delete');
    }
    
    return response.json();
  }


  function convertToBase64(file) {
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunk size (adjust as needed)
    const fileSize = file.size;
    let offset = 0;
  
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.onload = (event) => {
        const chunk = event.target.result;
        offset += chunk.length;
  
        if (offset < fileSize) {
          readNextChunk();
        } else {
          const base64String = btoa(chunk);
          resolve(base64String);
        }
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
  
      function readNextChunk() {
        const fileSlice = file.slice(offset, offset + CHUNK_SIZE);
        fileReader.readAsBinaryString(fileSlice);
      }
  
      readNextChunk();
    });
  }

  function verificaLogin(){
    var usuario = JSON.parse(localStorage.getItem("logado"));
    var loginButton = document.getElementById('loginButton');
    var loginContainer = document.getElementById('loginContainer');
    var loggedInUsername = document.getElementById('loggedInUsername');
    var logoutButton = document.getElementById('logoutButton');
    var logoutDropdown = document.getElementById('logoutDropdown');
  
    if (usuario) {
      loginButton.style.display = 'none';
      loggedInUsername.textContent = usuario.nome;
      loginContainer.classList.add('dropdown');
      logoutDropdown.style.display = '';
      logoutButton.style.display = 'block';

    } else {
      loginButton.style.display = 'block';
      loggedInUsername.textContent = '';
      loginContainer.classList.remove('dropdown');
      logoutButton.style.display = 'none';
      logoutDropdown.style.display = 'none';
    }
  }