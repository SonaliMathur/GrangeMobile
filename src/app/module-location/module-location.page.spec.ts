import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModuleLocationPage } from './module-location.page';

describe('ModuleLocationPage', () => {
  let component: ModuleLocationPage;
  let fixture: ComponentFixture<ModuleLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
