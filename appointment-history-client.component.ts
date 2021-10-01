/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-appointment-history-client',
  templateUrl: './appointment-history-client.component.html',
  styleUrls: ['./appointment-history-client.component.css']
})
export class AppointmentHistoryClientComponent implements OnInit {

  id: number = 0;
  appointments: Appointment[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadDataAppointments();
  }

  loadDataAppointments(){
    this.appointmentService.getAppointmentByClient(this.id)
    .subscribe(datos=>{
      console.log(datos)
      this.appointments = datos;
    }, error=>console.log(error));
  }

  viewDiet(appointment: Appointment){
    this.router.navigate(['list-diet', appointment.id])
  }

  return(){
    this.router.navigate(['menu', this.id]);
  }
}*/
