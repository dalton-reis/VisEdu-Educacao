window.onload = function () {
    // contantes com o id das juntas
    var LEFT_HAND = 0;
    var RIGHT_HAND = 1;
    //-------------------

    var status = document.getElementById("status");
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");

    // define cor das juntas
    var corJuntas = "#FF0000";
    // define cor das juntas acertadas
    var corJuntasNoPerimetro = "#00FF00";

    // define a distancia minima para acerto
    var distanciaMinAcerto = 100;
    
    // fator de conversao X - para reduzir o tamanho do esqueleto
    var fatorX = 0.4
    // fator de conversao Y - para reduzir o tamanho do esqueleto
    var fatorY = 0.4
    // imagem

    var imagemFundo = new Image();
    imagemFundo.src = "exercicio1.png";

    status.innerHTML = "Iniciando...";

    // array com a posição dos pixels de demarcação
    var posDemarcacoes = [];

    var radar = {
        // ocorre a cada frame detectado
        ondataupdate: function (zigdata) {
            status.innerHTML = "Rastreando dados...";

            // limpa o contexto
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            // abre um novo desenho
            contexto.beginPath();

            // desenha a imagem de fundo
            contexto.drawImage(imagemFundo, 0, 0);

            // verifica se as informações da imagem ainda não foram carregadas
            if (posDemarcacoes.length == 0) {
                // carrega as informações da imagem
                carregaInformacoesDaImagem();
            }

            // percorre a lista de usuários rastreados
            for (var usuarioId in zigdata.users) {
                // pega o usuario na lista
                var usuario = zigdata.users[usuarioId];
                
                // verifica se a posição central está rastreada
                /*if (usuario.positionTracked) {
                    // pega a posição central do esqueleto
                    var posicaoUsuario = usuario.position;
                    
                    // desenha a posição central em vermelho
                    contexto.fillRect((canvas.width * 0.5) + posicaoUsuario[0], (canvas.height * 0.5) - posicaoUsuario[1], 10, 10);
                }*/

                // verifica se o esqueleto está sendo rastreado
                if (usuario.skeletonTracked) {
                    // pega o esqueleto
                    var esqueleto = usuario.skeleton;

                    // array com a posicao da juntas
                    var posJuntas = [];

                    // pega as posições das juntas
                    posJuntas[LEFT_HAND] = new Array(
                        (canvas.width * 0.5) + Math.round(esqueleto[zig.Joint.LeftHand].position[0] * fatorX),
                        (canvas.height * 0.5) - Math.round(esqueleto[zig.Joint.LeftHand].position[1] * fatorY),
                        0);
                    posJuntas[RIGHT_HAND] = new Array(
                        (canvas.width * 0.5) + Math.round(esqueleto[zig.Joint.RightHand].position[0] * fatorX),
                        (canvas.height * 0.5) - Math.round(esqueleto[zig.Joint.RightHand].position[1] * fatorY),
                        0);
                    
                    // verifica a posicao das juntas
                    verificaPosicao(posJuntas);

                    // desenha a lista de juntas
                    desenhaJuntas(contexto, posJuntas);

                    // define a cor das juntas
                    contexto.fillStyle = corJuntas;

                    // migrar para a lista acima estas juntas também
                    // desenha a cabeça
                    desenhaJunta(contexto, esqueleto[zig.Joint.Head].position);
                    // desenha pescoço
                    desenhaJunta(contexto, esqueleto[zig.Joint.Neck].position);
                    // desenha ombro esquerdo
                    desenhaJunta(contexto, esqueleto[zig.Joint.LeftShoulder].position);
                    // desenha ombro direito
                    desenhaJunta(contexto, esqueleto[zig.Joint.RightShoulder].position);
                    // desenha quadril esquerdo
                    desenhaJunta(contexto, esqueleto[zig.Joint.LeftHip].position);
                    // desenha quadril direito
                    desenhaJunta(contexto, esqueleto[zig.Joint.RightHip].position);
                    // desenha cotovelo esquerdo
                    desenhaJunta(contexto, esqueleto[zig.Joint.LeftElbow].position);
                    // desenha cotovelo direito
                    desenhaJunta(contexto, esqueleto[zig.Joint.RightElbow].position);
                    // desenha joelho esquerdo
                    desenhaJunta(contexto, esqueleto[zig.Joint.LeftKnee].position);
                    // desenha joelho direito
                    desenhaJunta(contexto, esqueleto[zig.Joint.RightKnee].position);
                    // desenha pé esquerdo
                    desenhaJunta(contexto, esqueleto[zig.Joint.LeftFoot].position);
                    // desenha pé direito
                    desenhaJunta(contexto, esqueleto[zig.Joint.RightFoot].position);
                    // desenha tornozelo equerdo
                    desenhaJunta(contexto, esqueleto[zig.Joint.LeftAnkle].position);
                    // desenha tornozelo direito
                    desenhaJunta(contexto, esqueleto[zig.Joint.RightAnkle].position);
                }
            }

            // fecha o desenho
            contexto.stroke();
        }
    }

    function desenhaJunta(contexto, posicaoJunta) {
        // gera a posicao X
        var posX = Math.round(posicaoJunta[0] * fatorX);
        posX = (canvas.width * 0.5) + posX;

        // gera a posicao X
        var posY = Math.round(posicaoJunta[1]) * fatorY;
        posY = (canvas.height * 0.5) - posY;

        // desenha
        contexto.fillRect(posX, posY, 10, 10);
    }

    function desenhaJuntas(contexto, posJuntas) {
        for (var i = 0; i < posJuntas.length; i++) {
            // gera a posicao X
            var posX = posJuntas[i][0];
            // gera a posicao Y
            var posY = posJuntas[i][1];
            // pega se a junta está no perímetro da demarcação
            var noPerimetro = posJuntas[i][2];

            // dependendo se a junta está no perímetro é definida a cor
            if (noPerimetro == 1)
                contexto.fillStyle = corJuntasNoPerimetro;
            else
                contexto.fillStyle = corJuntas;

            // desenha
            contexto.fillRect(posX, posY, 10, 10);
        }
    }

    function carregaInformacoesDaImagem() {
        // gera um array com as inforrmações de toda a area de desenho do canvas
        var arr = contexto.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = arr.data;
        // percorre pixel a pixel
        for (var i = 0; i < pixels.length; i += 4) {
            // pega o RGB do pixel
            var r = pixels[i];
            var g = pixels[i + 1];
            var b = pixels[i + 2];
            var idJunta = -1;

            if (r == 255 && g == 0 && b == 0)
                // se o pixel encontrado é amarelo o ponto correspondente à mão esquerda
                idJunta = LEFT_HAND;
            else if (r = 255 && g == 255 && b == 0)
                // se o pixel encontrado é amarelo o ponto correspondente à mão direita
                idJunta = RIGHT_HAND;

            // se alguma demarcação de junta foi encontrada, insere na lista com as posições
            if (idJunta >= 0) {
                // define a linha e a coluna da demarcação
                var coluna = (i * 0.25) % canvas.width;
                var linha = Math.round((i * 0.25) / canvas.width);
                // insere na lista
                posDemarcacoes[posDemarcacoes.length] = new Array(idJunta, coluna, linha);
            }
        }
    }

    function verificaPosicao(posJuntas) {
        // percorre as demarcações encotradas
        for (var i = 0; i < posDemarcacoes.length; i++) {
            // pega o id da junta
            var idJunta = posDemarcacoes[i][0];

            // pega a posicao da demarcação
            var demX = posDemarcacoes[i][1];
            var demY = posDemarcacoes[i][2];

            // pega a posicao da junta correspondente
            var posX = posJuntas[idJunta][0];
            var posY = posJuntas[idJunta][1];

            // calcula a distancia
            var distancia = Math.sqrt(Math.pow((demX - posX), 2) + Math.pow((demY - posY), 2));

            // se a distancia for menor que o minimo
            if (distancia < distanciaMinAcerto)
                // marca a junta como no perimetro da demarcação
                posJuntas[idJunta][2] = 1;
        }
    }

    zig.addListener(radar);
};
