import { Component, Input } from "@angular/core";

@Component({
  selector: "app-sent-tile",
  templateUrl: "./sent-tile.component.html",
  styleUrls: ["./sent-tile.component.scss"],
})
export class SentTileComponent {
  @Input() msg: string = "";
  @Input() timestamp: string = "";

  time(timeData: any) {
    return;
  }
}
