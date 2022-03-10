import { userActionTypes } from './../../store/actions/user.actions';
import { getAllUsers } from './../../store/selectors/user.selectors';
import { State } from './../../store/reducers/index';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Update } from '@ngrx/entity';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  modalRef?: BsModalRef;
  users$: Observable<User[]>;

  userToBeUpdated: User;

  isUpdateActivated = false;

  constructor( private store: Store<State>,private modalService: BsModalService) { }

  ngOnInit() {
    this.users$ = this.store.select(getAllUsers);
  }

  deleteUser(userId: string) {
    this.store.dispatch(userActionTypes.deleteUser({userId}));
  }

  showUpdateForm(user: User) {
    this.userToBeUpdated = {...user};
    this.isUpdateActivated = true;
  }

  updateUser(updateForm:any) {
    const update: Update<User> = {
      id: this.userToBeUpdated.id,
      changes: {
        ...this.userToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(userActionTypes.updateUser({update}));

    this.isUpdateActivated = false;
    // this.userToBeUpdated = null;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
