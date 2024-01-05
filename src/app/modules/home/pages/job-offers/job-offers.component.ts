import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from '@app/core/models/job-offer';
import { JobOfferService } from '@app/shared/services/job-offer/job-offer.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.less']
})
export class JobOffersComponent implements OnInit {
  constructor(private _jobOfferService: JobOfferService, private _activatedRoute: ActivatedRoute) {}

  jobOffers!: JobOffer[];
  jobOffer!: JobOffer;

  ngOnInit(): void {
    this.getAllJobOffers();
    this._activatedRoute.params.subscribe({
      next: ({id}) => {
        id && this.getJobOffer(id);
      },
      error: (error) => {console.log(error);
      }
    })
  }

  getAllJobOffers() {
    this._jobOfferService.readAll().subscribe({
      next: ({content}: any) => {
        console.log(content);
        
        this.jobOffers = content;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })
  }

  getJobOffer(id: string) {
    if (id !== null) {
      this._jobOfferService.readOne(id).subscribe({
        next: (res) => {
          this.jobOffer = res;
        },
        error: (error) => {console.log(error);
        }
      });
    }
  }
}
