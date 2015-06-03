window.onload= start;



function start() {

	BootstrapDialog.show({
	    title: 'Registrar Corpo R&iacute;gido',
	    size: 'size-wide',
	    message: function(dialog) {

			var master = document.createElement('div');
			
			master.innerHTML="teste";
/**
			var left = document.createElement('div');
			left.style.float = 'left';
			left.style.width = '65%';
			master.appendChild(left);


			var innerLeft = document.createElement('div');
			innerLeft.style.float = 'left';
			innerLeft.style.width = '50%';
			left.appendChild(innerLeft);
**/
			
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
		$(function() {$('.dropdown-submenu > a').submenupicker();});
}