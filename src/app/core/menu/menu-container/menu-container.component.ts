import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})
export class MenuContainerComponent implements OnInit {

  menuFlag: boolean;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.toggleMenuFlag.subscribe(
      (flag: boolean) => {
        this.menuFlag = flag;
      }
    );
  }

  onCloseMenu() {
    this.sharedService.toggleMenu(false);
  }

}
