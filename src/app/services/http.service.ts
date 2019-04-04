import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 // public url:string = "http://www.techbuildz.com/api/cleversoft/api";
 //public url = "http://10.0.2.2:8000/api";
//public url = "http://192.168.75.1:8000/api";
public url = "http://localhost:8000/api";
  public added_link:string;
  public data:any;
  public post_response:any;
 public header:any;
  constructor(public http: HttpClient) {
   
    
   }

  setHeaders(token)
  {
    var header = new HttpHeaders();
    if(token==null){
     header = header.set("Content-type","application/json");
    }else{
      header = header.set('Authorization', token);
      // header = header.set("Content-type","application/json");
    }
    
   
    return header;
  }
   postData(item,added_url,token?:any)
    {
      
      return this.http.post(this.url+added_url,item,{headers:this.setHeaders(token)});
    
    }
  
    getData(added_url,token?:any)
    {
         return this.http.get(this.url+added_url,{headers:this.setHeaders(token)});
    }


    putData(item,added_url,token?:any)
    {
     return this.http.put(this.url+added_url,item,{headers:this.setHeaders(token)});
    }


    deleteData(added_url,token?:any)
    {
      return this.http.delete(this.url+added_url,{headers:this.setHeaders(token)});
    }
//end of this class
}
