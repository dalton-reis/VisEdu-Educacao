var corpoRigido = function (_id) {
    var id = _id;

    this.criarCorpoRigido = function () {
        listaDeObjetosGraficos[id].matrixAutoUpdate = false;
        var rb = new HEFESTO.RigidBody(listaDeObjetosGraficos[id]);
        rb.bindContactData = true;
        var rb_Atual = new ObjetoFisica();
        rb_Atual = listaObjetosFis[id];

        rb.canSleep = false;

        rb.aceleration = rb_Atual.getAceleracao();
        //rb.aceleration.y = -100.0;
        rb.velocity = rb_Atual.getVelocidade();
        rb.rotation = rb_Atual.getRotacao();
        rb.orientation.r = 1;

        rb.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
        rb.linearDamping = rb_Atual.getAmortecLinear();
        rb.angularDamping = rb_Atual.getAmortecAngular();
        rb.mass = rb_Atual.getMassa();

        if ((rb_Atual.getTipo() === "Esfera") || (rb_Atual.getTipo() === "Alvo")) {
            //Faz com que o alvo seja um corpo rigido que pode sofre colisões mas não tenha nunhuma forca atuando sobre ele:
            //if (rb_Atual.getTipo() === "Alvo") {
            //console.log("Funcionou!!!!!");
            //rb.ignoreIntegration = true;
            //}
            rb.radius = rb_Atual.getTamanho();
            simulation.bindRigidBody(rb);
            listaCorposRigidos.push(rb);
            if (rb_Atual.isColideComBase()) {
                colisaoBase_Esfera(rb);
                //alert("Entrou aqui!");
            }
            //Colocar um for para ir nos objetos selecionados na interface:
            if (rb_Atual.getColisaoCom().length > 0) {
                var colide;
                for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                    colide = parseInt(rb_Atual.getColisaoCom()[i]);
                    var rb_ColideCom = new HEFESTO.RigidBody();
                    rb_ColideCom = listaCorposRigidos[colide];
                    var rb_Fis = new ObjetoFisica();
                    rb_Fis = listaObjetosFis[colide];
                    if ((rb_Fis.getTipo() === "Esfera") || (rb_Fis.getTipo() === "Alvo")) {
                        //alert("Entrou Aqui!");
                        Esfera_Esfera(rb, rb_ColideCom, rb_Fis, rb_Atual.getMaterial());
                    } else {
                        if ((rb_Fis.getTipo() === "Cubo")) {
                            Esfera_Cubo(rb, rb_ColideCom, rb_Fis.getMaterial(), rb_Atual.getMaterial());
                        }
                    }
                }
            }
        } else {
            if (rb_Atual.getTipo() === "Cubo") {
                var tamanhoCubo = (rb_Atual.getTamanho() / 2);
                rb.halfSize = new THREE.Vector3(tamanhoCubo, tamanhoCubo, tamanhoCubo);
                simulation.bindRigidBody(rb);
                listaCorposRigidos.push(rb);
                if (rb_Atual.isColideComBase()) {
                    colisaoBase_Cubo(rb);
                    //alert("Entrou aqui!");
                }
                //aux = new ObjetoFisica();
                //if (rb_Atual.getColisaoCom().length > 0) {
                // colisaoCubo_Cubo(rb, listaCorposRigidos[0]);
                //}
                //Colocar um for para ir nos objetos selecionados na interface:
                if (rb_Atual.getColisaoCom().length > 0) {
                    var colide;
                    for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                        colide = parseInt(rb_Atual.getColisaoCom()[i]);
                        var rb_ColideCom = new HEFESTO.RigidBody();
                        rb_ColideCom = listaCorposRigidos[colide];
                        var rb_Fis = new ObjetoFisica();
                        rb_Fis = listaObjetosFis[colide];
                        if (rb_Fis.getTipo() === "Cubo") {
                            //alert("Entrou Aqui!");
                            Cubo_Cubo(rb, rb_ColideCom, rb_Fis, rb_Atual.getMaterial());
                        } else {
                            if ((rb_Fis.getTipo() === "Esfera") || (rb_Fis.getTipo() === "Alvo")) {
                                Esfera_Cubo(rb_ColideCom, rb, rb_Atual.getMaterial(), rb_Fis.getMaterial());
                            }
                        }
                    }
                }


            }
        }
    }
    ;

    function Esfera_Cubo(esfera, cubo, cuboMat, esferaMat) {
        console.log("Deu Certo!!");
        //testeColisao(cubo, esfera);
        //return ;
        console.log(esferaMat);
        if (cuboMat === "Madeira") {
            if (esferaMat === "Madeira") {
                console.log("Entrou na colisão");
                colisaoCubo_Esfera(cubo, esfera, cdMadeira_Madeira);
            } else {
                if (esferaMat === "Metal") {
                    colisaoCubo_Esfera(cubo, esfera, cdMadeira_Metal);
                } else {
                    if (esferaMat === "Borracha") {
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Borracha);
                    } else {
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Plastico);
                    }
                }
            }

        } else {
            if (cuboMat === "Metal") {
                if (esferaMat === "Madeira") {
                    colisaoCubo_Esfera(cubo, esfera, cdMadeira_Metal);
                } else {
                    if (esferaMat === "Metal") {
                        colisaoCubo_Esfera(cubo, esfera, cdMetal_Metal);
                    } else {
                        if (esferaMat === "Borracha") {
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Borracha);
                        } else {
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Plastico);
                        }
                    }
                }
            } else {
                if (cuboMat === "Borracha") {
                    if (esferaMat === "Madeira") {
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Borracha);
                    } else {
                        if (esferaMat === "Metal") {
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Borracha);
                        } else {
                            if (esferaMat === "Borracha") {
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Borracha);
                            } else {
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Plastico);
                            }
                        }
                    }
                } else {
                    if (esferaMat === "Madeira") {
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Plastico);
                    } else {
                        if (esferaMat === "Metal") {
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Plastico);
                        } else {
                            if (esferaMat === "Borracha") {
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Plastico);
                            } else {
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Plastico);
                            }
                        }
                    }
                }
            }
        }

    }

    function Esfera_Esfera(esfera1, esfera2, esfera2_Fis, material_Esfera1) {
        if (material_Esfera1 === "Madeira") {
            if (esfera2_Fis.getMaterial() === "Madeira") {
                console.log("Deu certo!");
                colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Madeira);
            } else {
                if (esfera2_Fis.getMaterial() === "Metal") {
                    console.log("Deu certo!");
                    colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Metal);
                } else {
                    if (esfera2_Fis.getMaterial() === "Borracha") {
                        console.log("Deu certo!");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Borracha);
                    }
                    if (esfera2_Fis.getMaterial() === null) {
                        console.log("NULL");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Plastico);
                    }
                    else {
                        console.log("Deu certo!" + esfera2_Fis);
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Plastico);
                    }
                }
            }
        } else {
            if (material_Esfera1 === "Metal") {
                if (esfera2_Fis.getMaterial() === "Madeira") {
                    console.log("Deu certo!");
                    colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Metal);
                } else {
                    if (esfera2_Fis.getMaterial() === "Metal") {
                        console.log("Deu certo!");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Metal);
                    } else {
                        if (esfera2_Fis.getMaterial() === "Borracha") {
                            console.log("Deu certo!");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Borracha);
                        } else {
                            console.log("Deu certo!");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Plastico);
                        }
                    }
                }
            } else {
                if (material_Esfera1 === "Borracha") {
                    if (esfera2_Fis.getMaterial() === "Madeira") {
                        console.log("Deu certo!");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Borracha);
                    } else {
                        if (esfera2_Fis.getMaterial() === "Metal") {
                            console.log("Deu certo!");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Borracha);
                        } else {
                            if (esfera2_Fis.getMaterial() === "Borracha") {
                                console.log("Deu certo!");
                                colisaoEsfera_Efera(esfera1, esfera2, cdBorracha_Borracha);
                            } else {
                                console.log("Deu certo!");
                                colisaoEsfera_Efera(esfera1, esfera2, cdBorracha_Plastico);
                            }
                        }
                    }
                } else {
                    if (esfera2_Fis.getMaterial() === "Madeira") {
                        console.log("Deu certo!");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Plastico);
                    } else {
                        if (esfera2_Fis.getMaterial() === "Metal") {
                            console.log("Deu certo!");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Plastico);
                        } else {
                            if (esfera2_Fis.getMaterial() === "Borracha") {
                                console.log("Deu certo!");
                                colisaoEsfera_Efera(esfera1, esfera2, cdBorracha_Plastico);
                            } else {
                                console.log("Deu certo!");
                                colisaoEsfera_Efera(esfera1, esfera2, cdPlastico_Plastico);
                            }
                        }
                    }

                }
            }
        }

    }

    function Cubo_Cubo(cubo1, cubo2, cubo_Fis2, material_Cubo1) {
        if (material_Cubo1 === "Maderia") {
            if (cubo_Fis2.getMaterial() === "Madeira") {
                colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Madeira);
            } else {
                if (cubo_Fis2.getMaterial() === "Metal") {
                    colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Metal);
                } else {
                    if (cubo_Fis2.getMaterial() === "Borracha") {
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Borracha);
                    } else {
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Plastico);
                    }
                }
            }
        } else {
            if (material_Cubo1 === "Metal") {
                if (cubo_Fis2.getMaterial() === "Madeira") {
                    colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Metal);
                } else {
                    if (cubo_Fis2.getMaterial() === "Metal") {
                        colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Metal);
                    } else {
                        if (cubo_Fis2.getMaterial() === "Borracha") {
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Borracha);
                        } else {
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Plastico);
                        }
                    }
                }
            } else {
                if (material_Cubo1 === "Borracha") {
                    if (cubo_Fis2.getMaterial() === "Madeira") {
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Borracha);
                    } else {
                        if (cubo_Fis2.getMaterial() === "Metal") {
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Borracha);
                        } else {
                            if (cubo_Fis2.getMaterial() === "Borracha") {
                                colisaoCubo_Cubo(cubo1, cubo2, cdBorracha_Borracha);
                            } else {
                                colisaoCubo_Cubo(cubo1, cubo2, cdBorracha_Plastico);
                            }
                        }
                    }
                } else {
                    if (cubo_Fis2.getMaterial() === "Madeira") {
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Plastico);
                    } else {
                        if (cubo_Fis2.getMaterial() === "Metal") {
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Plastico);
                        } else {
                            if (cubo_Fis2.getMaterial() === "Borracha") {
                                colisaoCubo_Cubo(cubo1, cubo2, cdBorracha_Plastico);
                            } else {
                                colisaoCubo_Cubo(cubo1, cubo2, cdPlastico_Plastico);
                            }
                        }
                    }
                }
            }
        }
    }

    function colisaoBase_Esfera(rb) {
        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
        simulation.bindCollision(collisionGround);
    }

    function colisaoBase_Cubo(rb) {
        var collisionGround2 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_HALFSPACE, cdGround, rb, null);
        simulation.bindCollision(collisionGround2);
    }

    function testeColisao(rb, rb2) {
        console.log("Entrou Aqui!");
        var collision = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdGround, rb, rb2);
        simulation.bindCollision(collision);
    }

    function colisaoCubo_Esfera(rb, rb2, cd) {
        console.log("Entrou Aqui!");
        var collision = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cd, rb, rb2);
        simulation.bindCollision(collision);
    }

    function colisaoCubo_Cubo(rb, rb2, cd) {
        var collision2 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_BOX, cd, rb, rb2);
        simulation.bindCollision(collision2);
    }

    function colisaoEsfera_Efera(rb, rb2, cd) {
        var colisao = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cd, rb, rb2);
        simulation.bindCollision(colisao);
    }

};