import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./screens/login/login.component";
import { OtpComponent } from "./screens/otp/otp.component";
import { HomeComponent } from "./screens/home/home.component";
import { AuthGuard } from "./auth.guard";
import { NoAuthGuard } from "./noauth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "otp", component: OtpComponent, canActivate: [NoAuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
