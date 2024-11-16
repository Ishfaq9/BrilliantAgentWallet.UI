import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegularModule } from './shared/modules/regular.module';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { RouteHelperService } from './shared/helpers/route-helper.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'BrilliantAgentWallet.UI';
  isHandset$!: boolean;
  constructor(private routeHelperService: RouteHelperService, private breakpointObserver: BreakpointObserver){}
  
  ngOnInit(): void {
     this.NgAfterViewInit();
    // if(this.isHandset$)
    // {
    //   this.routeHelperService.SetPopState();
    // }
    this.routeHelperService.SetPopState();
  }

  NgAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe((state) => {
      if (state.matches) {
        this.isHandset$ = state.matches;
      }
    });
  }
}
