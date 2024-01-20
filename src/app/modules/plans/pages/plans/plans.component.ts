import { Component, OnInit } from '@angular/core';
import { Pack } from '@app/core/models/pack';
import { PackService } from '@app/shared/services/pack/pack.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less']
})
export class PlansComponent{

  packs!: Pack[];

  constructor(private _packService: PackService) {}
  
  ngOnInit(): void {
    this._packService.getAllPacks().subscribe({
      next: (response) => {
        console.log(response);
        
        this.packs = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })
  }


}
