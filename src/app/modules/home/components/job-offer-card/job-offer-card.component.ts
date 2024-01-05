import { Component, Input } from '@angular/core';
import { JobOffer } from '@app/core/models/job-offer';

@Component({
  selector: 'app-job-offer-card',
  templateUrl: './job-offer-card.component.html',
  styleUrls: ['./job-offer-card.component.less']
})
export class JobOfferCardComponent {
  @Input() offer!: any;
}
