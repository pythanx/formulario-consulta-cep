# Consulta de CEP Inteligente com ViaCEP

Uma aplicação moderna de consulta e validação de endereços integrada com a API do ViaCEP, focada em boas práticas de UX (User Experience) e resiliência de código JavaScript.

## Funcionalidades

- **Máscara em Tempo Real:** Formatação automática do CEP (`00000-000`) enquanto o usuário digita.
- **Sanitização de Dados:** Bloqueio instantâneo de caracteres não numéricos.
- **Tratamento de Exceções de UX:** Opção "Sem Número" (S/N) integrada para endereços sem numeração oficial.
- **Preenchimento Inteligente:** Bloqueio automático por teclado (`tabindex="-1"`) para campos gerenciados pelo sistema.
- **Persistência Local:** Armazenamento do progresso via `LocalStorage` para evitar perda de dados.

## Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e acessível.
- **CSS3:** Layout responsivo baseado em Flexbox e estilização moderna.
- **JavaScript (ES6):** Manipulação assíncrona do DOM via `Fetch API` e estruturas `try/catch`.
- **API ViaCEP:** Webservice gratuito para consulta de CEPs brasileiros.
