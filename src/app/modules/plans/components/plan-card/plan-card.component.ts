import { Component, Input } from '@angular/core';
import { Pack } from '@app/core/models/pack';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.less']
})
export class PlanCardComponent {
  @Input() pack!: Pack;

  sayHi = () => {
    console.log("hi");
  }
}
