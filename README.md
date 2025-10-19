# ESW-fullstack
Testes unitários, aceitação e integração

Autor: Michael Rafael de Andrade
Engenharia de Software - Conversor Textos Simples 
"objetivo desta aplicação é desenvolver uma solução que converta o texto utilizando as letras de trás para frente formando uma nova palavra e realizar testes para verificar a consistência, qualidade e integridade da aplicação".

Para rodar a aplicação deve inicializar as depêndencias:
    npm init - y ( Inicializar o projeto Node.js)
        Observação: vai criar o pacote package.json

    npm install express
        Observação: vai instalar as dependências do node express, 
        irá criar uma nova pasta chamada node_modules que contém os arquivos Express e todas as bibliotecas disponíveis do Express, além disso atualiza o package.json.
    
    npm install puppetter jest-cucumber --save-dev
        observação: Vai instalar a biblioteca do Google que nos permite controlar um navegador headless (sem interface gráfica). Simular End-to-End, E2E e garantir a cobertura da interface.
        jest-cucumber: Vai criar uma ponte entre o jest e o formato Gherkin(Given/when/then), permitindo escrever testes de aceitação em linguagem natural.
        
