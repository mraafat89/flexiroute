import { FlexiRoute } from "./FlexiRoute";

export class FlexiRouter{
    flexiRouteArr: Array<FlexiRoute>;
    preferences: 
    {
        time:number;
        cost: number;
        cal: number;
        safety: number;
    }
    constructor(origin, destn, preferences){
        window.alert(preferences.time);
    }
    route(){
     //window.alert(this.origin.lat);
    }
}