// Carrega o componente de navbar
fetch('components/navbar/navbar.html')
  .then(response => response.text())
  .then(html => {
    // Cria um elemento div para conter a navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = html;
    
    // Adiciona a navbar ao contêiner
    const appContainer = document.querySelector('#navbar-container');
    appContainer.insertBefore(navbarContainer, appContainer.firstChild);


    verificaLogin();

    loadFunctions();
  });


  function loadFunctions(){
    const aboutButton = document.querySelector('#loginButton');
    // Adiciona o evento de clique ao botão
    aboutButton.addEventListener('click', () => {
      window.location.hash = 'login';
    });


    document.querySelector('#logoutButton').addEventListener('click', () => {
      localStorage.removeItem('logado');
      alert("Deslogado com sucesso");
      verificaLogin();
      window.location.hash = '#';
    });
  }



  