import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../environments/environment";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = environment.apiUrl;

  private profileData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getProfileInfo(): Observable<any> {
    let token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      authToken: `${token}`,
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers: headers, withCredentials: true }).pipe(
      tap((data) => {
        this.profileData.next(data);
      })
    );
  }

  getProfileData(): Observable<any> {
    return this.profileData.asObservable();
  }

  searchFriend(mobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, { mobileNumber });
  }
  isLoggedIn(): boolean {
    return this.cookieService.check("token");
  }

  update(fullName: string, bio: string, email: string): Observable<any> {
    let token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      authToken: `${token}`,
    });
    return this.http.put(
      `${this.apiUrl}/update`,
      { fullName, bio, email },
      { headers: headers, withCredentials: true }
    );
  }
}
