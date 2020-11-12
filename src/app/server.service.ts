
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  private request(method: string, url: string, data?: any){
    const result = this.http.request(method,url,{
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve,reject);
    })
  }

  prendiClienti(){
    return new Promise( (resolve,reject) => {
      this.http.get(environment.serverUrl+"/clienti").subscribe(
        (success:any)=>{
          resolve(success);
        }, (error:any) =>{
          reject(error);
        }
      )
    })
  }

  prendiNoleggio(){
    return new Promise( (resolve,reject) => {
      this.http.get(environment.serverUrl+"/clienti/").subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
  
    })
  }

  aggiungiCliente(cliente){
    console.log(cliente);
    return new Promise( (resolve,reject) => {
      this.http.post(environment.serverUrl+"/cliente",cliente).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  aggiornaCliente(cliente,id){
    var url = environment.serverUrl + "/cliente/" + id.toString();
    return new Promise( (resolve,reject) => {
      this.http.put(url,cliente).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  prendiCategorie(){
    return new Promise( (resolve,reject) => {
      this.http.get(environment.serverUrl+"/categoria").subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
  
    })
  }

  prendiAutoDiCategoria(categoria){
    return new Promise( (resolve,reject) => {
      console.log(environment.serverUrl+"/categoria/"+categoria.id.toString());
      this.http.get(environment.serverUrl+"/categoria/"+categoria.id.toString()).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
  
    })
  }

  prendiAutoDisponibili(){
    return new Promise( (resolve,reject) => {
      this.http.get(environment.serverUrl+"/autodisponibili").subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  prendiNoleggiDiCliente(cliente){
    console.log(environment.serverUrl+"/clienti/"+cliente.id.toString());
    return new Promise( (resolve,reject) => {
      this.http.get(environment.serverUrl+"/clienti/"+cliente.id.toString()).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  aggiungiCategoria(categoria){
    console.log(categoria);
    return new Promise( (resolve,reject) => {
      this.http.post(environment.serverUrl+"/categoria",categoria).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  aggiungiNoleggio(noleggio){
    console.log(noleggio);
    return new Promise( (resolve,reject) => {
      this.http.post(environment.serverUrl+"/noleggio",noleggio).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  aggiornaCategoria(categoria,id){
    var url = environment.serverUrl + "/categoria/" + id.toString();
    return new Promise( (resolve,reject) => {
      this.http.put(url,categoria).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  createCategoria(categoria){
    return this.request('POST', '${enviroment.serverUrl}/categoria', categoria);
  }

  updateCategoria(categoria){
    var url = environment.serverUrl + "/categoria/" + categoria.id.toString();
    console.log(url);
    return this.request('PUT', url, categoria);
  }

  deleteCategoria(categoria){
    var url = environment.serverUrl + "/categoria/" + categoria.id.toString();
    return new Promise( (resolve,reject) => {
      this.http.delete(url).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  eliminaCliente(cliente){
    var url = environment.serverUrl + "/clienti/" + cliente.id.toString();
    return new Promise( (resolve,reject) => {
      this.http.delete(url).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  eliminaNoleggio(noleggio){
    var url = environment.serverUrl + "/noleggio/" + noleggio.id.toString();
    return new Promise( (resolve,reject) => {
      this.http.delete(url).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  eliminaAuto(auto){
    var url = environment.serverUrl + "/auto/" + auto.id.toString();
    return new Promise( (resolve,reject) => {
      this.http.delete(url).subscribe(
        (success:any)=>{
          resolve(success);
        }, (error) => {
          reject(error);
        }
      )
    })
  }
}
