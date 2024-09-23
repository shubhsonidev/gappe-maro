import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = environment.apiUrl;

  private profileData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getProfileInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { withCredentials: true }).pipe(
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
    return this.http.put(`${this.apiUrl}/update`, { fullName, bio, email }, { withCredentials: true });
  }
}
