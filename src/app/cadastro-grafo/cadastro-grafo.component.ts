import { Component, OnInit } from '@angular/core';
import { Vertice } from './vertice.model';
import { Grafo } from './grafo.model';
import { Aresta } from './aresta.model';

@Component({
  selector: 'app-cadastro-grafo',
  templateUrl: './cadastro-grafo.component.html',
  styleUrls: ['./cadastro-grafo.component.css']
})

export class CadastroGrafoComponent implements OnInit {
  public grafo: Grafo = new Grafo;
  public verificadorVertice: boolean = false;
  public vertice: Vertice = new Vertice();
  public verticeOrigem: Vertice = new Vertice();
  public verticeDestino: Vertice = new Vertice();
  public verticeOrigemRotulo: string;
  public verticeDestinoRotulo: string;
  public peso: number;

  constructor() {

  }

  ngOnInit() {

  }

  adicionarVertice() {
    if (!this.verificarVertice(this.vertice.rotulo)) {
      this.grafo.vertices.push(this.vertice);
      console.log("Vertice Inserido");
    } else {
      console.log("Vertice já existe");
    }
    this.vertice = new Vertice();
  }

  //Procura o vertice dentro do grafo, se encontra retorna true
  private verificarVertice(rotulo: string): boolean {
    return this.grafo.vertices
      .some(v =>
        v.rotulo == rotulo)
  }

  //Procura o vertice dentro do grafo, se encontra retorna o vertice com todas suas propriedades(arestas e peso)
  private retornaVertice(rotulo: string): Vertice {
    return this.grafo.vertices.find(v =>
      v.rotulo == rotulo
    )
  }

  public adicionarAresta() {
    if (!this.verificaAresta()) {
      console.log("Aresta Adicionada")
      this.verticeOrigem.arestas.push(new Aresta(this.verticeDestino.rotulo, this.peso))
      this.verticeDestino.arestas.push(new Aresta(this.verticeOrigem.rotulo, this.peso))

    } else {
      console.log("Não inserido")
    }

    this.grafo.vertices.forEach(v => {
      console.log(v);
    })
  }

  private verificaAresta(): boolean {
    this.verticeOrigem = this.retornaVertice(this.verticeOrigemRotulo)
    this.verticeDestino = this.retornaVertice(this.verticeDestinoRotulo)
    if (this.verticeOrigem != undefined && this.verticeDestino != undefined) {
      console.log("entrou aqui")
      return this.verticeOrigem.arestas.some(a =>
        a.rotuloVerticeAdjacente == this.verticeDestino.rotulo
      )
    } else if (this.verticeOrigem == undefined) {
      console.log(this.verticeOrigemRotulo + "Não existe");
      return true;
    } else if (this.verticeDestino == undefined) {
      console.log(this.verticeDestinoRotulo + "Não existe");
      return true;
    }

  }



  public prim() {

  }

  public kruskal() {

  }

  public imprimir() {

  }

  public resetGrafo() {
    this.grafo = new Grafo();
  }


}