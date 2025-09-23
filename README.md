# Gerenciador de hábitos gamificado

Este é um aplicativo web para gerenciamento de hábitos e afazeres com funções de gamificação. Permite que o usuário aumente atributos de Corpo, Mente e Espiríto enquanto ganha moedas para se recompensar por um trabalho bem feito. Criado com Next, React, TypeScript e Tailwind, e faz uso do pacote [dnd-kit](https://dndkit.com/).

## Índice

-  [Previews](#previews)
-  [Como usar](#como-usar)
   -  [Atributos](#atributos)
   -  [Hábitos](#hábitos)
   -  [Afazeres](#afazeres)
   -  [Loja](#loja)
   -  [Editando e removendo itens](#editando-e-removendo-itens)
   -  [Remover tudo](#remover-tudo)
-  [Posfácio](#posfácio)
   -  [Autor](#autor)

## Previews

![alt text](<public/img/Screenshot 2025-09-23 at 11-58-19 Quest Tracker.png>)
![alt text](<public/img/Screenshot 2025-09-23 at 11-58-04 Quest Tracker.png>)

## Como usar

O site pode ser acessado no seguinte link: https://gamified-habit-tracker-lilac.vercel.app/

Ao acessar pela primeira vez, você se encontrará com a tela inicial. Você pode alterar entre modo claro e escuro à vontade.

### Atributos

No topo da tela você verá os seus atributos: Corpo, Mente e Espírito, além de suas moedas, que serão explicadas em breve.

Corpo é para tarefas que contribuem para sua força e saúde física. Mente é para o seu conhecimento e raciocínio. E Espírito é para seus relacionamentos e saúde emocional.

Ao criar um hábito ou afazer, você pode escolher qual atributo este estará relacionado. Ao completá-lo, você recebe experiência no atributo escolhido dependendo da dificuldade e importância da tarefa.

Ao completar tarefas o suficiente, o nível do atributo aumenta, junto de quanta experiência é necessária para aumentar outra vez.

### Hábitos

A primeira coisa abaixo dos atributos é a lista de hábitos. No início, ela está vazia, mas você pode clicar no botão de adicionar para abrir um formulário.

Com ele, você pode escolher o nome, atributo, dificuldade e importância do seu hábito. Note que o que é difícil ou importante varia com cada pessoa e caso. Passar tempo com amigos pode não parecer ter benefício material em comparação com estudar para uma prova, porém ambos são importantes para sua saúde.

Cada hábito possui uma caixa para marcá-lo como concluído, seu atributo, nome, e sequências atual e maior (quantas vezes você o realizou em seguida). Você também pode arrastar e soltar cada hábito onde desejar.

### Afazeres

Afazeres funcionam de forma parecida com hábitos, porém eles são feitos para serem marcados somente uma vez. São tarefas simples como jogar o lixo fora, arrumar a cama, ou cozinhar para uma festa. Por isso, não possuem sequências como hábitos, e há um botão no início da lista para apagar todos os afazeres concluídos de uma vez.

### Loja

Cada hábito ou afazer concluído fornece moedas. Essas moedas podem ser usadas na loja para comprar recompensas. Afinal, trabalhar e trabalhar sem fim não é modo de viver.

A loja vem com quatro itens padrões: guloseima, jogar por 30 minutos, ver um filme, e comprar uma nova roupa. Porém você também pode adicionar itens à sua escolha.

### Editando e removendo itens

Do lado de cada item, seja hábito, afazer ou item de loja, há um botão para editar e um para remover.

Para hábitos e afazeres, o botão de editar abre a janela do formulário de adicionar, porém agora para editar; e o botão de remover abre uma confirmação.

Já para itens da loja, editar muda o item para caixas de texto em que o usuário pode digitar, e o botão de remover faz isso imediatamente.

### Remover tudo

No fim da tela, você encontrará botões para remover todos os itens e para resetar os atributos (incluindo moedas). Eles abrem uma confirmação antes de realizar a ação, porém ainda tenha em mente que esta é uma ação irreversível.

## Posfácio

Repositório: https://github.com/gab-souza-martins/gamified-habit-tracker

### Autor

GitHub: https://github.com/gab-souza-martins

Portifólio: https://gab-souza-martins.github.io/portifolio-junior/
