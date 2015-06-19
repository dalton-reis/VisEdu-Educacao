function showNewRigidBodyDialog(sm, addfunc) {

	BootstrapDialog.show({
	    title: 'Registrar Corpo Rígido',
	    size: 'size-wide',
	    message: function(dialog) {

			var master = document.createElement('div');

			var left = document.createElement('div');
			left.style.float = 'left';
			left.style.width = '65%';
			master.appendChild(left);


			var innerLeft = document.createElement('div');
			innerLeft.style.float = 'left';
			innerLeft.style.width = '50%';
			left.appendChild(innerLeft);

			SB.createInput(innerLeft, 'bodyName', 'Nome:', 'Objeto', '160px !important');
			SB.createSelect(innerLeft, 'bodyType', 'Tipo:', SB.BodyType);
			SB.createSelect(innerLeft, 'materialType', 'Material:', SB.MaterialType);

			SB.createVector3(innerLeft, 'position', 'Posição:');
			SB.createQuaternion(innerLeft, 'orientation', 'Orientação:');
			SB.createVector3(innerLeft, 'velocity', 'Velocidade:');
			SB.createVector3(innerLeft, 'acceleration', 'Aceleração:');
			SB.createVector3(innerLeft, 'rotation', 'Rotação:');

			var innerRight = document.createElement('div');
			innerRight.style.float = 'right';
			innerRight.style.width = '50%';
			left.appendChild(innerRight);

			SB.createInput(innerRight, 'mass', 'Massa:', '10');
			SB.createInput(innerRight, 'linearDamping', 'Amrt linear:', '0.95');
			SB.createInput(innerRight, 'angularDamping', 'Amrt angular:', '0.8');
			SB.createInput(innerRight, 'radius', 'Raio:', '5');
			SB.createVector3(innerRight, 'halfSize', 'Tam. médio:');
			SB.createBoolean(innerRight, 'useWorldForces', 'Usar forças da cena:');
			SB.createBoolean(innerRight, 'collideAll', 'Colidir com todos:');

			// "detalhes"

			var right = document.createElement('div');
			right.style.float = 'right';
			right.style.width = '35%';
			master.appendChild(right);

			SB.createLabel(right, 'Forças da cena:', '100%');
			for (f in sm.forces) {
				f = sm.forces[f];
				SB.createBoolean(right, 'forces', f.name, f.id);
			}

			SB.createFloatCleaner(master);
	    
	        return master;
	    },
	    buttons: [{
	        id: 'btn-add',   
	        icon: 'glyphicon glyphicon-check',       
	        label: 'Adicionar',
	        cssClass: 'btn-primary', 
	        autospin: false,
	        action: function(dialogRef){    
	            addfunc();
	            dialogRef.close();
	        }
	    }]
	});
};

function showNewCollisionDataDialog(addfunc) {

	BootstrapDialog.show({
	    title: 'Registrar Dados de Colisão',
	    //size: 'size-wide',
	    message: function(dialog) {

			var master = document.createElement('div');
			createInput(master, 'cdName', 'Nome:', '70% !important');
			createInput(master, 'friction', 'Fricção:');
			createInput(master, 'restitution', 'Restituição:');
			createInput(master, 'tolerance', 'Tolerância:');
			createInput(master, 'maxContacts', 'Máximo de contatos:');


			createFloatCleaner(master);
	    
	        return master;
	    },
	    buttons: [{
	        id: 'btn-add',   
	        icon: 'glyphicon glyphicon-check',       
	        label: 'Adicionar',
	        cssClass: 'btn-primary', 
	        autospin: false,
	        action: function(dialogRef){    
	            addfunc();
	            dialogRef.close();
	        }
	    }]
	});
};

function showNewCollisionDialog(addfunc) {

	BootstrapDialog.show({
	    title: 'Registrar Colisão',
	    //size: 'size-wide',
	    message: function(dialog) {

			var master = document.createElement('div');
			createInput(master, 'cdName', 'Nome:', '70% !important');

			createFloatCleaner(master);
	    
	        return master;
	    },
	    buttons: [{
	        id: 'btn-add',   
	        icon: 'glyphicon glyphicon-check',       
	        label: 'Adicionar',
	        cssClass: 'btn-primary', 
	        autospin: false,
	        action: function(dialogRef){    
	            addfunc();
	            dialogRef.close();
	        }
	    }]
	});
};

function showNewForceDialog(addfunc) {

	BootstrapDialog.show({
	    title: 'Registrar Força | Gravidade',
	    //size: 'size-wide',
	    message: function(dialog) {

			var master = document.createElement('div');
			SB.createInput(master, 'forceName', 'Nome:', 'Força', '70% !important');

			SB.createVector3(master, 'forceValue', 'Valor:', '15% !important');

			SB.createFloatCleaner(master);
	    
	        return master;
	    },
	    buttons: [{
	        id: 'btn-add',   
	        icon: 'glyphicon glyphicon-check',       
	        label: 'Adicionar',
	        cssClass: 'btn-primary', 
	        autospin: false,
	        action: function(dialogRef){    
	            addfunc();
	            dialogRef.close();
	        }
	    }]
	});
};