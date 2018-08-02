import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../../services/errorHandler.service';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  page: string;
  
  subscription: Subscription;
  routeSubscription: Subscription; 

  form: FormGroup;
  dragon: any = {};

  constructor(
    private systemService: SystemService, 
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) { 
    this.createFormBuilder();
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params) => {
        if ( params['slug'] ) {
          this.page = 'update';
          this.systemService.slug = params['slug']; 
          this.systemService.addTitle('Editar Dragon');
          this.fetchDragon(params['slug']);
        } else {
          this.systemService.addTitle('New Dragon');
          this.page = 'new'; 
          this.createFormBuilder();
        }
      }
    );
  }

  createFormBuilder() {
    this.form =  this.formBuilder.group({
       name:  [this.dragon.name ? this.dragon.name : ''],
       type:  [this.dragon.type ? this.dragon.type : ''],
       histories: [this.dragon.histories ? this.dragon.histories : ''],
    });
  }

  fetchDragon(slug): void {
    this.subscription = this.systemService.getDragon(slug).subscribe(
        (data: any) => {
          this.dragon = data; 
          this.createFormBuilder();
         },
        err => console.info(err)
    );
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
      return {
          'has-error': this.isFieldValid(field),
          'has-feedback': this.isFieldValid(field)
      };
  }

  validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
              control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
              this.validateAllFormFields(control);
          }
      });
  }

  reset() {
    this.form.reset();
  }
  
  onSubmit() {
    if (this.form.valid ) { 
      const formData = this.form.value;
      const name = this.form.value.name;
      if ( this.page === 'new') {
        this.systemService.sendDragonInformation('new', formData).subscribe(
              (resp) => {   
                this.toastr.success('Adicionado com Sucesso!', `Dragão ${name}`);
                this.reset();
                this.systemService.reloadList();
              },
              (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
            );
      } else {
        this.systemService.sendDragonInformation('update', formData).subscribe(
          (resp) => {  
            this.toastr.success('Atualizado com Sucesso!', `Dragão ${name}`);
            this.systemService.reloadList();
          },
          (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
        );
      }
    } else {
      this.validateAllFormFields(this.form);
    }
  }
}
