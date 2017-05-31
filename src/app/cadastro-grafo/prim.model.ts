import { Grafo } from "./grafo.model"
import { Vertice } from "./vertice.model"

export class Prim {
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


}
