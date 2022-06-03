import { TestBed } from '@angular/core/testing';
import { ScriptDetailService } from './script-detail.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import exp = require('constants');

describe('script detail testing',()=>{
    let service:ScriptDetailService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [RouterTestingModule,HttpClientTestingModule],providers:[BggSearchService]});
        service = TestBed.inject(ScriptDetailService);
    })
})