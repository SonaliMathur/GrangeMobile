import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsInformationPage } from './news-information.page';

describe('NewsInformationPage', () => {
  let component: NewsInformationPage;
  let fixture: ComponentFixture<NewsInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
