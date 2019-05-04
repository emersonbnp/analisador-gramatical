import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class GrammerCheckerService {

    constructor(private http: HttpClient) {

    }

    check(sentence: any): Observable<any> {

        return this.http.get(environment.api + '/checker/' + sentence);
    }

}