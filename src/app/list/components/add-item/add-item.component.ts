import { IItem } from './../../models/list.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { tap } from 'rxjs/operators';



@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    private emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    public form = new FormGroup({
        name: new FormControl(['', Validators.required]),
        username: new FormControl(['', Validators.required]),
        email: new FormControl(['', Validators.required, Validators.pattern(new RegExp(this.emailRegex))]),

        address: new FormGroup({
            street: new FormControl(['']),
            suite: new FormControl(['']),
            city: new FormControl(['']),
            zipcode: new FormControl(['']),

            geo: new FormGroup({
                lat: new FormControl(['']),
                lng: new FormControl([''])
            })
        }),

        company: new FormGroup({
            name: new FormControl(['']),
            catchPhrase: new FormControl(['']),
            bs: new FormControl([''])
        })
    });

    constructor(
        private listService: ListService
    ) { }

    ngOnInit() {
    }

    submitForm() {
        const formIsValid = this.form.valid;
        if (!formIsValid) {
            for (const i of Object.keys(this.form.controls)) {
                this.form.controls[i].markAsTouched();
            }
        } else {
            this.listService.addItem(
                <IItem>{
                    id: Math.random().toString(),
                    name: this.form.controls.name.value,
                    username: this.form.controls.username.value,
                    email: this.form.controls.email.value,
                    phone:  this.form.controls.phone.value,
                    website:  this.form.controls.website.value,
                    company: {},
                    address: {}
                }
            ).pipe(
                tap((response) => console.log(response))
            ).subscribe((response) => {
                console.log(response);
            });
        }
    }

}
