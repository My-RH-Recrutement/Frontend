import { Component, OnInit } from '@angular/core';
import { JobOfferService } from '@app/shared/services/job-offer/job-offer.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.less']
})
export class JobsListComponent implements OnInit {

  constructor(private _jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.getAllJobOffers();
  }

  getAllJobOffers() {
    this._jobOfferService.readAll().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

}
