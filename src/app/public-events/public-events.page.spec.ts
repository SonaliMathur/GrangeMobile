import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicEventsPage } from './public-events.page';

describe('PublicEventsPage', () => {
  let component: PublicEventsPage;
  let fixture: ComponentFixture<PublicEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicEventsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
