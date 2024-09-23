import { Component, Input } from "@angular/core";

@Component({
  selector: "app-rcvd-tile",
  templateUrl: "./rcvd-tile.component.html",
  styleUrls: ["./rcvd-tile.component.scss"],
})
export class RcvdTileComponent {
  @Input() msg: string = "";
  @Input() timestamp: string = "";
}
