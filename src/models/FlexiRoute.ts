import { FlexiSegment } from "./FlexiSegment";
import { Time } from "../../node_modules/@angular/common";
export class FlexiRoute {
    // array of consecutive segments
    flexiSegmentArr: Array<FlexiSegment>;
    // starting point
    origin :{lat:string, lon: string};
    // ending point
    dstn: {lat:string, lon: string};

    constructor(){

    }

    // return the sum of the costs in each segment
    getCost(){
        let cost: number;
        this.flexiSegmentArr.forEach(function (segment){
            cost+= segment.getCost();
        });
        return cost;
    }
    // return the sum of the calories in each segment
    getCal(){
        let cal: number;
        this.flexiSegmentArr.forEach(function (segment){
            cal+= segment.getCal();
        });
        return cal;
    }
    // return the average of the safety factors in each segment
    getSafetyFactor(){ 
        let safetyFactor: number;
        this.flexiSegmentArr.forEach(function (segment){
            safetyFactor+= segment.getSafetyFactor();
        });
        safetyFactor = safetyFactor/this.flexiSegmentArr.length;
        return safetyFactor;
    }
}