O arquivo html5-2d-game-editor.war possui uma distribui��o do editor de jogos web.

Para rodar este arquivo � necess�rio ter o JBoss 6.1.0 Final configurado na m�quina.

Deve-se colocar o arquivo html5-2d-game-editor.war embaixo da pasta [JBOSS_HOME]/server/default/deploy

Para executar o JBoss deve-se executar o arquivo [JBOSS_HOME]/bin/run.sh

Para acessar o editor deve-se digitar no browser http://localhost:8080/html5-2d-game-editor

Diret�rio necess�rios no servidor:

/home/user/editor_data/assets        (poss�vel de alterar em classe AssetController.DATA_PATH)
/home/user/editor_data/components    (poss�vel de alterar em classe ComponentController.DATA_PATH)
/home/user/editor_data/game_objects  (poss�vel de alterar em classe GameObjectController.DATA_PATH)