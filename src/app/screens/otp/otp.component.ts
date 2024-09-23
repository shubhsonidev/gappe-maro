import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, ChangeDetectorRef } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.scss"],
})
export class OtpComponent {
  mobileNumber: any;
  otp: string = "";
  isExist: any;
  name: string = "";

  constructor(
    private authService: AuthService,
    private Router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const existParam = this.route.snapshot.queryParamMap.get("Exist");
    this.isExist = existParam === "true";
    this.mobileNumber = this.route.snapshot.queryParamMap.get("mobileNumber");
    this.cdRef.detectChanges();
  }

  verifyOtp() {
    if (
      (this.isExist === true && this.otp.toString().length === 6) ||
      (this.isExist === false && this.otp.toString().length === 6 && this.name)
    ) {
      this.authService.verifyOtp(this.mobileNumber, this.otp, this.name).subscribe({
        next: (response) => {
          this.toastr.success("Logged in successfully");

          this.Router.navigate(["/home"]);
          this.authService.setTokenCookie(response.token);
        },
        error: (error) => {
          this.toastr.error("Invalid OTP");
        },
      });
    } else if (this.isExist === false && !this.name) {
      this.toastr.error("Enter fullName");
    } else {
      this.toastr.error("Enter 6 digit OTP");
    }
  }
}
