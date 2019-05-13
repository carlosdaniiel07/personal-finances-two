import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

import { AuthService } from './auth.service'

@Injectable()
export class RouteGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.authService.isAuthenticated()){
			return true
		} else {
			this.router.navigateByUrl('/login')
			return false
		}
	}
}