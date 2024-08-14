import { Component } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("sidebarAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(100%)" }),
        animate("400ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  constructor(private toastr: ToastrService) {}
  isOpen: boolean = false;

  ToggleSideMenu() {
    this.isOpen = !this.isOpen;
  }
}
