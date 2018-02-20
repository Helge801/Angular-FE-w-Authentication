import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:56605/'
  constructor(private http: HttpClient) { }

  registerUser(user : User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body);
  }

  userAuthentication(userName,password){
    var data = "username="+userName+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.http.post(this.rootUrl+'/token',data,{headers: reqHeader});
  }

  getUserClaims(){
    return this.http.get(this.rootUrl+'/api/GetUserClaims',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
  }
}
