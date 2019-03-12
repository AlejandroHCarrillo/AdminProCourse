import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modules
import { PagesModule } from './pages/pages.module';

// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// import { IncrementadorComponent } from './components/incrementador/incrementador.component';
// import { SettingsService } from './services/service.index';

// Servicios agrupados
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    // ,    IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
