import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksModule } from './tasks/tasks.module';
import { CalendarModule } from './calendar/calendar.module';
import { TaskService } from './tasks/task.service';
import { GlobalErrorHandler } from './GlobalErrorHandler';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule,
    CalendarModule
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
