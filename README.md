# RDLSC - Backend

Backend do Projeto "RDLSC"

Projeto NodeJS com TypeScript, ESLint e Prettier.

## Ambiente de desenvolvimento

* Node

* Yarn

* Visual Studio Code
  - VSCode extensions
    - Name: Live Server Id: ritwickdey.liveserver
      Description: Launch a development local Server with live reload feature for static & dynamic pages

* Docker
  * Instalar Postgres
    * $ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    * $ docker start postgres

  * Instalar Mongo DB no Docker
    * $ docker run --name mongodb -p 27017:27017 -d -t mongo
    * $ docker start mongodb

    * mongodb compass community para gerenciar o Mongo

  * Redis (Tabela unica com chave e valor)
    * $ docker run --name redis -p 6379:6379 -d -t redis:alpine
    * $ docker start redis

* Limpar cache de testes do JEST
  * $ yarn jest --clearCache



### Padronizaçãp do projeto

* Instalar plugin "EditorConfig for VS Code"

* Botão direito na pasta do projeto e escolher "Generate .editorconfig"

* Instalar plugin "ESLint"

* settings.json
```
{
    "workbench.colorTheme": "Omni",
    "workbench.iconTheme": "material-icon-theme",
    "workbench.startupEditor": "newUntitledFile",
    "terminal.integrated.fontSize": 14,
    "editor.tabSize": 2,
    "editor.fontSize": 16,
    "editor.lineHeight": 24,
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": false,
    "explorer.compactFolders": false,
    "editor.renderLineHighlight": "gutter",
    "workbench.editor.labelFormat": "short",
    "extensions.ignoreRecommendations": true,
    "javascript.updateImportsOnFileMove.enabled": "never",
    "typescript.updateImportsOnFileMove.enabled": "never",
    "breadcrumbs.enabled": true,
    "editor.parameterHints.enabled": false,
    "explorer.confirmDragAndDrop": false,
    "explorer.confirmDelete": false,
    "editor.rulers": [
        80,
        120
    ],
    "[javascript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[javascriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[typescript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[typescriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "git.enableSmartCommit": true,
    "window.zoomLevel": 0,
    "editor.minimap.enabled": false,

    "editor.semanticHighlighting.enabled": false,

    "material-icon-theme.activeIconPack": "nest",

    "material-icon-theme.folders.associations": {
        "infra": "app",
        "entities": "class",
        "schemas": "class",
        "typeorm": "database",
        "repositories": "mappings",
        "http": "container",
        "migrations": "tools",
        "modules": "components",
        "implementarions": "core",
        "dtos": "typescript",
        "fakes": "mock"
    },

    "material-icon-theme.files.associations": {
        "ormconfig.json": "database",
        "tsconfig.json": "tune"
    }
}
```

## Development flow

* Criar estrutura de pastas
```bash
rdlsc-backend
  - src
    - @types (ajustes typscript)
    - config (configurações gerais: autenticação, cache, email, upload)
    - modules (modulos da aplicação)
      - nome_modulo
        - dtos (Definição das interfaces DTO - Data Transfer Object)
        - infra
          - http
            - controllers
            - middlewares?
            - routes
          - typeorm
            - entities
            - repositories
        - providers?
          - nome_provider (exemplo: hashprovider)
            - fakes
            - implementations
            - models (definição da interface do provider)
        - repositories
          - fakes?
        - services (um arquivo por serviço, ou chamada da API)
    - shared
      - container
        - providers (cache, mail, etc)
        - errors (padrão para mensagem de erro)
        - infra
          - http
            - middlewares
            - routes
          - typeorm
            - migrations
```
* Desenvolver os modulos
  * criar estrutura de pastas e arquivos para cada modulo (src/modules/nome_novo_modulo)
  * criar e executar migrations
  * atualizar rotas em src/shared/infra/http/routes
  * atualizar injeção de dependencias em src/shared/container

### Data Flow Diagram

![Data Flow Diagram](/.github/dataFlowDiagram.png)

## AWS SES

* Para novos usuários do Amazon SES – Se você ainda não solicitou um aumento no limite de envios, isso significa que você ainda está no ambiente de sandbox e só poderá enviar e-mails para endereços previamente verificados. Para confirmar um novo endereço de e-mail ou domínio, consulte a seção Identity Management do console do Amazon SES.

```
  Checking the Sandbox Status for Your Account

  You can use the Amazon SES console to determine if your account is still in the sandbox.

  To determine if your account is in the sandbox

  Open the Amazon SES console at https://console.aws.amazon.com/ses/.

  Use the Region selector to choose an AWS Region.

  In the navigation pane, under Email Sending, choose Sending Statistics.

  If your account is still in the sandbox in the AWS Region that you selected, you see a banner at the top of the page that resembles the example in the following image.
```

