const { defineFeature, loadFeature } = require("jest-cucumber");
const path = require("path");
const puppeteer = require("puppeteer");

const feature = loadFeature(path.join(__dirname, "../features/carrinho.feature"));

defineFeature(feature, (test) => {
    let browser, page;

    const filePath = 'http://127.0.0.1:5500/ESW-fullstack/frontend/index.html' // OBSERVAÇÃO = ESTA LINHA ESTÁ DIFERENTE DA LINHA DO EXERCÍCIO.

    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: false,  // headless parametro que vai indicar se quer ver as ações navegador ou não quer (true não quer ver, false eu quero ver no navegador) 
            slowMo: 30,
        });
        page = await browser.newPage(); // aguardando abrir uma nova aba
        await page.goto(filePath); // Nesta aba irei abrir url da const filePath (linha 10)
    });

    afterAll(async() => {
        await browser.close();
    });

    test("Compra bem-sucedida", ({ given, and, when, then }) => {
        given("que o usuário acessou a página do carrinho", async() => {
            const titulo = await page.title(); // obtendo o titulo da página (carrinho de compras = titulo)
            expect(titulo).toBe("Carrinho de Compras");
        });

        and("adicionou 2 camisas e 1 tênis ao carrinho", async() => {
            await page.$eval("#qtd-camisa", el => el.value = "2");
            await page.click("#btn-add-camisa");

            await page.$eval("#qtd-tenis", el => el.value="1");
            await page.click("#btn-add-tenis");
        });

        when(/^ele informa o CEP "(.*)"$/, async (cep) => {
            await page.$eval("#cep", (el, value)=> el.value = value, cep);
        });

        and('clica em "Calcular frete"', async () => {
            await page.click("#btn-frete");

            await page.waitForFunction(() => {
                const total = document.querySelector("#total");
                return total && parseFloat(total.textContent) > 0;
            });
        });

        and('clica em "Comprar"', async () => {
            await page.click("#btn-comprar");
        });

        then(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            await page.waitForSelector("#mensagem-compra",{visible:true});
        });

        and(/^o total deve ser R\$ "(.*)"$/, async (valorEsperado) => {
            const total = await page.$eval("#total", el => parseFloat(el.textContent));
            expect(total.toFixed(2)).toBe(valorEsperado);

            await new Promise( r => setTimeout(r, 3000));
        });
    }, 10000);
});