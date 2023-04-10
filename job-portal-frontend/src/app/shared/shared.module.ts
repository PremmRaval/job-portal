import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RelativeTimePipe } from './pipes/relative-time.pipe';

@NgModule({
  declarations: [LayoutComponent, RelativeTimePipe],
  imports: [
    CommonModule,
    MaterialModule,
    SharedRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [MaterialModule, LayoutComponent, RelativeTimePipe],
})
export class SharedModule {}
