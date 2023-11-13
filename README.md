# 🚗 API PLACA

## Introdução:

Está biblioteca é um simples wrapper para buscar dados de veículos a partir da placa, para isso é utilizado os dados fornecidos do site [Tabela Fipe Brasil](www.tabelafipebrasil.com). Ela também verifica se o valor pesquisada realmente é uma placa válida.

## Uso

### - Instalação

```bash
$ npm install api-placa-fipe
```

### - Importar

```js
import { consultarPlaca } from "api-placa-fipe";
```

### - Exemplo de consulta

```js
consultarPlaca("RDT9D99")
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error(error);
  });
```

### - Exemplo de retorno

```js
{
  marca: "LAMBORGHINI",
  modelo: "URUS",
  anoFabricacao: "2020",
  anoModelo: "2020",
  cor: "PRETA",
  cilindrada: "3996 CC",
  potencia: "650 CV",
  combustivel: "GASOLINA",
  chassi: "*****LA06495",
  uf: "SC",
  municipio: "ITAPEMA",
  importado: "SIM",
  pesoBrutoTotal: "287",
  capMaxTracao: "350",
  tipoVeiculo: "UTILITARIO",
  especieVeiculo: "MISTO",
  passageiros: "5",
  segmento: "AUTO",
  capacidadeCarga: "48",
};
```
