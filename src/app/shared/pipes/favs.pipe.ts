import { Pipe, PipeTransform } from '@angular/core';
import { Fav } from '../../core/interfaces/fav';
import { User } from '../../core/interfaces/user';

@Pipe({
  name: 'favs'
})
export class FavsPipe implements PipeTransform {

  transform(users: User[]| null, favs: Fav[]|null): User[] {
    let _users = [...users??[]];
    _users = _users.map(u=>{
      return {
        id:u.id,
        name:u.name,
        surname:u.surname,
        age:u.age,
        fav:favs?.reduce((p,f)=>p || f.userId==u.id, false)??false
      }     
    })
    return _users;
  }

}
