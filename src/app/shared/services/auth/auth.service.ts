import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Access } from '@app/core/enums/access';
import { AuthResponse } from '@app/core/interfaces/auth-response.interface';
import { environment } from 'environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private _http: HttpClient, private _router: Router) { }

  isAuthenticated: boolean = false;
  roles: any;
  username!: string | undefined;
  accessToken!: string | undefined;

  public register(body: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${environment.API_URL}/auth/register`, body);
  }

  public login(body: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${environment.API_URL}/auth/authenticate`, body);
  }

  public loadUserProfile(data: AuthResponse) {
    this.isAuthenticated = true;
    this.accessToken = data.token;
    const decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.SCOPE;
    localStorage.setItem("token", JSON.stringify(this.accessToken));
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    localStorage.removeItem("token");
  }

  loadTokenFromSessionStorage() {
    const token = JSON.parse((localStorage.getItem("token") as string));
    if (token) {
      this.loadUserProfile({"token": token});
      // if (this.roles.includes(Access.RECRUITER)) {
      //   this._router.navigate(["/recruiter/jobs"]);
      // }
    }
  }
}
