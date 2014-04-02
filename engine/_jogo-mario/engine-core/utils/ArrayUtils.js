var ArrayUtils = new function(){

this.addElement = function(array, element){
	array.push(element);
	return array;
}

this.removeElement = function(array, indexOf){
	var rest = array.slice(indexOf + 1 || array.length);
	array.length = indexOf < 0 ? array.length + indexOf : indexOf;
	return array.push.apply(array, rest);
}

this.getElementByTag = function(array, tag){
	for(var i=0; i<array.length; i++){
		var e = array[i];
		if(e.tag == tag){
			return e;
		}
	}
	return null;
}

this.getElement = function(array, tag){
	for(var i=0; i<array.length; i++){
		var e = array[i];
		if(e.getTag() == tag){
			return e;
		}
	}
	return null;
}

this.getIndexOf = function(array, element){
	for(var i=0; i<array.length; i++){
		var e = array[i];
		if(e.tag == element.tag){
			return i;
		}
	}
	return -1;
}

}
