import { Component, Input } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { WebSocketService } from "src/app/services/websocket.service";

@Component({
  selector: "app-checked-cont",
  templateUrl: "./checked-cont.component.html",
  styleUrls: ["./checked-cont.component.scss"],
})
export class CheckedContComponent {
  @Input() searchData: any;

  constructor(private userService: UserService, private websocketService: WebSocketService) {}

  sendHii(recipient: any) {
    this.websocketService.sendMessage(recipient, "Hii");
    setTimeout(() => {
      this.userService.getProfileInfo().subscribe();
    }, 200);
  }
}
