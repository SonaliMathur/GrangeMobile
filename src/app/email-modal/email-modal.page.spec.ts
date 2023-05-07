import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailModalPage } from './email-modal.page';

describe('EmailModalPage', () => {
  let component: EmailModalPage;
  let fixture: ComponentFixture<EmailModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
