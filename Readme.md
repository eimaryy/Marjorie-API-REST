# Marjorie's Beauty API REST

A Marjorie's Beauty API REST foi projetada para fornecer acesso a dados de produtos, gestão de usuários, carrinho, servidor de imagem e muito mais. Seguindo os princípios RESTful, a API permite interações robustas e flexíveis através de endpoints bem definidos e organizados.

A API oferece suporte completo a operações CRUD (Create, Read, Update, Delete), proporcionando total controle sobre produtos, carrinhos e usuários. Além disso, a API inclui recursos como autenticação de usuários, gerenciamento de papéis de usuário, rotas protegidas, login, criptografia e muito mais. Para o armazenamento dos dados, foi utilizado o MongoDB Atlas. Variáveis de ambiente são usadas para configuração e segurança.

# Rotas Disponíveis

## Usuários

- `GET /users`: Lista todos os usuários (Requer autenticação e permissões)
- `GET /user`: Retorna informações do usuário autenticado (Requer autenticação)
- `POST /user/create`: Cria um novo usuário
- `PUT /user`: Atualiza informações do usuário autenticado (Requer autenticação)
- `DELETE /user`: Deleta o usuário autenticado (Requer autenticação)

## Produtos

- `GET /produtos`: Lista todos os produtos (Suporta paginação)
- `GET /produto/search/:id`: Retorna um produto específico por ID
- `GET /produtos/category/:category`: Lista produtos por categoria (Suporta paginação)
- `GET /produtos/search/keyword/:keyword`: Lista produtos por palavra-chave (Suporta paginação)
- `POST /produto/create`: Cria um novo produto (Requer autenticação, permissões e upload de arquivo)
- `PUT /produto/:id`: Atualiza um produto específico por ID (Requer autenticação, permissões e upload de arquivo)
- `DELETE /produto/:id`: Deleta um produto específico por ID (Requer autenticação e permissões)

## Carrinho

- `POST /carrinho/:id`: Adiciona um item ao carrinho do usuário autenticado (Requer autenticação)
- `GET /carrinho`: Retorna o carrinho do usuário autenticado (Requer autenticação)
- `DELETE /carrinho/:id`: Remove um item do carrinho do usuário autenticado (Requer autenticação)

## Autenticação

- `POST /auth/login`: Realiza o login do usuário

#Utilizando a API

## Instalação

Para instalar as dependências necessárias:

```bash
npm install
```

## Para iniciar o servidor em modo de produção:

```bash
npm start
```

## Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Para acessar o site oficial de Marjorie’s Beauty, visite: [Site oficial Marjorie`s Beauty](https://candid-selkie-04c69c.netlify.app/)

