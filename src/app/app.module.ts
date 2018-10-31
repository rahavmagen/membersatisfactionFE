import { SaveQuestionService } from './services/save-question.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule } from 'primeng/button';
 import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import { QuickFeedbackComponent } from './quick-feedback/quick-feedback.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { QuickfeedbackService } from './services/quickfeedback.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import {ConfirmationService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {CategoriesComponent } from './categories/categories.component';
import {GetCategoriesService } from './services/get-categories.service';
import {SaveCategoryService } from './services/save-category.service';
import {TableModule} from 'primeng/table';
import { QuestionsComponent } from './questions/questions.component';
import { PossibleAnswersComponent } from './possible-answers/possible-answers.component';
import { LogoComponent } from './logo/logo.component';
import {DatePipe} from '@angular/common';
import { SavePossibleAnswerService } from './services/save-possible-answer.service';
import { ExpireCategoryService } from './services/expire-category.service';
import { ExpireQuestionService } from './services/expire-question.service';
import { ExpireAnswerService } from './services/expire-answer.service';
import { DetailedFeedbackComponent } from './detailed-feedback/detailed-feedback.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import { TabsComponent } from './tabs/tabs.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DisplayAnswersComponent } from './display-answers/display-answers.component';
import {PanelModule} from 'primeng/panel';
import { ThankyouComponent } from './thankyou/thankyou.component';
import {ListboxModule} from 'primeng/listbox';
import { SmalllogoComponent } from './smalllogo/smalllogo.component';
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetQuickFeedbackService } from './services/get-quick-feedback.service';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {GetDashboardFromDateService} from './services/get-dashboard-from-date.service';
import {PanelMenuModule} from 'primeng/panelmenu';
import { GetEffectiveCategoriesService } from './services/get-effective-categories.service';
import {CheckboxModule} from 'primeng/checkbox';
import { Observable } from 'rxjs';
import {  SharedModule } from 'primeng/primeng';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    QuickFeedbackComponent,
    NewRegistrationComponent,
    CategoriesComponent,
    QuestionsComponent,
    PossibleAnswersComponent,
    LogoComponent,
    DetailedFeedbackComponent,
    TabsComponent,
    DisplayAnswersComponent,
    ThankyouComponent,
    SmalllogoComponent,
    TestComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    DialogModule,
    TableModule,
    PanelModule,
    ProgressSpinnerModule,
    ListboxModule,
    CalendarModule,
    ToastModule,
    PanelMenuModule,
    CheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    RadioButtonModule,
    TabMenuModule,
    TabViewModule,
    DropdownModule,
    NgxSpinnerModule,
       ],
  providers: [QuickfeedbackService , ConfirmationService , GetCategoriesService , DatePipe , SaveCategoryService , ExpireCategoryService ,
     SaveQuestionService, SavePossibleAnswerService , ExpireQuestionService , ExpireAnswerService , GetQuickFeedbackService , GetDashboardFromDateService,
     GetEffectiveCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
