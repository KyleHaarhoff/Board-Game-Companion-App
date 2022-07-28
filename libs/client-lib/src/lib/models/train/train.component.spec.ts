// describe('Test editor',()=>{
//   it('testing testing',()=>{
//     expect("1").toBe("1");
//   })
// })

// describe('Test editor',()=>{
//   it('testing testing',()=>{
//     expect("1").toBe("1");
//   })
// })

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainComponent } from './train.component';
import { ModelsService } from '../../shared/services/models/models.service';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BggSearchService } from '../../services/bgg-search/bgg-search.service';
import { OAuthModule } from 'angular-oauth2-oidc';
describe('TrainComponent', () => {
  let component: TrainComponent;
  //let modService: ModelsService;
  let fixture: ComponentFixture<TrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule,OAuthModule.forRoot()],
      declarations: [TrainComponent],
      providers:[ModelsService]
    }).compileComponents(); 
    //check if component created
    fixture = TestBed.createComponent(TrainComponent);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change tab', () => {
    // expect(component).toBeTruthy();
    component.changeTab(1);
    expect(component.tab).toEqual(1);

    component.changeTab(0);
    expect(component.tab).toEqual(0);
  });

  // it('should create a model', () =>{
  //   component.createModel();
  //   expect(component.createModel).toHaveReturned;
  // })

  it('should change tab', () => {
    // expect(component).toBeTruthy();
    component.changeTab(1);
    expect(component.tab).toEqual(1);

    component.changeTab(0);
    expect(component.tab).toEqual(0);
  });

  // it('should load data', () => {
  //   expect(component.form.valid).toBeFalsy();

  //   const fileList = { target: {files: [{ name:"testing.js", size: 64, type:"text/javascript"}]} };
  //   component.loadData(fileList);
  //   expect(component.data.length).toBeGreaterThan(0);
    
  // });

  // it ('should check percentage', () =>{
  //     component.checkTrainingDataPercentage();
  //     expect(component.trainingData).toEqual(50);

  //     component.checkTrainingDataPercentage();
  //     expect(component.trainingData).toEqual();
  // });
});

