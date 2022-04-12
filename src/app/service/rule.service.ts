import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rule } from '../model/rule';
@Injectable({
  providedIn: 'root'
})
export class RuleService {
  addRuleURL : string;
  getRuleURL : string;
  updateRuleUrl : string;
  deleteRuleUrl : string;

  constructor(private http : HttpClient) {

    this.getRuleURL = 'http://localhost:8080/emp/getAll';
    this.addRuleURL = 'http://localhost:8080/emp/addRule';
    this.updateRuleUrl = 'http://localhost:8080/emp/updateRule';
    this.deleteRuleUrl = 'http://localhost:8080/emp/deleteRuleById';

  }

  getAllRule(): Observable<Rule[]>{
    return this.http.get<Rule[]>(this.getRuleURL);
  }

  addRule(rule : Rule): Observable<Rule> {
    return this.http.post<Rule>(this.addRuleURL,rule);
  }

  updateRule(rule :Rule) : Observable<Rule>{
    return this.http.put<Rule>(this.updateRuleUrl, rule);
  }

  deleteRule(rule : Rule) : Observable<Rule> {
    return this.http.delete<Rule>(this.deleteRuleUrl+'/'+rule.id);
  }

}
