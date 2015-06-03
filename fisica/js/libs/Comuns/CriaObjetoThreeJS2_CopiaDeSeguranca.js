var corpoRigido = function (_id) {
    var id = _id;

    this.criarCorpoRigido = function () {
        listaDeObjetos[id].matrixAutoUpdate = false;
        var rb = new HEFESTO.RigidBody(listaDeObjetos[id]);
        rb.bindContactData = true;
        var rb_Atual = new ObjetoFisica();
        rb_Atual = listaObjetosFis[id];

        //alert(rb_Atual.getTipo());

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


        //alert(rb_Atual.getMassa());
        if (rb_Atual.getTipo() === "Esfera") {
            rb.radius = rb_Atual.getTamanho();
            simulation.bindRigidBody(rb);
            listaCoposRigidos.push(rb);
            if (rb_Atual.isColideComBase()) {
                //colisaoEsfera_Efera(rb);
                colisaoBase_Esfera(rb);
                //alert("Entrou aqui!");
            }
            if (rb_Atual.getMaterial() === "Madeira") {
                //Colocar um for para ir nos objetos selecionados na interface:
                if (listaCoposRigidos.length > 0) {
                    var colide;
                    for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                        colide = parseInt(rb_Atual.getColisaoCom()[i]);
                        var aux = new HEFESTO.RigidBody();
                        aux = listaCoposRigidos[colide];
                        var aux2 = new ObjetoFisica();
                        aux2 = listaObjetosFis[colide];
                        if (aux2.getTipo() === "Esfera") {
                            //alert("Entrou Aqui!");
                            if (aux2.getMaterial() === "Madeira") {
                                colisaoEsfera_Efera(rb, aux, cdMadeira_Madeira);
                            } else {
                                if (aux2.getMaterial() === "Metal") {
                                    colisaoEsfera_Efera(rb, aux, cdMadeira_Metal);
                                } else {
                                    if (aux2.getMaterial() === "Borracha") {
                                        colisaoEsfera_Efera(rb, aux, cdMadeira_Borracha);
                                    } else {
                                        colisaoEsfera_Efera(rb, aux, cdMadeira_Plastico);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (rb_Atual.getMaterial() === "Metal") {
                    if (listaCoposRigidos.length > 0) {
                        var colide;
                        for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                            colide = parseInt(rb_Atual.getColisaoCom()[i]);
                            var aux = new HEFESTO.RigidBody();
                            aux = listaCoposRigidos[colide];
                            var aux2 = new ObjetoFisica();
                            aux2 = listaObjetosFis[colide];
                            //alert("Entrou Aqui!");
                            if (aux2.getTipo() === "Esfera") {
                                if (aux2.getMaterial() === "Madeira") {
                                    colisaoEsfera_Efera(rb, aux, cdMadeira_Metal);
                                } else {
                                    if (aux2.getMaterial() === "Metal") {
                                        colisaoEsfera_Efera(rb, aux, cdMetal_Metal);
                                    } else {
                                        if (aux2.getMaterial() === "Borracha") {
                                            colisaoEsfera_Efera(rb, aux, cdMetal_Borracha);
                                        } else {
                                            colisaoEsfera_Efera(rb, aux, cdMetal_Plastico);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (rb_Atual.getMaterial() === "Borracha") {
                        if (listaCoposRigidos.length > 0) {
                            var colide;
                            for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                                colide = parseInt(rb_Atual.getColisaoCom()[i]);
                                var aux = new HEFESTO.RigidBody();
                                aux = listaCoposRigidos[colide];
                                var aux2 = new ObjetoFisica();
                                aux2 = listaObjetosFis[colide];
                                //alert("Entrou Aqui!");
                                if (aux2.getTipo() === "Esfera") {
                                    if (aux2.getMaterial() === "Madeira") {
                                        colisaoEsfera_Efera(rb, aux, cdMadeira_Borracha);
                                    } else {
                                        if (aux2.getMaterial() === "Metal") {
                                            colisaoEsfera_Efera(rb, aux, cdMetal_Borracha);
                                        } else {
                                            if (aux2.getMaterial() === "Borracha") {
                                                colisaoEsfera_Efera(rb, aux, cdBorracha_Borracha);
                                            } else {
                                                colisaoEsfera_Efera(rb, aux, cdBorracha_Plastico);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (listaCoposRigidos.length > 0) {
                            var colide;
                            for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                                colide = parseInt(rb_Atual.getColisaoCom()[i]);
                                var aux = new HEFESTO.RigidBody();
                                aux = listaCoposRigidos[colide];
                                var aux2 = new ObjetoFisica();
                                aux2 = listaObjetosFis[colide];
                                //alert("Entrou Aqui!");
                                if (aux2.getTipo() === "Esfera") {
                                    if (aux2.getMaterial() === "Madeira") {
                                        colisaoEsfera_Efera(rb, aux, cdMadeira_Plastico);
                                    } else {
                                        if (aux2.getMaterial() === "Metal") {
                                            colisaoEsfera_Efera(rb, aux, cdMetal_Plastico);
                                        } else {
                                            if (aux2.getMaterial() === "Borracha") {
                                                colisaoEsfera_Efera(rb, aux, cdBorracha_Plastico);
                                            } else {
                                                colisaoEsfera_Efera(rb, aux, cdPlastico_Plastico);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }
        } else {
            if (rb_Atual.getTipo() === "Cubo") {
                var tamanhoCubo = (rb_Atual.getTamanho() / 2);
                rb.halfSize = new THREE.Vector3(tamanhoCubo, tamanhoCubo, tamanhoCubo);
                simulation.bindRigidBody(rb);
                listaCoposRigidos.push(rb);
                if (rb_Atual.isColideComBase()) {
                    //colisaoEsfera_Efera(rb);
                    colisaoBase_Cubo(rb);
                    //alert("Entrou aqui!");
                }
                //aux = new ObjetoFisica();
                //if (rb_Atual.getColisaoCom().length > 0) {
                // colisaoCubo_Cubo(rb, listaCoposRigidos[0]);
                //}
                if (rb_Atual.getMaterial() === "Madeira") {
                    //Colocar um for para ir nos objetos selecionados na interface:
                    if (listaCoposRigidos.length > 0) {
                        var colide;
                        for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                            colide = parseInt(rb_Atual.getColisaoCom()[i]);
                            var aux = new HEFESTO.RigidBody();
                            aux = listaCoposRigidos[colide];
                            var aux2 = new ObjetoFisica();
                            aux2 = listaObjetosFis[colide];
                            if (aux2.getTipo() === "Cubo") {
                                //alert("Entrou Aqui!");
                                if (aux2.getMaterial() === "Madeira") {
                                    colisaoCubo_Cubo(rb, aux, cdMadeira_Madeira);
                                } else {
                                    if (aux2.getMaterial() === "Metal") {
                                        colisaoCubo_Cubo(rb, aux, cdMadeira_Metal);
                                    } else {
                                        if (aux2.getMaterial() === "Borracha") {
                                            colisaoCubo_Cubo(rb, aux, cdMadeira_Borracha);
                                        } else {
                                            colisaoCubo_Cubo(rb, aux, cdMadeira_Plastico);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (rb_Atual.getMaterial() === "Metal") {
                        if (listaCoposRigidos.length > 0) {
                            var colide;
                            for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                                colide = parseInt(rb_Atual.getColisaoCom()[i]);
                                var aux = new HEFESTO.RigidBody();
                                aux = listaCoposRigidos[colide];
                                var aux2 = new ObjetoFisica();
                                aux2 = listaObjetosFis[colide];
                                //alert("Entrou Aqui!");
                                if (aux2.getTipo() === "Cubo") {
                                    if (aux2.getMaterial() === "Madeira") {
                                        colisaoCubo_Cubo(rb, aux, cdMadeira_Metal);
                                    } else {
                                        if (aux2.getMaterial() === "Metal") {
                                            colisaoCubo_Cubo(rb, aux, cdMetal_Metal);
                                        } else {
                                            if (aux2.getMaterial() === "Borracha") {
                                                colisaoCubo_Cubo(rb, aux, cdMetal_Borracha);
                                            } else {
                                                colisaoCubo_Cubo(rb, aux, cdMetal_Plastico);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (rb_Atual.getMaterial() === "Borracha") {
                            if (listaCoposRigidos.length > 0) {
                                var colide;
                                for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                                    colide = parseInt(rb_Atual.getColisaoCom()[i]);
                                    var aux = new HEFESTO.RigidBody();
                                    aux = listaCoposRigidos[colide];
                                    var aux2 = new ObjetoFisica();
                                    aux2 = listaObjetosFis[colide];
                                    //alert("Entrou Aqui!");
                                    if (aux2.getTipo() === "Cubo") {
                                        if (aux2.getMaterial() === "Madeira") {
                                            colisaoCubo_Cubo(rb, aux, cdMadeira_Borracha);
                                        } else {
                                            if (aux2.getMaterial() === "Metal") {
                                                colisaoCubo_Cubo(rb, aux, cdMetal_Borracha);
                                            } else {
                                                if (aux2.getMaterial() === "Borracha") {
                                                    colisaoCubo_Cubo(rb, aux, cdBorracha_Borracha);
                                                } else {
                                                    colisaoCubo_Cubo(rb, aux, cdBorracha_Plastico);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (listaCoposRigidos.length > 0) {
                                var colide;
                                for (var i = 0; i < rb_Atual.getColisaoCom().length; i++) {
                                    colide = parseInt(rb_Atual.getColisaoCom()[i]);
                                    var aux = new HEFESTO.RigidBody();
                                    aux = listaCoposRigidos[colide];
                                    var aux2 = new ObjetoFisica();
                                    aux2 = listaObjetosFis[colide];
                                    //alert("Entrou Aqui!");
                                    if (aux2.getTipo() === "Cubo") {
                                        if (aux2.getMaterial() === "Madeira") {
                                            colisaoCubo_Cubo(rb, aux, cdMadeira_Plastico);
                                        } else {
                                            if (aux2.getMaterial() === "Metal") {
                                                colisaoCubo_Cubo(rb, aux, cdMetal_Plastico);
                                            } else {
                                                if (aux2.getMaterial() === "Borracha") {
                                                    colisaoCubo_Cubo(rb, aux, cdBorracha_Plastico);
                                                } else {
                                                    colisaoCubo_Cubo(rb, aux, cdPlastico_Plastico);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }

    }
    ;

    function colisaoBase_Esfera(rb) {
        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
        simulation.bindCollision(collisionGround);
    }

    function colisaoBase_Cubo(rb) {
        var collisionGround2 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_HALFSPACE, cdGround, rb, null);
        simulation.bindCollision(collisionGround2);
    }
    function testeColisao(rb, rb2) {
        var collision = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdGround, rb, rb2);
        simulation.bindCollision(collision);
    }

    function colisaoCubo_Cubo(rb, rb2, cd) {
        var collision = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_BOX, cd, rb, rb2);
        simulation.bindCollision(collision);
    }

    function colisaoEsfera_Efera(rb, rb2, cd) {
        var colisao = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cd, rb, rb2);
        simulation.bindCollision(colisao);

    }

};