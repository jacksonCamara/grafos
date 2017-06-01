import { Grafo } from "./grafo.model"
import { Vertice } from "./vertice.model"

export class Prim {

    private verticeInicialRotulo: string = null;
    private verticeInicial: Vertice;
    private verticesConjuntoAberto: Array<Vertice>;
    private verticesConjuntoFechado: Array<Vertice> = new Array();
    private verticeMaisProximo: Vertice;
    private menorPeso: number;
    private verticeAberto: Vertice;
    private verticeCaminho: Vertice;
    private solucao: Array<Solucao> = new Array();

    constructor(vertices: Array<Vertice>, verticeInicial: string) {
        this.verticeInicialRotulo = verticeInicial;
        this.verticesConjuntoAberto = vertices;
    }

    public executar(): void {
        this.analisador();

    }



    private analisador() {
        this.verticeInicial = this.pesquisaVerticeConjuntoAberto(this.verticeInicialRotulo);
        this.verticeMaisProximo = undefined;
        this.menorPeso = undefined;
        this.adicionaVerticeConjuntoFechado(this.verticeInicial);


        while (this.verticesConjuntoAberto.length > 0) {
            this.verticesConjuntoFechado.forEach(v => {
                v.arestas.forEach(a => {
                    this.verticeAberto = undefined;
                    this.verticeAberto = this.pesquisaVerticeConjuntoAberto(a.rotuloVerticeAdjacente);
                    if (this.verticeAberto) {
                        if (this.menorPeso == undefined || a.peso < this.menorPeso) {
                            this.menorPeso = a.peso;
                            this.verticeMaisProximo = this.verticeAberto;
                            this.verticeCaminho = v;
                        }
                    }
                })
            })

            this.adicionaVerticeConjuntoFechado(this.verticeMaisProximo);
            this.solucao.push(new Solucao(this.verticeMaisProximo.rotulo, this.verticeCaminho.rotulo));
            this.menorPeso = undefined;
            this.verticeMaisProximo = undefined;
        }

        this.imprimirAberto();
        this.imprimirFechado();
        this.imprimirSolucao();
    }



    //Pesquisa o conjunto de vertices aberto, se encontrado retorna o vertice, se não encontrado retorna undefined
    private pesquisaVerticeConjuntoAberto(verticeRotulo: string): Vertice {
        return this.verticesConjuntoAberto.find(v =>
            v.rotulo == verticeRotulo
        )
    }

    private adicionaVerticeConjuntoFechado(vertice: Vertice): void {
        this.verticesConjuntoFechado.push(vertice);
        this.removeVerticeConjuntoAberto(vertice);
    }

    private removeVerticeConjuntoAberto(vertice): void {
        this.verticesConjuntoAberto = this.verticesConjuntoAberto.filter(v => {
            return vertice != v
        })
    }

    private iniciaVerticeInicial() {
        this.verticeInicial = this.pesquisaVerticeConjuntoAberto(this.verticeInicialRotulo);
        if (this.verticeInicial) {
            console.log("Existe o Vertice Inicial")
            this.adicionaVerticeConjuntoFechado(this.verticeInicial);
        } else {
            console.log("Não existe o Vertice Inicial")
        }
    }

    imprimirAberto() {
        console.log("===================Aberto=========================")
        this.verticesConjuntoAberto.forEach(v => {

            console.log(v);
        })
    }

    imprimirFechado() {
        console.log("===================Fechado=========================")
        this.verticesConjuntoFechado.forEach(v => {
            console.log(v);
        })

    }

    imprimirSolucao() {
        console.log("===================Solucao=========================")
        this.solucao.forEach(s => {
            console.log(s.destino + s.origem);
        })
    }





    /*
    


        let cont = 0;
        while (this.verticesConjuntoAberto.length != 0) {
            this.verticesConjuntoFechado.forEach(v => {
                v.arestas.forEach(a => {
                    if (a.peso < menorPeso) {
                        let verticeAberto = this.pesquisaVerticeConjuntoAberto(a.rotuloVerticeAdjacente)
                        if (verticeAberto != undefined) {
                            verticeMaisProximo = verticeAberto;
                            menorPeso = a.peso;
                        }
                    }
                })
            })
            this.adicionaVerticeConjuntoFechado(verticeMaisProximo)
            cont++;
            if (cont > 100) {
                break;
            }
            console.log("=======================Aberto============================")
            console.log(this.imprimirAberto());
            console.log("=======================Fechado============================")
            console.log(this.imprimirFechado());
        }



    
        private aberto: Grafo = new Grafo();
        private fechado: Grafo = new Grafo();
        private verticeInicialRotulo: string;
        private verticeInicial: Vertice;
        private abertoAux: Array<Vertice> = new Array();
    
        constructor(grafo: Grafo, verticeInicialRotulo: string) {
            this.aberto = grafo;
            this.verticeInicialRotulo = verticeInicialRotulo;
        }
    
        public iniciar() {
            this.verticeInicial = this.pesquisaVertice(this.verticeInicialRotulo);
            this.abertoAux = this.pesquisaVerticeAberto();
    
        }
    
    
        private pesquisaVerticeAberto(): Vertice[] {
            return this.aberto.vertices.filter(v => {
                return this.verticeInicial.arestas.find(a =>
                    v.rotulo == a.rotuloVerticeAdjacente
                )
            })
        }
    
        private menorCaminho(){
            return this.abertoAux.forEach(a =>{
                if(a.rotulo == this.verticeInicial.rotulo){
                }
            })
        }
    
    
    
    
        private pesquisaVertice(verticeInicialRotulo: string): Vertice {
            return this.aberto.vertices.find(v => v.rotulo == verticeInicialRotulo)
        }
    */

}
export class Solucao {

    origem: string;
    destino: string;

    constructor(origem: string, destino: string) {
        this.origem = origem;
        this.destino = destino;
    }
}