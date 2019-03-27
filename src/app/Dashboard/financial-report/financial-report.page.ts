import { Component, OnInit,ViewChild, ElementRef,AfterViewInit  } from '@angular/core';
import { Chart } from 'chart.js';
import {Router,ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.page.html',
  styleUrls: ['./financial-report.page.scss'],
})
export class FinancialReportPage implements OnInit {
 


  @ViewChild('doughnutCanvas') doughnutCanvas : ElementRef;
  doughnutChart: any;
  parameters:any;
  public financialReport = {
    data:null,
    loaded:false
  }
  constructor(private route:ActivatedRoute,
    private router:Router,
    private http:HttpService,
    private authService:AuthenticationServiceService,
    private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService) { 
  this.getId();
  this.getMonthlyReport();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

   

  }

  getId()
  {
    this.route.params.subscribe(
      params=> this.parameters = params
    );
    return this.parameters.id;
  }

  

  loadPieChart()
  {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
    },
      data: {
          labels: [" salary remaining in pecentage", "salary deducted in percentage"],
          
          datasets: [{
              label: '%',
              data: [this.financialReport.data.data.salary_percentage_remainder, this.financialReport.data.data.fine_percentage],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.99)',
                  'rgba(54, 162, 235, 0.99)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }]
      }

  });
 
  

  }

  async getMonthlyReport()
  {
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'financial details loading..',spinner:'bubbles' })
      loading.present().then(()=>{
        this.http.getData("/admin/monthly-balance/"+this.parameters.id,token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
        this.financialReport.data = subscribed_data;
        this.financialReport.loaded = true;
        this.loadPieChart();
        loading.dismiss();
        },
        error =>{
          loading.dismiss();
          console.log(error);
          this.financialReport.loaded = true;
         this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
  
        }
        
        
        )
   
      })
       
    });
  
  }






}


