import { Time } from "../../node_modules/@angular/common";

export class FlexiSegment {
    // starting point
    origin :{lat:string, lon: string};
    // ending point
    destn: {lat:string, lon: string};
    // mode of transportation: Drivin, walking, bicycling, ... etc
    mode: string;
    // cost of the segment
    cost: number;
    // duration of the segment
    duration: number;
    // calories burned during the segment in joles
    cal: number;
    // safety factor of the segment
    safetyFactor: number;
    // avoid tolls or not
    avoidTolls: string;
    // avoid highways or not
    avoidHighways: string;
    // start time of the segment
    startTime: Time;
    // alternatives or not
    alternative: string;
    // index of the alternative that google maps gives
    alternativeIdx: number;
    // distance
    distance: number;
    constructor(origin, destn, mode, avoidTolls, alternative, alternativeIdx){
        this.origin = origin;
        this.destn = destn;
        this.avoidTolls = avoidTolls;
        this.alternative = alternative;
        this.alternativeIdx = alternativeIdx;
        this.mode = mode;
    }
    // temporaty setters
    setCost(cost){
        this.cost = cost;
    }
    setCal(cal){
        this.cal = cal;
    }
    setSafetyFactor(safetyFactor){
        this.safetyFactor = safetyFactor;
    }

    getCost(){
        return this.cost;
    }
    getCal(){
        return this.cal;
    }
    getSafetyFactor(){
        return this.safetyFactor;
    }
}
