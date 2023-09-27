const axios = require("axios");
const url = "https://tecweb-js.insper-comp.com.br/token";
const data = { username: "yurit", "Content-Type": "applications/json" };

// Função para obter o token de acesso
async function obterAccessToken() {
  try {
    const response = await axios.post(url, data);
    return response.data.accessToken;
  } catch (error) {
    console.error("Erro ao obter token de acesso:", error);
    throw error;
  }
}

// Função para obter o dicionário de exercícios
async function obterExercicios(accessToken) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(
      "https://tecweb-js.insper-comp.com.br/exercicio",
      { headers }
    );

    // Printa exercícios
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao obter dicionário de exercícios:", error);
    throw error;
  }
}

async function enviarResposta(exercicioSlug, resposta, accessToken) {
    try {
      const url = `https://tecweb-js.insper-comp.com.br/exercicio/${exercicioSlug}`;
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
  
      // Formate a resposta em um objeto JSON com a chave "resposta"
      const data = {
        resposta: resposta,
      };
  
      // Faça a requisição POST com os cabeçalhos e dados configurados
      const response = await axios.post(url, data, { headers });
      console.log(response.data)
  
      // Verifique a resposta para garantir que a solução foi enviada com sucesso
      if (response.status === 200) {
        console.log("Solução enviada com sucesso!");
      } else {
        console.error("Erro ao enviar a solução:", response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar a solução:", error);
      throw error;
    }
  }
  

// Função para resolver os exercícios
async function criarVariaveis() {

    async function cacaAoTesouro(inicio, accessToken) {
        while (true) {
          try {
            const headers = {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            };
      
            const response = await axios.get(inicio, { headers });
      
            if (typeof response.data === 'number') {
              return response.data;
            } else {
              inicio = response.data;
            }
          } catch (error) {
            console.error(`Erro`, error);
            throw error;
          }
        }
      }
      
  try {
    const accessToken = await obterAccessToken();
    const exercicios = await obterExercicios(accessToken);

    const somaA = exercicios.soma.entrada.a;
    const somaB = exercicios.soma.entrada.b;
    const inputString = exercicios["tamanho-string"].entrada.string;
    const nomeDoUsuarioEmail = exercicios["nome-do-usuario"].entrada.email;
    const jacaWarsV = exercicios["jaca-wars"].entrada.v;
    const jacaWarsTheta = exercicios["jaca-wars"].entrada.theta;
    const anoBissextoAno = exercicios["ano-bissexto"].entrada.ano;
    const volumeDaPizzaZ = exercicios["volume-da-pizza"].entrada.z;
    const volumeDaPizzaA = exercicios["volume-da-pizza"].entrada.a;
    const mruS0 = exercicios.mru.entrada.s0;
    const mruV = exercicios.mru.entrada.v;
    const mruT = exercicios.mru.entrada.t;
    const inverteString = exercicios["inverte-string"].entrada.string;
    const somaValoresObjeto = exercicios["soma-valores"].entrada.objeto;
    const nEsimoPrimoN = exercicios["n-esimo-primo"].entrada.n;
    const stringsPrefixo = exercicios["maior-prefixo-comum"].entrada.strings;
    const numeros = exercicios['soma-segundo-maior-e-menor-numeros'].entrada.numeros;
    const palavrasPalindromo = exercicios['conta-palindromos'].entrada.palavras;
    const somaStringsInteiros = exercicios['soma-de-strings-de-ints'].entrada.strings;
    const somaRequisicoes = exercicios['soma-com-requisicoes'].entrada.endpoints;
    const tesouro = exercicios['caca-ao-tesouro'].entrada.inicio;

    enviarResposta('soma',soma(somaA,somaB),accessToken)
    enviarResposta('tamanho-string',tamanhoString(inputString),accessToken)
    enviarResposta('nome-do-usuario',nomeDoUsuario(nomeDoUsuarioEmail),accessToken)
    enviarResposta('jaca-wars',jacaWars(jacaWarsV, jacaWarsTheta),accessToken)
    enviarResposta('ano-bissexto',anoBissexto(anoBissextoAno),accessToken)
    enviarResposta('volume-da-pizza',volumeDaPizza(volumeDaPizzaA,volumeDaPizzaZ),accessToken)
    enviarResposta('mru',MRU(mruS0,mruV,mruT),accessToken)
    enviarResposta('inverte-string',inverterString(inverteString),accessToken)
    enviarResposta('soma-valores',somarValoresDoObjeto(somaValoresObjeto),accessToken)
    enviarResposta('n-esimo-primo',encontrarNesimoPrimo(nEsimoPrimoN),accessToken)
    enviarResposta('maior-prefixo-comum',encontrarMaiorPrefixoComum(stringsPrefixo),accessToken)
    enviarResposta('soma-segundo-maior-e-menor-numeros',somaSegundoMaiorMenorNumeros(numeros),accessToken)
    enviarResposta('conta-palindromos',contaPalindromos(palavrasPalindromo),accessToken)
    enviarResposta('soma-de-strings-de-ints',somaStringsDeInteiros(somaStringsInteiros),accessToken)

    console.log(encontrarMaiorPrefixoComum(stringsPrefixo),"AQUI")
    console.log(stringsPrefixo)

    somaComRequisicoes(somaRequisicoes, accessToken).then((resultadoSoma) => {
        enviarResposta('soma-com-requisicoes',resultadoSoma,accessToken)
      }).catch((error) => {
        console.error('Erro ao calcular a soma:', error);
    });
    
    cacaAoTesouro(tesouro, accessToken)
    .then((resultadoTesouro) => {
      enviarResposta('caca-ao-tesouro',resultadoTesouro,accessToken)
    })
    .catch((error) => {
      console.error("Erro ao encontrar o tesouro:", error);
    });
      
      


  } catch (error) {
    console.error("Erro geral:", error);
    throw error;
  }
}

function soma(a, b){
    return a+b
}

function tamanhoString(s){
    return s.length
}

function nomeDoUsuario(email){
    const partes = email.split('@');
    const nomeDoUsuario = partes[0];
    return nomeDoUsuario;
}

function jacaWars(v, theta) {
    const g = 9.8; // Aceleração devido à gravidade em m/s^2
    const distanciaMaxima = (v ** 2) * Math.sin(2 * (theta * (Math.PI / 180))) / g;
    if (distanciaMaxima < 98){
        return -1;
    }
    else if (distanciaMaxima > 102) {
        return 1; // A jaca atingiu o alvo
    } else {
        return 0; 
    }
}

function anoBissexto(ano) {
    // Um ano bissexto é divisível por 4, exceto quando é divisível por 100,
    // a menos que também seja divisível por 400.
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
}

function volumeDaPizza(h,z) {
    return Math.round(h*z**2*Math.PI);
}

function MRU(s0,v,t) {
    return s0+v*t
}

function inverterString(string) {
    // Divide a string em um array de caracteres, reverte o array e o junta novamente em uma string.
    return string.split('').reverse().join('');
}

function somarValoresDoObjeto(objeto) {
    let soma = 0;
    for (const chave in objeto) {
      if (objeto.hasOwnProperty(chave)) {
        soma += objeto[chave];
      }
    }
    return soma;
  }
  
function ehPrimo(numero) {
    if (numero <= 1) {
        return false;
    }

    for (let i = 2; i * i <= numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }

    return true;
}

function encontrarNesimoPrimo(n) {
    if (n === 1) {
        return 2;
    }

    let contador = 1;
    let numeroAtual = 3;

    while (contador < n) {
        if (ehPrimo(numeroAtual)) {
            contador++;
        }
        if (contador < n) {
            numeroAtual += 2; // Pular números pares (exceto 2)
        }
    }

    return numeroAtual;
}

function encontrarMaiorPrefixoComum(strings) {
    let maior = '';
    let maiorLen = 0;
  
    for (let i = 0; i < strings.length; i++) {
      for (let x = 0; x < strings.length; x++) {
        if (x !== i) {
          let contador = 0;
          let string = '';
          
          for (let p = 0; p < Math.min(strings[i].length, strings[x].length); p++) {
            if (strings[x][p] === strings[i][p]) {
              contador++;
              string += strings[x][p];
            } else {
              break;
            }
          }
          
          if (contador > maiorLen) {
            maiorLen = contador;
            maior = string;
          }
        }
      }
    }
    
    return maior;
}

function somaSegundoMaiorMenorNumeros(numeros) {
    if (numeros.length < 2) {
      return "O array deve conter pelo menos dois números.";
    }
  
    // Ordena o array em ordem crescente.
    numeros.sort(function (a, b) {
      return a - b;
    });
  
    // Pega o segundo menor número e o segundo maior número.
    const segundoMenor = numeros[1];
    const segundoMaior = numeros[numeros.length - 2];
  
    // Soma os números e retorna o resultado.
    return segundoMenor + segundoMaior;
}

function contaPalindromos(palavras) {
    // Função para verificar se uma palavra é um palíndromo
    function ehPalindromo(palavra) {
      const palavraInvertida = palavra.split('').reverse().join('');
      return palavra === palavraInvertida;
    }
  
    // Filtra as palavras que são palíndromos
    const palindromos = palavras.filter(ehPalindromo);
  
    // Retorna a contagem de palíndromos encontrados
    return palindromos.length;
}

function somaStringsDeInteiros(strings) {
    // Usando map para converter as strings em números inteiros
    const numeros = strings.map((string) => parseInt(string, 10));
  
    // Usando reduce para calcular a soma dos números
    const soma = numeros.reduce((total, numero) => total + numero, 0);
  
    return soma;
}

function somaComRequisicoes(endpoints, accessToken) {
  // Inicializa uma variável para armazenar a soma
  let soma = 0;

  // Crie um array para armazenar todas as promessas das solicitações
  const requests = endpoints.map(async (endpoint) => {
    try {
      // Configura o cabeçalho com o token de autorização
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      // Faz uma requisição GET para o endpoint com o cabeçalho configurado
      const response = await axios.get(endpoint, { headers });

      // Verifica se a resposta contém um número
      if (typeof response.data === 'number') {
        // Adiciona o número à soma
        soma += response.data;
      } else {
        console.error(`O endpoint ${endpoint} não retornou um número.`);
      }
    } catch (error) {
      console.error(`Erro ao fazer requisição para ${endpoint}:`, error);
    }
  });

  // Aguarda todas as solicitações serem concluídas
  return Promise.all(requests).then(() => soma);
}    

criarVariaveis()