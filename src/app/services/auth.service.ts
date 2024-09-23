import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loginWithPhoneNumber(mobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/generateOtp`, { mobileNumber });
  }

  verifyOtp(mobileNumber: string, otpRcvd: string, fullName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { fullName, mobileNumber, otpRcvd });
  }

  setTokenCookie(token: string) {
    document.cookie = `token=${token};`;
    localStorage.setItem("token", token);
  }
}
