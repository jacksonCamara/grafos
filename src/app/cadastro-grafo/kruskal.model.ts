import { Grafo } from "./grafo.model"
import { Vertice } from "./vertice.model"

export class Kruskal {
    private floresta: Array<Arvore> = new Array();
    private solucao: Array<Solucao> = new Array();
    private controle: Array<Vertice>;
    private menorPeso: number;
    private pesoTotal: number;
    private verticeMaixProximo: string;
    private verticeAnalisado: Vertice;
    private vertices: Array<Vertice>;
    private controles: Array<Controle> = new Array();
    private controleSelecionado: Controle;
    private solucoes: Array<Solucao> = new Array();
    constructor(vertices: Array<Vertice>, verticeInicial: string) {
        this.vertices = vertices;
        for (let i = 0; i < vertices.length; i++) {
            this.floresta.push(new Arvore());
            this.floresta[i].vertices.push(vertices[i])
        }
        this.montaControle();
    }

    public executar(): void {

        //  this.adicionaVerticeArvore(this.floresta[5].vertices[0], this.floresta[0].vertices[0])
        //  this.adicionaVerticeArvore(this.floresta[4].vertices[0], this.floresta[1].vertices[0])
        //  this.adicionaVerticeArvore(this.floresta[3].vertices[1], this.floresta[2].vertices[0])
        //  this.imprimirFloresta();
        // console.log(this.floresta[0])
        //   console.log(this.arvoreDiferente(this.floresta[4].vertices[0], this.floresta[3].vertices[0]))
        //    this.imprimirControle();


        this.analisador();


    }

    private analisador(): void {
        console.log("=============================== ITERAÇÃO =========================================")
        this.imprimirSolucoes();
        this.imprimirControle();

        let cont = 0;
        //this.floresta.length != 1
        while (cont < 6) {
            cont++;
            this.controles.forEach(c => {
                console.log(this.arvoreDiferente(c.verticeOrigem, c.verticeDestino))
                if (this.arvoreDiferente(c.verticeOrigem, c.verticeDestino)) {
                    console.log("arvore diferente");
                    console.log(c.verticeOrigem)
                    console.log(c.verticeDestino)
                    if (c.peso < this.menorPeso || this.menorPeso == undefined) {
                        this.controleSelecionado = c;
                        this.menorPeso = c.peso;
                    }
                }
            })

            this.solucoes.push(new Solucao(this.controleSelecionado.verticeOrigem, this.controleSelecionado.verticeDestino));

            this.adicionaVerticeArvore(this.controleSelecionado.verticeOrigem, this.controleSelecionado.verticeDestino);
            this.removeControle(this.controleSelecionado);
            console.log("=============================== ITERAÇÃO =========================================")
            this.imprimirSolucoes();
            this.imprimirControle();
            this.imprimirFloresta();
            this.menorPeso = undefined;
            this.controleSelecionado = undefined;
            this.pesoTotal += this.menorPeso;
        }
    }

    //Adiciona o vertice na arvore correspondente 
    //Pega o vertice Forasteiro e adiciona da arvore do vertice da casa
    //
    private adicionaVerticeArvore(verticeDaCasa: Vertice, verticeForasteiro: Vertice): void {
        console.log("++++++++++++++++adicionando na arvore++++++++")
        console.log(verticeDaCasa)
        console.log(verticeForasteiro)
        let indexArvore: number = this.pesquisaIndexArvore(verticeForasteiro);
        this.floresta[this.pesquisaIndexArvore(verticeDaCasa)].vertices.push(verticeForasteiro)
        this.removeVerticeArvore(verticeForasteiro, indexArvore)

    }


    //Remove o vertice da arvore, ação executada quando o vertice vai para outra árvore
    private removeVerticeArvore(verticeRemover: Vertice, indexArvore: number) {
        let indexVertice = this.pesquisaIndexVertice(verticeRemover, indexArvore)
        this.floresta[indexArvore].vertices.splice(indexVertice, 1);
        if (this.floresta[indexArvore].vertices.length == 1) {
            this.removeArvoreVaziaDaFloresta(indexArvore);
        }
    }



