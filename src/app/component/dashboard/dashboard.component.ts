import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Rule } from 'src/app/model/rule';
import { RuleService } from 'src/app/service/rule.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ruleDetail !: FormGroup;
  ruleObj : Rule = new Rule();
  ruleList : Rule[] = [];

  constructor(private formBuilder : FormBuilder, private ruleService : RuleService) { }

  ngOnInit(): void {

    this.getAllRule();

    this.ruleDetail = this.formBuilder.group({
      id : [''],
      name : ['']
    });

  }

  addRule() {
    console.log(this.ruleDetail);
    this.ruleObj.id = this.ruleDetail.value.id;
    this.ruleObj.name = this.ruleDetail.value.name;

    this.ruleService.addRule(this.ruleObj).subscribe(res=>{
        console.log(res);
        this.getAllRule();
    },err=>{
        console.log(err);
    });

  }

  getAllRule() {
    this.ruleService.getAllRule().subscribe(res=>{
        this.ruleList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editRule(rule : Rule) {
    this.ruleDetail.controls['id'].setValue(rule.id);
    this.ruleDetail.controls['name'].setValue(rule.name);
  }

  updateRule() {

    this.ruleObj.id = this.ruleDetail.value.id;
    this.ruleObj.name = this.ruleDetail.value.name;

    this.ruleService.updateRule(this.ruleObj).subscribe(res=>{
      console.log(res);
      this.getAllRule();
    },err=>{
      console.log(err);
    })

  }

  deleteRule(rule : Rule) {

    this.ruleService.deleteRule(rule).subscribe(res=>{
      console.log(res);
      // alert('Rule deleted successfully');
      this.getAllRule();
    },err => {
      console.log(err);
    });

  }


}
