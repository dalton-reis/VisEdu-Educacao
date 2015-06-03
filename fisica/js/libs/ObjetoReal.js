var ObjetoReal = function (_fisico, _desenho) {
    var fisico = _fisico;
    var desenho = _desenho;

    this.getDesenho = function() {
        return desenho;
    };
    
    this.getFisico = function(){
        return fisico;  
    };

    return this;
};


