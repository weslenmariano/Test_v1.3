import { Component, Inject, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-validacnpj',
  templateUrl: './validacnpj.component.html',
  styleUrls: ["./validacnpj.component.css"],
})
export class ValidaCnpjComponent {

  public mensagemAlert: string;
  public mensagemOk: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

  }

  ngOnInit(): void {

  }

  public validarCNPJ() {
    // CNPJ TESTADO COM BASE NO EXEMPLO -- 11.444.777/0001-XX
    // Informaçoes sobre regra de validação, obtido em:
    // https://souforce.cloud/regra-de-validacao-para-cpf-e-cnpj/
    this.mensagemAlert = "";
    this.mensagemOk = "";
    var primeiroDigito = 0;
    var segundoDigito = 0;

    var cnpj = (<HTMLSelectElement>document.getElementById('inputCnpj')).value;
   
    var cnpj = cnpj.trim().replace(/\./gi, "").replace(/\//gi, "").replace(/\-/gi, "");
    if (cnpj.length != 14) {
      this.mensagemAlert = "O Cnpj informado não é válido";
      return;
    }

    var cnpjsplit = cnpj.substring(0, 12);
    //Distribua os 12 primeiros dígitos em um quadro colocando os pesos 5,4,3,2,9,8,7,6,5,4,3,2
    // abaixo da esquerda para a direita, conforme representação abaixo
    var x1: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var resulttado_x1: number[] = [];

    //Multiplique os valores de cada coluna
    var acumulador = 0;
    for (var i = 0; i < 12; i++) {
      resulttado_x1[i] = Number.parseInt(cnpjsplit[i]) * x1[i];
    }

    //Calcule o somatório dos resultados (5+4+…+0+2) = 214
    for (var i = 0; i < resulttado_x1.length; i++) {
      acumulador += resulttado_x1[i];
    }

    //O resultado obtido(214) será divido por 11.
    //Considere como quociente apenas o valor inteiro,
    //o resto da divisão será responsável pelo cálculo do primeiro dígito verificador.
    var quociente = 0;
    var resto = 0;

    quociente = acumulador / 11;
    resto = acumulador % 11;

    if (resto < 2) {
      primeiroDigito = 0;
    }
    else {
      primeiroDigito = 11 - resto;
    }

    // ----
    //Para o cálculo do segundo dígito será usado o primeiro dígito verificador já calculado.
    // Montaremos uma tabela semelhante a anterior só que desta vez usaremos na segunda linha
    // os valores 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 já que estamos incorporando mais um algarismo para esse cálculo
    var x2: number[] = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    var resulttado_x2: number[] = [];
    cnpjsplit += primeiroDigito;
    
    for (var i = 0; i < 13; i++) {
      resulttado_x2[i] = Number.parseInt(cnpjsplit[i]) * x2[i];
    }

    //Na próxima etapa faremos como na situação do cálculo do primeiro dígito verificador,
    //multiplicaremos os valores de cada coluna e efetuaremos o somatório dos resultados obtidos: (6 + 5 +…+3 + 12) = 221.
    acumulador = 0;
    for (var i = 0; i < resulttado_x2.length; i++) {
      acumulador += resulttado_x2[i];
    }

    quociente = 0;
    resto = 0;
    //Realizamos novamente o cálculo do módulo 11. Dividimos o total do somatório por 11 e consideramos o resto da divisão.
    //Vamos acompanhar: 230 dividido por 11 obtemos 20 como quociente e 10 como resto da divisão.
    quociente = acumulador / 11;
    resto = acumulador % 11;

    //Caso o valor do resto da divisão seja menor que 2, esse valor passa automaticamente a ser zero,
    //caso contrário(como no nosso exemplo) é necessário subtrair o valor obtido de 11 para se obter
    //o dígito verificador, como realizado no cálculo do primeiro dígito.Logo, 11 - 10 = 1 é o nosso segundo dígito verificador.
    if (resto < 2) {
      segundoDigito = 0;
    }
    else {
      segundoDigito = 11 - resto;
    }
    cnpjsplit += segundoDigito;

    if (cnpj == cnpjsplit) {
      this.mensagemOk = "O CNPJ informado é Válido.";
    }
    else {
      this.mensagemAlert = "O CNPJ informado não é válido";
    }
  }

}


