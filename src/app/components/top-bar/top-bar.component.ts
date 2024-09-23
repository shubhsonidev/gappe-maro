import { Component, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"],
})
export class TopBarComponent {
  data: any;
  emailToggle: any = false;
  bioToggle: any = false;
  nameToggle: any = false;
  emailInput: any = "";
  bioInput: any = "";
  nameInput: any = "";

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit() {
    this.userService.getProfileData().subscribe((data) => {
      this.data = data;
      this.emailInput = data?.user?.email;
      this.bioInput = data?.user?.bio;
      this.nameInput = data?.user?.fullName;
    });
  }
  update() {
    this.userService.update(this.nameInput, this.bioInput, this.emailInput).subscribe(
      (response) => {
        this.userService.getProfileInfo().subscribe();
        this.userService.getProfileData().subscribe((data) => {
          this.data = data;
          this.emailInput = data?.user?.email;
          this.bioInput = data?.user?.bio;
          this.nameInput = data?.user?.fullName;
        });
      },
      (error) => {
        this.toastr.error("Server error:", error);
      }
    );
  }
}
