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

  reset() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid ) { 
      const formData = this.form.value;

      if ( this.page === 'new') {
        this.systemService.sendDragonInformation('new', formData).subscribe(
              (resp) => {  
                this.toastr.success('Add Success!', 'Dragons');
                this.systemService.reloadList();
              },
              (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
            );
      } else {
        this.systemService.sendDragonInformation('update', formData).subscribe(
          (resp) => {  
            this.toastr.success('Update Success!', 'Dragons');
            this.systemService.reloadList();
          },
          (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
        );
      }
    }
  }
}
