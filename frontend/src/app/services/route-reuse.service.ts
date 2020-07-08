import { Injectable } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteReuseService implements RouteReuseStrategy {
  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  allowRetrieveCache = {
    'index': true
  };

  shouldReuseRoute(before: ActivatedRouteSnapshot, curr:  ActivatedRouteSnapshot): boolean {
    if (this.getPath(before) === 'test/:id' && this.getPath(curr) === 'index') {
      this.allowRetrieveCache['index'] = true;
    } else {
      this.allowRetrieveCache['index'] = false;
    }
    return before.routeConfig === curr.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetrieveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }
    return false;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetrieveCache.hasOwnProperty(path)) {
      return true;
    }
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }

  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
      return route.routeConfig.path;
    }
    return '';
  }
}
