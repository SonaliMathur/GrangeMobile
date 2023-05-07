import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeletestudentPage } from './deletestudent.page';

describe('DeletestudentPage', () => {
  let component: DeletestudentPage;
  let fixture: ComponentFixture<DeletestudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletestudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeletestudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
