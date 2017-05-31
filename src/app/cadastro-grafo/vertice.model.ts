import { Aresta } from './aresta.model';

export class Vertice{
    public rotulo: string;
    public arestas: Array<Aresta> = new Array();

    public adicionaRotulo(rotulo: string){
        this.rotulo =  rotulo;
    }

    public adicionaAresta(aresta: Aresta){
        this.arestas.push(aresta);
    }
}
