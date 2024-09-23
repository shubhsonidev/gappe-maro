import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user-tile",
  templateUrl: "./user-tile.component.html",
  styleUrls: ["./user-tile.component.scss"],
})
export class UserTileComponent {
  @Input() data: any;
}
