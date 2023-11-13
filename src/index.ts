import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export async function consultarPlaca(placa: string) {
  const placaFormatada = placa.toUpperCase();
  const regex = "[A-Z]{3}[0-9][0-9A-Z][0-9]{2}";

  try {
    if (placaFormatada.match(regex)) {
      const navegador = await puppeteer.launch({
        headless: "new",
        args: [
          "--log-level=3",
          "--no-default-browser-check",
          "--disable-site-isolation-trials",
          "--no-experiments",
          "--ignore-gpu-blacklist",
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
          "--disable-gpu",
          "--disable-extensions",
          "--disable-default-apps",
          "--enable-features=NetworkService",
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--disable-webgl",
          "--disable-threaded-animation",
          "--disable-threaded-scrolling",
          "--disable-in-process-stack-traces",
          "--disable-histogram-customizer",
          "--disable-gl-extensions",
          "--disable-composited-antialiasing",
          "--disable-canvas-aa",
          "--disable-3d-apis",
          "--disable-accelerated-2d-canvas",
          "--disable-accelerated-jpeg-decoding",
          "--disable-accelerated-mjpeg-decode",
          "--disable-app-list-dismiss-on-blur",
          "--disable-accelerated-video-decode",
        ],
      });
      const pagina = await navegador.newPage();

      await pagina.goto("https://www.tabelafipebrasil.com/placa/" + placa);
      const resultado = await pagina.evaluate(() => {
        const linhasDaTabela = Array.from(
          document.querySelectorAll(".fipeTablePriceDetail tbody tr")
        );
        const dadosDaTabela: any = {};

        linhasDaTabela.forEach((row) => {
          const celulaDeTitulo = row.querySelector("td:first-child");
          const celulaDeConteudo = row.querySelector("td:nth-child(2)");

          if (
            celulaDeTitulo &&
            celulaDeTitulo.textContent &&
            celulaDeConteudo &&
            celulaDeConteudo.textContent
          ) {
            let titulo: string = celulaDeTitulo.textContent
              .trim()
              .replace(":", "")
              .normalize("NFD")
              .replaceAll(/[\u0300-\u036f]/g, "")
              .replaceAll(".", "")
              .split(" ")
              .map((palavra, indice) =>
                indice === 0
                  ? palavra.toLowerCase()
                  : palavra.charAt(0).toUpperCase() + palavra.slice(1)
              )
              .join("");

            if (titulo === "ano") {
              titulo = "anoFabricacao";
            }

            let conteudo: string | null = celulaDeConteudo.textContent
              .trim()
              .replace(":", "")
              .normalize("NFD")
              .replaceAll(/[\u0300-\u036f]/g, "")
              .toUpperCase();

            if (conteudo === "----") {
              conteudo = null;
            }

            if (titulo === "tipoVeiculo" && conteudo === "CAMIONETA") {
              conteudo = "CAMINHONETE";
            } else if (titulo === "tipoVeiculo" && conteudo === "MOTONETA") {
              conteudo = "MOTOCICLETA"
            }

            if (titulo === "marca" && conteudo === "CHEV") {
              conteudo = "CHEVROLET";
            }

            if (titulo === "cidade" && conteudo === "ITAPORANGA DE AJUDA") {
              conteudo = "ITAPORANGA D AJUDA";
            }

            dadosDaTabela[titulo] = conteudo;
          }
        });

        return dadosDaTabela;
      });

      await navegador.close();
      return resultado;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
