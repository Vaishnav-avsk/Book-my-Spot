import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";


@Injectable()
export class DataService{

        constructor(private http : HttpClient){}

        getAutoComplete(Keyword:string):Observable<any>{
          const url = 'http://localhost:8080/autocomplete';

          let params={
            Keyword:Keyword
          };

          let queryParams = new HttpParams({ fromObject: params }); 

          return this.http.get<any>(url,{params:queryParams}).pipe(
            map(response=>{
              return response;
            }),
            catchError((err)=>{
              console.log(err);
              return err;
            })
          );


        }

        getLocationFromIP(Location:string):Observable<any>{
          let url=`https://maps.googleapis.com/maps/api/geocode/json?address=${Location}&key={Your maps API key goes here without the {}}`;
          return this.http.get<any>(url).pipe(
            map(response=>{
                return response.results[0];
            }),
            catchError((error)=>{return "Error while calling google maps API"})
          )
        }

        getCurrentLocation():Observable<any>{
            let url='https://ipinfo.io?token=c2596fce862f0b';
            return this.http.get<any>(url).pipe(
                map((response)=>{
                 return response;
                }),
                catchError((error)=>{return "Error while calling ipInfo"}));
            
        }

        getYelpData(term:string,radius:string,categories:string,latitude:string,longitude:string):Observable<any>{
          const url = 'http://localhost:8080/fetchYelp';

          let params={
            term:term,
            radius:radius,
            categories:categories,
            latitude:latitude,
            longitude:longitude
          };

          let queryParams = new HttpParams({ fromObject: params }); 


          return this.http.get<any>(url,{params:queryParams}).pipe(
            map(response=>{
              return response;
            }),
            catchError((err)=>{
              console.log(err);
              return err;
            })
          );

        }

      getMoreInfo(id:any):Observable<any>{

        const url = 'http://localhost:8080/getInfo';

          let params={
            id:id
          };

          let queryParams = new HttpParams({ fromObject: params }); 


          return this.http.get<any>(url,{params:queryParams}).pipe(
            map(response=>{
              return response;
            }),
            catchError((err)=>{
              console.log(err);
              return err;
            })
          );
      }


      getBusinessReviews(id:any):Observable<any>{
        const url = 'http://localhost:8080/fetchReviews';

        let params={
         id:id
        };

        let queryParams = new HttpParams({ fromObject: params }); 


        return this.http.get<any>(url,{params:queryParams}).pipe(
          map(response=>{
            return response;
          }),
          catchError((err)=>{
            console.log(err);
            return err;
          })
        );

      }
    }
