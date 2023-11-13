declare module "api-placa-fipe" {
  export function consultarPlaca(placa: string): Promise<InformacaoDoVeiculo>;

  interface InformacaoDoVeiculo {
    marca?: string;
    modelo?: string;
    anoFabricacao?: string;
    anoModelo?: string;
    cor?: string;
    cilindrada?: string;
    potencia?: string;
    combustivel?: string;
    chassi?: string;
    uf?: string;
    municipio?: string;
    importado?: string;
    pesoBrutoTotal?: string;
    capMaxTracao?: string;
    tipoVeiculo?: string;
    especieVeiculo?: string;
    passageiros?: string;
    segmento?: string;
    capacidadeCarga?: string;
  }
}
