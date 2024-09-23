import { ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { WebSocketService } from "src/app/services/websocket.service";

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
  searchUser: any = "";
  chatMsg?: string;
  searchMob: any;
  searchResult: any;
  chatHistory: any[] = []; // Add this line to store chat history
  currentChatId: string | null = null;
  currentUserId: any;
  currentUser: any;
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private websocketService: WebSocketService
  ) {}
  isOpen: boolean = false;
  profileData: any;
  @ViewChild("messageContainer") private messageContainer!: ElementRef;
  ToggleSideMenu() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {
    this.userService.getProfileInfo().subscribe();
    this.websocketService.connect();
    this.userService.getProfileData().subscribe((data) => {
      this.profileData = data;
      console.log(this.profileData);
      this.currentUserId = this.profileData?.user?._id;
    });
    // Subscribe to WebSocket messages
    this.websocketService.messages$.subscribe((message) => {
      // console.log("Received message:", message); // Log the received message
      if (message.type === "newMessage") {
        this.userService.getProfileInfo().subscribe();
        // this.userService.getProfileData().subscribe((data) => {
        //   this.profileData = data;
        // });
        if (message.from === this.currentChatId) {
          this.websocketService.fetchChatHistory(this.currentChatId!);
        }
      } else if (message.type === "chatHistory") {
        // if (message.to === this.currentChatId) {
        this.chatHistory = message.data;

        console.log("Chat history updated:", this.chatHistory);
        // }
      }
    });
    console.log("shsghs", this.currentChatId);
    this.websocketService.chatHistoryUpdated$.subscribe(() => {
      if (this.currentChatId) {
        setTimeout(() => {
          this.websocketService.fetchChatHistory(this.currentChatId!); // Fetch chat history
        }, 200);
      }
    });
    console.log(this.currentUserId);
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log("Scroll Error:", err);
    }
  }
  checkFriend() {
    if (this.searchMob && this.searchMob.toString().length === 10) {
      if (this.searchMob !== this.searchResult?.user?.foundUser.mobileNumber) {
        this.searchResult = "";
        this.userService.searchFriend(this.searchMob).subscribe(
          (response) => {
            this.searchResult = response;
          },
          (error) => {
            this.searchResult = error.error;
          }
        );
      }
    } else {
      this.toastr.error("Enter valid Number");
    }
  }
  clear() {
    this.searchResult = "";
    this.searchMob = "";
  }
  chatOpen(user: any) {
    if (this.currentUser != user) {
      this.currentUser = user;
      this.currentChatId = user._id;
      console.log(this.currentChatId);
      this.websocketService.fetchChatHistory(user._id);
    }
  }

  sendMessage() {
    if (this.chatMsg) {
      this.websocketService.sendMessage(this.currentChatId!, this.chatMsg);
      this.chatMsg = "";
    }
  }
}
