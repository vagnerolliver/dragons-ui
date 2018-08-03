import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerService } from '../../services/errorHandler.service';
import { SystemService } from '../system.service';
import { Dragon } from '../model/dragon';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  new: boolean;

  subscription: Subscription;
  routeSubscription: Subscription;

  form: FormGroup;
  dragon: Dragon;

  constructor(
    @Inject(DOCUMENT) public document: any,
    private systemService: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) {
    this.createFormBuilder('constructor');
  }

  ngOnInit() {
    this.document.body.classList.add('page-form');

    this.routeSubscription = this.route.params.subscribe(
      (params) => {
        if ( params['slug'] ) {
          this.systemService.addTitle('Editar Dragões');
          this.systemService.slug = params['slug'];
          this.new = false;
          this.fetchDragon(params['slug']);
        } else {
          this.systemService.addTitle('Cadastrar Dagrões');
          this.new = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.document.body.classList.remove('page-form');
    this.routeSubscription.unsubscribe();
  }

  createFormBuilder(from) {
    this.form =  this.formBuilder.group({
      name: [from === 'subscribe' ? this.dragon.name : ''],
      type: [from === 'subscribe' ? this.dragon.type : ''],
      histories: [from === 'subscribe' ? this.dragon.histories : '']
    });
  }

  fetchDragon(slug): void {
    this.subscription = this.systemService.getDragon(slug).subscribe(
      (data: any) => {
        this.dragon = data;
        this.createFormBuilder('subscribe');
      },
      error => this.toastr.error(this.errorHandler.messageTo(error), 'Formulário Dragões')
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

      if (this.new) {
        this.systemService.sendDragonInformation('new', formData).subscribe(
          resp => {
            this.toastr.success('Adicionado com Sucesso!', `Dragon ${name}`);
            this.systemService.reloadList();
            this.reset();
          },
          error => this.toastr.error(this.errorHandler.messageTo(error), 'Formulário Dragões')
        );
      } else {
        this.systemService.sendDragonInformation('update', formData).subscribe(
          resp => {
            this.toastr.success('Atualizado com Sucesso!', `Dragão ${name}`);
            this.systemService.reloadList();
          },
          error => this.toastr.error(this.errorHandler.messageTo(error), 'Formulário Dragões')
        );
      }
    } else {
      this.validateAllFormFields(this.form);
    }
  }
}
