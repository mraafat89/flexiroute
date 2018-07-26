import { Time } from "../../node_modules/@angular/common";

export class FlexiSegment {
    // starting point
    origin :{lat:string, lon: string};
    // ending point
    dstn: {lat:string, lon: string};
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
    avoidTolls: boolean;
    // avoid highways or not
    avoidHighways: boolean;
    // start time of the segment
    startTime: Time;

    constructor(){

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
