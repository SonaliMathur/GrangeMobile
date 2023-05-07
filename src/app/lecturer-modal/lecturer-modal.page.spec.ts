import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturerModalPage } from './lecturer-modal.page';

describe('LecturerModalPage', () => {
  let component: LecturerModalPage;
  let fixture: ComponentFixture<LecturerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
