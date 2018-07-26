import { FlexiSegment } from "./FlexiSegment";
export class FlexiRoute {
    // TODO: remove parameters
    id: number;
    cost: number;
    cal: number;
    safetyFactor: number;
    time: number;
    // array of consecutive segments
    flexiSegmentArr: Array<FlexiSegment>;
    // score used for ranking
    score: number;
    constructor(){
        this.flexiSegmentArr = new Array();
        this.score = 0;
        this.cost = 0;
        this.safetyFactor = 0;
        this.time = 0;
        this.cal =0;
    }
    // TODO: remove set parameters
    setParams(time, cost, cal, safetyFactor) {
        this.cost = cost;
        this.safetyFactor = safetyFactor;
        this.time = time;
        this.cal = cal;
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