    //Retorna false se os vertices pertencer a mesma arvore
    private arvoreDiferente(verticeDaCasa: Vertice, verticeForasteiro: Vertice): boolean {

        if (this.pesquisaIndexArvore(verticeDaCasa) == this.pesquisaIndexArvore(verticeForasteiro)) {
            return false;
        } else {
            return true;
        }
    }


    //monta o controle, inserindo os vertices que possuem arestas entre eles
    private montaControle() {
        this.vertices.forEach(v => {
            v.arestas.forEach(a => {
                //console.log(this.existeNoControle(v.rotulo, a.rotuloVerticeAdjacente))
                if (!this.existeNoControle(v.rotulo, a.rotuloVerticeAdjacente)) {
                    this.controles.push(new Controle(v, this.pesquisaPorRotuloVertice(a.rotuloVerticeAdjacente), a.peso))
                }
            })
        })
    }

    //Método auxiliar do método montaControle()
    //Verifica se vertices ligados por arestas ja estão no controle
    private existeNoControle(verticeOrigem: string, verticeDestino: string) {
        return this.controles.some(c =>
            c.verticeOrigem.rotulo == verticeOrigem && c.verticeDestino.rotulo == verticeDestino
            || c.verticeOrigem.rotulo == verticeDestino && c.verticeDestino.rotulo == verticeOrigem
        )
    }


    //Retorna o vertice pesquisado pelo rotulo
    private pesquisaPorRotuloVertice(verticeRotulo: string): Vertice {
        return this.vertices.find(v =>
            v.rotulo == verticeRotulo
        )
    }



    private removeControle(controle: Controle) {
        let index = this.controles.findIndex(c =>
            c == controle
        )
        this.controles.splice(index, 1);
    }



    //Após deletar o vertice verifica se a arvore esta vazia, se estiver vazia a arvore é deletada
    private removeArvoreVaziaDaFloresta(indexArvore: number): void {
        if (this.floresta[indexArvore].vertices.length == 0) {
            this.floresta.splice(indexArvore, 1);
        }
    }

    //Pesquisa na floresta e retorna o index da arvore onde o vertice se encontra
    private pesquisaIndexArvore(vertice: Vertice): number {
        return this.floresta.findIndex(f =>
            f.vertices.some(v =>
                v == vertice
            )
        )
    }

    //Pesquisa na floresta e retorna o index da vertice na arvore
    private pesquisaIndexVertice(vertice: Vertice, indexArvore: number): number {
        return this.floresta[indexArvore].vertices.findIndex(v =>
            v == vertice
        )
    }


    private imprimirFloresta(): void {
        console.log("=======================Floresta==========================")
        this.floresta.forEach(f => {
            console.log(f)
        })
    }

    private imprimirControle(): void {
        console.log("=======================Controle==========================")
        this.controles.forEach(c => {
            console.log(c.verticeOrigem, c.verticeDestino, c.peso)
        })
    }

    private imprimirSolucoes(): void {
        console.log("=======================Solucoes==========================")
        this.solucoes.forEach(c => {
            console.log(c.verticeOrigem, c.verticeDestino)
        })
    }
}

class Arvore {
    public vertices: Array<Vertice> = new Array();
}

class Solucao {

    verticeOrigem: Vertice;
    verticeDestino: Vertice;

    constructor(origem: Vertice, destino: Vertice) {
        this.verticeOrigem = origem;
        this.verticeDestino = destino;

    }
}

class Controle {

    verticeOrigem: Vertice;
    verticeDestino: Vertice;
    peso: number;

    constructor(origem: Vertice, destino: Vertice, peso) {
        this.verticeOrigem = origem;
        this.verticeDestino = destino;
        this.peso = peso;
    }
}