### Amazon S3 = CDN (Content Delivery Network)

* criar conta IAM (obter ID an secret key) com acesso S3
* criar bucket

### Lembretes

* Migration
  * yarn typeorm migration:create -n CreateNAME_MIGRATION
  * yarn typeorm migration:run
  * yarn typeorm migration:revert

### Links

* http://www.md5.cz/ - Online generator md5 hash of a string
* https://jwt.io/ - JWT.IO allows you to decode, verify and generate JWT.


## Deploy Backend

* www.digitalocean.com

* Gerar o Build
  * $ yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver
  * $ yarn add -D babel-plugin-transform-typescript-metadata @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
  * criar babel.config.js
  * atualizar script build em package.json
  * $ yarn build

* Testar build
  * $ node dist/shared/infra/http/server.js

* Gerar chaves/certificado para acesso seguro ao digitalocen
  * No Windows user o puttykeygen https://www.putty.org/

* Atualizar ambiente (linux)
  * $ apt update
  * $ apt upgrade
  * $ adduser deploy
  * $ usermod -aG sudo deploy
  * $ cd /home/deploy
  * $ mkdir .ssh
  * $ chown deploy:deploy .ssh/
  * $ cp ~/.ssh/authorized_keys /home/deploy/.ssh/
  * $ chown deploy:deploy authorized_keys

* Instalar node
  * $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  * $ sudo apt-get install -y nodejs
  * $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  * $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  * $ sudo apt update && sudo apt install --no-install-recommends yarn

* clonar repositorio do git dentro do servidor (digital-ocean)
  * criar certificado: $ ssh-keygen
  * $ cat ~/.ssh/id_rsa.pub
  * Copia a chave publica (txt) e informa no github
    - profile >> settings >> SSH and GPG Keys >> new SSH Keys
    - informa title e cola a key
  * $ mkdir app (in /home)
  * $ cd app
  * $ git clone git@github.com:leocairos/rdlsc-backend.git
  * $ cd rdlsc-backend
  * $ yarn
  * $ yarn build

* instalar serviço do docker (postgres, mongo e redis)
  * sudo groupadd docker
  * sudo usermod -aG docker $USER
  * logout ($ Ctrl+D)
  * $ docker run -d --name postgresql -e POSTGRESQL_PASSWORD=MySecretPSpsswrd@2020c -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=rdlsc-db -p 45432:5432 bitnami/postgresql:latest

  * ajustar ormconfig.json
    * $ cp ormconfig.example ormconfig.json
    * $ vim ormconfig.json
    * alterar port, username, database, entities, migrations, cli
      * dist ao inves de src
      * js ao inves de ts
  * executar as migrations: $ ./node_modules/.bin/typeorm migrations:run

  * $ docker run -d --name mongodb -e MONGODB_USERNAME=rdlsc -e MONGODB_PASSWORD=MongoScrtKy2020c -e MONGODB_DATABASE=rdlsc-db -p 37017:27017 bitnami/mongodb:latest
  *  atualizar port, username e password na secção do Mongo do ormconfig.json

  * $ docker run -d --name redis -e REDIS_PASSWORD=PsswrdRds2020key123 -p 56379:6379 bitnami/redis:latest

  * ajustar .env
    * $ cp .env.example .env
      *  REDIS_PORT, REDIS_PASS e APP_SECRET

  * testar execução: $ node dist/shared/infra/http/server.js

* proxy e redirect
  * $ sudo apt install nginx
  * $ sudo ufw allow 80
  * $ sudo su
    * $ cd /etc/nginx/sites-available
    * $ cp default api-adviser
    * $ vim api-adviser
    ```
    server {

        server_name _;

        location / {
                proxy_pass http://localhost:3333;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

    }
    ```

    * $ cd /etc/nginx/sites-enabled
    * $ ln -s /etc/nginx/sites-available/api-adviser api-adviser
    * $ rm default
    * testar configuração: $ nginx -t
    * reiniciar nginx: $ service nginx reload && service nginx restart
    * $ exit
  * $ cd ~/app/rdlsc-backend/
  * Executar backend: $ node dist/shared/infra/http/server.js

