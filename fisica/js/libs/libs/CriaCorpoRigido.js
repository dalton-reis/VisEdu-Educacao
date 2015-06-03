var rigidBody = function (_id) {
    var id = _id;

    this.creatRigidBody = function () {
        listObjetcsGraphics[id].matrixAutoUpdate = false;

        var rb = new HEFESTO.RigidBody(listObjetcsGraphics[id]);

        var rb_Inf = new ObjetoFisica();
        rb_Inf = listObjetcsPhys[id];

        rb.canSleep = false;
        //Adiciona o comportamento de poder detectar uma colisão:
        //rb.bindContactData = true;

        rb.acceleration = rb_Inf.getAceleracao();
        console.log(rb_Inf.getAceleracao());
        rb.velocity = rb_Inf.getVelocidade();
        rb.rotation = rb_Inf.getRotacao();
        rb.orientation = rb_Inf.getOrientacao();

        rb.linearDamping = rb_Inf.getAmortecLinear();
        rb.angularDamping = rb_Inf.getAmortecAngular();

        rb.mass = rb_Inf.getMassa();
        rb.useWorldForces = rb_Inf.isUsaForcas();

        if (rb_Inf.isInteragem() === false) {
            rb.ignoreIntegration = true;
        }

        if (rb_Inf.getTipo() === "Esfera") {
            rb.radius = rb_Inf.getTamanho();
            rb.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
            simulation.bindRigidBody(rb);
            listaRigidBody.push(rb);
            if (rb_Inf.isColideComBase()) {
                colisaoBase_Esfera(rb);
            }
            if (rb_Inf.getColisaoCom().length > 0) {
                var colideID;
                for (var i = 0; i < rb_Inf.getColisaoCom().length; i++) {
                    colideID = parseInt(rb_Inf.getColisaoCom()[i]);
                    var rb_Inf2 = new ObjetoFisica();
                    rb_Inf2 = listObjetcsPhys[colideID];
                    if (rb_Inf2 !== undefined) {
                        var rb_ColideCom = new HEFESTO.RigidBody();
                        rb_ColideCom = listaRigidBody[colideID];
                        if ((rb_Inf2.getTipo() === "Esfera")) {
                            //(esfera1, esfera1Mat, esfera2, esfera2Mat)
                            Esfera_Esfera(rb, rb_Inf.getMaterial(), rb_ColideCom, rb_Inf2.getMaterial());
                        } else {
                            if ((rb_Inf2.getTipo() === "Cubo") || (rb_Inf2.getTipo() === "Alvo")) {
                                //(esfera, esferaMat, cubo, cuboMat)
                                Esfera_Cubo(rb, rb_Inf.getMaterial(), rb_ColideCom, rb_Inf2.getMaterial());
                            }
                        }
                    }
                }
            }
        } else {
            if ((rb_Inf.getTipo() === "Cubo") || (rb_Inf.getTipo() === "Alvo")) {
                if (rb_Inf.getTipo() === "Cubo") {
                    //var tamanhoCubo = (rb_Inf.getTamanho() / 2);
                    rb.halfSize = new THREE.Vector3(rb_Inf.getTamanho().x/2, rb_Inf.getTamanho().y/2, rb_Inf.getTamanho().z/2);
                } else {
                    rb.halfSize = new THREE.Vector3((rb_Inf.getTamanho() / 2), rb_Inf.getTamanho(), rb_Inf.getTamanho());
                }
                rb.inertiaTensor.set(960000.0381469727, -0.0, -0.0, -0.0, 960000.0381469727, -0.0, -0.0, -0.0, 960000.0381469727);
                simulation.bindRigidBody(rb);
                listaRigidBody.push(rb);
                console.log(listaRigidBody[0]);
                if (rb_Inf.isColideComBase()) {
                    colisaoBase_Cubo(rb);
                }
                if (rb_Inf.getColisaoCom().length > 0) {                	
                    var colideID;
                    for (var i = 0; i < rb_Inf.getColisaoCom().length; i++) {
                        colideID = parseInt(rb_Inf.getColisaoCom()[i]);
                        var rb_Inf2 = new ObjetoFisica();
                        rb_Inf2 = listObjetcsPhys[colideID];
                        if (rb_Inf2 !== undefined) {
                        	console.log("Colisão CUBO!!!!");
                            var rb_ColideCom = new HEFESTO.RigidBody();
                            rb_ColideCom = listaRigidBody[colideID];
                            if ((rb_Inf2.getTipo() === "Cubo") || (rb_Inf2.getTipo() === "Alvo")) {
                            	console.log("Colisão CUBO!!!!");
                                //(cubo1, material_Cubo1, cubo2, cubo_Fis2)
                                Cubo_Cubo(rb, rb_Inf.getMaterial(), rb_ColideCom, rb_Inf2);
                            } else {
                                if ((rb_Inf2.getTipo() === "Esfera")) {
                                    //(esfera, esferaMat, cubo, cuboMat)
                                    Esfera_Cubo(rb_ColideCom, rb_Inf2.getMaterial(), rb, rb_Inf.getMaterial());
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;

    function Esfera_Cubo(esfera, esferaMat, cubo, cuboMat) { //Muda a ordem para o material ficar junto do objeto.
        if (cuboMat === "Madeira") {
            if (esferaMat === "Madeira") {
                console.log("Deu certo!1");
                colisaoCubo_Esfera(cubo, esfera, cdMadeira_Madeira);
            } else {
                if (esferaMat === "Metal") {
                    console.log("Deu certo!2");
                    colisaoCubo_Esfera(cubo, esfera, cdMadeira_Metal);
                } else {
                    if (esferaMat === "Borracha") {
                        console.log("Deu certo!3");
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Borracha);
                    } else {
                        console.log("Deu certo!4");
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Plastico);
                    }
                }
            }

        } else {
            if (cuboMat === "Metal") {
                if (esferaMat === "Madeira") {
                    console.log("Deu certo!5");
                    colisaoCubo_Esfera(cubo, esfera, cdMadeira_Metal);
                } else {
                    if (esferaMat === "Metal") {
                        console.log("Deu certo!6");
                        colisaoCubo_Esfera(cubo, esfera, cdMetal_Metal);
                    } else {
                        if (esferaMat === "Borracha") {
                            console.log("Deu certo!7");
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Borracha);
                        } else {
                            console.log("Deu certo!8");
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Plastico);
                        }
                    }
                }
            } else {
                if (cuboMat === "Borracha") {
                    if (esferaMat === "Madeira") {
                        console.log("Deu certo!9");
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Borracha);
                    } else {
                        if (esferaMat === "Metal") {
                            console.log("Deu certo!10");
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Borracha);
                        } else {
                            if (esferaMat === "Borracha") {
                                console.log("Deu certo!11");
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Borracha);
                            } else {
                                console.log("Deu certo!12");
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Plastico);
                            }
                        }
                    }
                }
                else {
                    if (esferaMat === "Madeira") {
                        console.log("Deu certo!13");
                        colisaoCubo_Esfera(cubo, esfera, cdMadeira_Plastico);
                    } else {
                        if (esferaMat === "Metal") {
                            console.log("Deu certo!14");
                            colisaoCubo_Esfera(cubo, esfera, cdMetal_Plastico);
                        } else {
                            if (esferaMat === "Borracha") {
                                console.log("Deu certo!15");
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Plastico);
                            } else {
                                console.log("Deu certo!16");
                                colisaoCubo_Esfera(cubo, esfera, cdBorracha_Plastico);
                            }
                        }
                    }
                }
            }
        }

    }

    function Esfera_Esfera(esfera1, material_Esfera1, esfera2, esfera2Mat) {
        if (material_Esfera1 === "Madeira") {
            if (esfera2Mat === "Madeira") {
                console.log("Deu certo!17");
                colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Madeira);
            } else {
                if (esfera2Mat === "Metal") {
                    console.log("Deu certo!18");
                    colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Metal);
                } else {
                    if (esfera2Mat === "Borracha") {
                        console.log("Deu certo!19");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Borracha);
                    }
                    else {
                        console.log("Deu certo!20");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Plastico);
                    }
                }
            }
        } else {
            if (material_Esfera1 === "Metal") {
                if (esfera2Mat === "Madeira") {
                    console.log("Deu certo!21");
                    colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Metal);
                } else {
                    if (esfera2Mat === "Metal") {
                        console.log("Deu certo!22");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Metal);
                    } else {
                        if (esfera2Mat === "Borracha") {
                            console.log("Deu certo!23");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Borracha);
                        } else {
                            console.log("Deu certo!24");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Plastico);
                        }
                    }
                }
            } else {
                if (material_Esfera1 === "Borracha") {
                    if (esfera2Mat === "Madeira") {
                        console.log("Deu certo!25");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Borracha);
                    } else {
                        if (esfera2Mat === "Metal") {
                            console.log("Deu certo!26");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Borracha);
                        } else {
                            if (esfera2Mat === "Borracha") {
                                console.log("Deu certo!27");
                                colisaoEsfera_Efera(esfera1, esfera2, cdBorracha_Borracha);
                            } else {
                                console.log("Deu certo!28");
                                colisaoEsfera_Efera(esfera1, esfera2, cdBorracha_Plastico);
                            }
                        }
                    }
                } else {
                    if (esfera2Mat === "Madeira") {
                        console.log("Deu certo!29");
                        colisaoEsfera_Efera(esfera1, esfera2, cdMadeira_Plastico);
                    } else {
                        if (esfera2Mat === "Metal") {
                            console.log("Deu certo!30");
                            colisaoEsfera_Efera(esfera1, esfera2, cdMetal_Plastico);
                        } else {
                            if (esfera2Mat === "Borracha") {
                                console.log("Deu certo!");
                                colisaoEsfera_Efera(esfera1, esfera2, cdBorracha_Plastico);
                            } else {
                                console.log("Deu certo!31");
                                colisaoEsfera_Efera(esfera1, esfera2, cdPlastico_Plastico);
                            }
                        }
                    }

                }
            }
        }

    }

    function Cubo_Cubo(cubo1, material_Cubo1, cubo2, cubo_Fis2) {
        if (material_Cubo1 === "Maderia") {
            if (cubo_Fis2.getMaterial() === "Madeira") {
                console.log("Deu certo!32");
                colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Madeira);
            } else {
                if (cubo_Fis2.getMaterial() === "Metal") {
                    console.log("Deu certo!33");
                    colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Metal);
                } else {
                    if (cubo_Fis2.getMaterial() === "Borracha") {
                        console.log("Deu certo!34");
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Borracha);
                    } else {
                        console.log("Deu certo!35");
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Plastico);
                    }
                }
            }
        } else {
            if (material_Cubo1 === "Metal") {
                if (cubo_Fis2.getMaterial() === "Madeira") {
                    console.log("Deu certo!36");
                    colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Metal);
                } else {
                    if (cubo_Fis2.getMaterial() === "Metal") {
                        console.log("Deu certo!37");
                        colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Metal);
                    } else {
                        if (cubo_Fis2.getMaterial() === "Borracha") {
                            console.log("Deu certo!38");
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Borracha);
                        } else {
                            console.log("Deu certo!39");
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Plastico);
                        }
                    }
                }
            } else {
                if (material_Cubo1 === "Borracha") {
                    if (cubo_Fis2.getMaterial() === "Madeira") {
                        console.log("Deu certo!40");
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Borracha);
                    } else {
                        if (cubo_Fis2.getMaterial() === "Metal") {
                            console.log("Deu certo!41");
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Borracha);
                        } else {
                            if (cubo_Fis2.getMaterial() === "Borracha") {
                                console.log("Deu certo!42");
                                colisaoCubo_Cubo(cubo1, cubo2, cdBorracha_Borracha);
                            } else {
                                console.log("Deu certo!43");
                                colisaoCubo_Cubo(cubo1, cubo2, cdBorracha_Plastico);
                            }
                        }
                    }
                } else {
                    if (cubo_Fis2.getMaterial() === "Madeira") {
                        console.log("Deu certo!44");
                        colisaoCubo_Cubo(cubo1, cubo2, cdMadeira_Plastico);
                    } else {
                        if (cubo_Fis2.getMaterial() === "Metal") {
                            console.log("Deu certo!45");
                            colisaoCubo_Cubo(cubo1, cubo2, cdMetal_Plastico);
                        } else {
                            if (cubo_Fis2.getMaterial() === "Borracha") {
                                console.log("Deu certo!46");
                                colisaoCubo_Cubo(cubo1, cubo2, cdBorracha_Plastico);
                            } else {
                                console.log("Deu certo!47");
                                colisaoCubo_Cubo(cubo1, cubo2, cdPlastico_Plastico);
                            }
                        }
                    }
                }
            }
        }
    }

    function colisaoBase_Esfera(rb) {
        console.log("Executou colisaoBase_Esfera");
        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
        simulation.bindCollision(collisionGround);
    }

    function colisaoBase_Cubo(rb) {
        console.log("Executou colisaoBase_Cubo");
        var collisionGround2 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_HALFSPACE, cdGround, rb, null);
        simulation.bindCollision(collisionGround2);
    }

    function testeColisao(rb, rb2) {
        console.log("Entrou Aqui!");
        var collision = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdGround, rb, rb2);
        simulation.bindCollision(collision);
    }

    function colisaoCubo_Esfera(rb, rb2, cd) {
        console.log("Executou colisaoCubo_Esfera");
        var collision = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cd, rb, rb2);
        simulation.bindCollision(collision);
    }

    function colisaoCubo_Cubo(rb, rb2, cd) {
        console.log("Executou colisaoCubo_Cubo");
        var collision2 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_BOX, cd, rb, rb2);
        simulation.bindCollision(collision2);
    }

    function colisaoEsfera_Efera(rb, rb2, cd) {
        console.log("Executou colisaoEsfera_Efera");
        var colisao = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cd, rb, rb2);
        simulation.bindCollision(colisao);
    }

};
