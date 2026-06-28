# Formulário Inteligente de Cadastro de Endereço

Este é um projeto de um formulário de cadastro que preenche o endereço de forma automática assim que a pessoa digita o CEP. O objetivo principal foi criar uma tela bonita, fácil de usar e que evite que o usuário cometa erros ao digitar.

## Qual problema este projeto resolve?

Em formulários comuns, as pessoas costumam errar a digitação do nome da rua ou do bairro, o que pode fazer com que uma entrega seja enviada para o lugar errado. 

Este sistema resolve isso buscando os dados oficiais direto dos Correios (através do serviço ViaCEP). O usuário só precisa digitar os números do CEP, e o sistema faz o resto do trabalho duro por ele.

## O que este formulário faz de especial?

- **Só aceita números:** Se o usuário tentar digitar letras no campo do CEP, o sistema apaga as letras na mesma hora para evitar erros.
- **Coloca o traço sozinho:** Conforme a pessoa digita, o formato muda automaticamente para `00000-000`, facilitando a leitura.
- **Campos protegidos:** Os campos de Rua, Bairro e Cidade ficam cinzas e bloqueados para digitação. Isso impede que o usuário altere os dados oficiais sem querer.
- **Pensado para o Brasil ("Sem Número"):** Muitas casas e áreas rurais no Brasil não têm número oficial. O formulário tem uma caixinha "Sem número" que, ao ser marcada, preenche o campo automaticamente com "S/N", permitindo que qualquer pessoa consiga finalizar seu cadastro.
- **Não perde os dados:** Se a pessoa fechar a página da internet por engano no meio do preenchimento, quando ela abrir o site de novo, o endereço continuará lá salvo.

## O que foi usado para construir?

- **HTML:** Para criar os campos de texto e botões da tela.
- **CSS:** Para deixar o visual moderno, com cores agradáveis e organizado.
- **JavaScript:** O "cérebro" do projeto, responsável por buscar o endereço na internet e fazer as validações.
