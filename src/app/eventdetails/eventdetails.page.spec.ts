import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventdetailsPage } from './eventdetails.page';

describe('EventdetailsPage', () => {
  let component: EventdetailsPage;
  let fixture: ComponentFixture<EventdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
