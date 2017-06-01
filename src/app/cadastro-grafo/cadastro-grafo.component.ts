import { Component, OnInit } from '@angular/core';
import { Vertice } from './vertice.model';
import { Grafo } from './grafo.model';
import { Aresta } from './aresta.model';
import { Prim } from './prim.model';

@Component({
  selector: 'app-cadastro-grafo',
  templateUrl: './cadastro-grafo.component.html',
  styleUrls: ['./cadastro-grafo.component.css']
})

export class CadastroGrafoComponent implements OnInit {
  public grafo: Grafo = new Grafo;
  public verticeInicial: string;

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
    this.iniciaGrafo();
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
    this.verticeDestinoRotulo = "";
    this.verticeOrigemRotulo = "";
    this.peso = null;
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
    //this.verticeInicial ="b"; // para teste
    console.log(this.verticeInicial);
    var prim: Prim = new Prim(this.grafo.vertices, this.verticeInicial);
    prim.executar();
  }

  public kruskal() {

  }

  public imprimir() {

  }

  public resetGrafo() {
    this.grafo = new Grafo();
  }


  private iniciaGrafo() {



    /*
   
   this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[0].rotulo = "a";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[1].rotulo = "b";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[2].rotulo = "c";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[3].rotulo = "d";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[4].rotulo = "e";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[5].rotulo = "f";
      //Arestas vertice A
      this.grafo.vertices[0].arestas.push(new Aresta("b", 5));
      this.grafo.vertices[0].arestas.push(new Aresta("d", 8));
      this.grafo.vertices[0].arestas.push(new Aresta("c", 4));
      //Arestas vertice B
      this.grafo.vertices[1].arestas.push(new Aresta("a", 5));
      this.grafo.vertices[1].arestas.push(new Aresta("d", 2));
      //Arestas vertice C
      this.grafo.vertices[2].arestas.push(new Aresta("a", 4));
      this.grafo.vertices[2].arestas.push(new Aresta("d", 3));
      //Arestas vertice D
      this.grafo.vertices[3].arestas.push(new Aresta("a", 8));
      this.grafo.vertices[3].arestas.push(new Aresta("b", 2));
      this.grafo.vertices[3].arestas.push(new Aresta("c", 3));
            this.grafo.vertices[3].arestas.push(new Aresta("f", 3));
      this.grafo.vertices[3].arestas.push(new Aresta("e", 7));
      //Arestas vertice E
      this.grafo.vertices[4].arestas.push(new Aresta("d", 7));
      this.grafo.vertices[4].arestas.push(new Aresta("f", 2));

      //Arestas vertice F
            this.grafo.vertices[5].arestas.push(new Aresta("d", 3));
      this.grafo.vertices[5].arestas.push(new Aresta("e", 2));


*/

 

   this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[0].rotulo = "a";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[1].rotulo = "b";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[2].rotulo = "c";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[3].rotulo = "d";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[4].rotulo = "e";
      this.grafo.vertices.push(new Vertice());
      this.grafo.vertices[5].rotulo = "f";
      //Arestas vertice A
      this.grafo.vertices[0].arestas.push(new Aresta("c", 7));
      this.grafo.vertices[0].arestas.push(new Aresta("d", 2));
      this.grafo.vertices[0].arestas.push(new Aresta("e", 10));
      //Arestas vertice B
      this.grafo.vertices[1].arestas.push(new Aresta("c", 3));
      this.grafo.vertices[1].arestas.push(new Aresta("f", 2));
      //Arestas vertice C
      this.grafo.vertices[2].arestas.push(new Aresta("a", 7));
      this.grafo.vertices[2].arestas.push(new Aresta("b", 3));
      this.grafo.vertices[2].arestas.push(new Aresta("e", 9));
      this.grafo.vertices[2].arestas.push(new Aresta("f", 3));
      //Arestas vertice D
      this.grafo.vertices[3].arestas.push(new Aresta("a", 2));
      this.grafo.vertices[3].arestas.push(new Aresta("e", 7));
      this.grafo.vertices[3].arestas.push(new Aresta("f", 4));
      //Arestas vertice E
      this.grafo.vertices[4].arestas.push(new Aresta("a", 10));
      this.grafo.vertices[4].arestas.push(new Aresta("c", 9));
      this.grafo.vertices[4].arestas.push(new Aresta("d", 7));
      this.grafo.vertices[4].arestas.push(new Aresta("f", 8));
      //Arestas vertice F
      this.grafo.vertices[5].arestas.push(new Aresta("b", 2));
      this.grafo.vertices[5].arestas.push(new Aresta("c", 3));
      this.grafo.vertices[5].arestas.push(new Aresta("d", 4));
      this.grafo.vertices[5].arestas.push(new Aresta("e", 8));
   
  }

}