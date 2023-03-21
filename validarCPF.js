// Exercicio: Validar CPF

// '705.484.450-52'

function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        get: function() {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function() {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digitoUm = this.criaDigito(cpfParcial);
    const digitoDois = this.criaDigito(cpfParcial + digitoUm);

    const novoCpf = cpfParcial + digitoUm + digitoDois;

    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    
    let regresivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, val) => {
        ac += (regresivo * Number(val));
        regresivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

// Impide que los num todo sean 111.111....
ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo; 
};

const cpf = new ValidaCPF('705.484.450-52');

if (cpf.valida()) {
    console.log('CPF Válido');
} else {
    console.log('CPF Inválido');
}