* Mantendo aplicação no ar
  * Ajustar cada container para inicializar automaticamente
    * $ docker update --restart=unless-stopped IDCONTAINER
    * $ docker update --restart=unless-stopped 7778bc50f488
    * $ docker update --restart=unless-stopped 7f688404f1ab
    * $ docker update --restart=unless-stopped c267206147c0

  * instalar pm2: $ sudo npm install -g pm2
  * executar Backend-RDLSC com PM2
    * $ pm2 start dist/shared/infra/http/server.js --name api-rdlsc
    * comandos pm2
      * pm2 list
      * pm2 monit
      * pm2 log NAMEAPP
      * pm2 stop NAMEAPP
      * pm2 delete NAMEAPP

  * automatizar start do PM2:
    * $ pm2 startup systemd
    * $ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy


* Configurando domíninio e SSL
  * https://www.whatsmydns.net/
  * criar registro A na zona DNS apontando para o IP do servidor (api-adviser.rdlsc.com.	14400	IN	A
68.183.104.130)
  * Atualizar nginx
    * $ sudo su
    * $ cd /etc/nginx/sites-available
    * $ vim api-adviser
      * server_name api-adviser.rdlsc.com;
    * $ nginx -t
    * $ service nginx restart
    * $ exit

  * $ sudo apt-get update
  * $ sudo apt-get install software-properties-common
  * $ sudo add-apt-repository universe
  * $ sudo add-apt-repository ppa:certbot/certbot
  * $ sudo apt-get update
  * $ sudo apt-get install certbot python3-certbot-nginx

  * $ sudo certbot --nginx
  * $ sudo ufw allow 443


* Criando workflow de CI
  * $ sudo chown -R $USERR:$GROUP ~/.config

  * Gerar chaves/certificado para github action (puttygen windows)
    * Acessar servidor com usuario deploy
    * $ cd ~/.ssh
    * $ vim authorized_keys
      * cola a chave publica no final do arquivo

  * Atualizar projeto no GitHub
    * Criar secrets (repositorio >> settings >> secrets)
      * SSH_HOST (IP digital ocean Droplet)
      * SSH_USER (usuario ssh: deploy)
      * SSH_PORT
      * SSH_KEY (chave privada certificado github action)
    * Criar Actions (repositorio >> actions >> set up a workflow yourself )
```
name: CI

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js enviroment
      uses: actions/setup-node@v1.4.2
      with:
        node-version: 12.x

    # Instalar dependencias NPM/YARN
    - name: Install dependencies
      run: yarn

    # Executar a Build
    - name: Run build
      run: yarn build

    # Copiar codigo para dentro da Digital Ocean
    - name: Copy all to Digital Ocean
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.SSH_HOST }}
        username: ${{ secrets.SSH_USER }}
        port: ${{ secrets.SSH_PORT }}
        key: ${{ secrets.SSH_KEY }}
        source: ".,!node_modules"
        target: "/home/deploy/app/rdlsc-backend/"

    # Install dependence, run migration and restart service (pm2)
    - name: Install dependence, run migration and restart service (pm2) on Digital Ocean
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SHH_HOST }}
        username: ${{ secrets.SSH_USER }}
        port: ${{ secrets.SSH_PORT }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd ~/app/rdlsc-backend
          yarn
          ./node_modules/.bin/typeorm migration:run
          pm2 restart api-rdlsc


```
  * Start Commit


### Comandos shell

* Acessar terminal Postgres dentro do docker
  * docker exec -it postgres-docker bash
  * psql -U postgres

* Atualizar repositorio do git em Digital Ocean
  * git pull

* Git Commands

  * Para encontrar o nome de usuário
    $ git config --global user.name
  * Para encontrar o email
    $ git config --global user.email
  * Alterar o nome de usuário
    $ git config --global user.name "nome do usuário"
  * Alterar o email
    $ git config --global user.email "email do usuário"

  * Baixar as últimas alterações do servidor
    $ git pull
  * Listando o caminho do servidor
    $ git remote -v

  * Adicionando o caminho do servidor(Caso tenhamos criado o repositório localmente antes de criar no servidor, podemos adicionar o caminho com o comando set-url.)
    $ git remote set-url origin git://url

  * Salvando as alterações no repositorio local (na branch selecionada)
    $ git commit -m "mensagem"

  * Verificando o que foi alterado
    $ git status

  * Listando as branches existentes
    $ git branch
  * Criando uma nova branch e já trocando para ela
    $ git checkout -b nome_da_nova_branch
  * Trocando de branch
    * $ git checkout nome_da_branch_existente
  * Enviando uma branch para o servidor
    * $ git push origin nome_da_branch
  * clonar uma branch especifica
    * $ git clone -b <branch> <remote_repo>


### Remover dependencias não utilizadas

$ yarn global add depcheck

Run it and find the unused dependencies:

$ npx depcheck
