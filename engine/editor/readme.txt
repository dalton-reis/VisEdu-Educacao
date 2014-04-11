O arquivo html5-2d-game-editor.war possui uma distribuição do editor de jogos web.

Para rodar este arquivo é necessário ter o JBoss 6.1.0 Final configurado na máquina.

Deve-se colocar o arquivo html5-2d-game-editor.war embaixo da pasta [JBOSS_HOME]/server/default/deploy

Para executar o JBoss deve-se executar o arquivo [JBOSS_HOME]/bin/run.sh

Para acessar o editor deve-se digitar no browser http://localhost:8080/html5-2d-game-editor

Diretório necessários no servidor:

/home/user/editor_data/assets        (possível de alterar em classe AssetController.DATA_PATH)
/home/user/editor_data/components    (possível de alterar em classe ComponentController.DATA_PATH)
/home/user/editor_data/game_objects  (possível de alterar em classe GameObjectController.DATA_PATH)