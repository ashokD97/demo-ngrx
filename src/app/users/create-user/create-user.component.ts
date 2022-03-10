import { createUser } from './../../store/actions/user.actions';
import { State } from './../../store/reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../model/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  
  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onSubmit(submittedForm:any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const user: User = {id: (Date.now()).toExponential.toString(), name: submittedForm.value.name, email: submittedForm.value.email, mobile: submittedForm.value.mobile};
    this.store.dispatch(createUser({user}));

  }
}
