import { FlexiRoute } from "./FlexiRoute";
import { FlexiSegment } from "./FlexiSegment";

export class FlexiRouter{
    flexiRouteArr: Array<FlexiRoute>;
    preferences: any;
    origin: any;
    destn: any;
    // TODO: replace static data with live data
    staticSegments: any;
    staticRouteInfo: any;
    constructor(origin, destn, preferences){
        (this.preferences as any) = new Object(preferences);
        (this.origin as any) = new Object(origin);
        (this.destn as any) = new Object(destn);
        this.flexiRouteArr = new Array();
        (this.staticSegments as any) = new Array(
           
                [//Route Fastest Public Only
                    {
                        origin: {lat:38.958731,lon:-77.356947},
                        destn: {lat:38.853895,lon:-77.049237},
                        mode:'transit',
                        avoidTolls:'false'
                    }
                ],
                [//Fastest Low Cost
                    {
                        origin: {lat:38.958731,lon:-77.356947},
                        destn: {lat:38.959571,lon:-77.357274},
                        mode:'walking',
                        avoidTolls:'false'
                    },
                    {
                        destn: {lat:38.84401,lon:-77.052395},
                        origin: {lat:38.959571,lon:-77.357274},
                        mode:'driving',
                        avoidTolls:'false'
                    },
                    {
                        origin: {lat:38.84401,lon:-77.052395},
                        destn: {lat:38.842832,lon:-77.050174},
                        mode:'walking',
                        avoidTolls:'false'
                    },
                    {
                        destn: {lat:38.853303,lon:-77.049611},
                        origin: {lat:38.842832,lon:-77.050174},
                        mode:'bicycling',
                        avoidTolls:'false'
                    },
                    {
                        origin: {lat:38.853303,lon:-77.049611},
                        destn: {lat:38.853895,lon:-77.049237},
                        mode:'walking',
                        avoidTolls:'false'
                    }
                ],
                [ // Most Calories Public
                    {
                        origin: {lat:38.958731,lon:-77.356947},
                        destn: {lat:38.957225,lon:-77.358128},
                        mode:'walking',
                        avoidTolls:'false'
                    },
                    {
                        destn: {lat:38.948259,lon:-77.338089},
                        origin: {lat:38.957225,lon:-77.358128},
                        mode:'bicycling',
                        avoidTolls:'false'
                    },
                    {
                        origin: {lat:38.948259,lon:-77.338089},
                        destn: {lat:38.894618,lon:-77.072233},
                        mode:'transit',
                        avoidTolls:'false'
                    },
                    {
                        destn: {lat:38.853303,lon:-77.049611},
                        origin: {lat:38.894618,lon:-77.072233},
                        mode:'bicycling',
                        avoidTolls:'false'
                    },
                    {
                        origin: {lat:38.853303,lon:-77.049611},
                        destn: {lat:38.853895,lon:-77.049237},
                        mode:'walking',
                        avoidTolls:'false'
                    }
                ],
                [ // Fastest Most Calories
                    {
                        origin: {lat:38.958731,lon:-77.356947},
                        destn: {lat:38.959571,lon:-77.357274},
                        mode:'walking',
                        avoidTolls:'false'
                    },
                    {
                        destn: {lat:38.897688,lon:-77.070637},
                        origin: {lat:38.959571,lon:-77.357274},
                        mode:'drivnig',
                        avoidTolls:'false'
                    },
                    {
                        origin: {lat:38.897688,lon:-77.070637},
                        destn: {lat:38.894618,lon:-77.072233},
                        mode:'walking',
                        avoidTolls:'false'
                    },
                    {
                        destn: {lat:38.853303,lon:-77.049611},
                        origin: {lat:38.894618,lon:-77.072233},
                        mode:'bicycling',
                        avoidTolls:'false'
                    },
                    {
                        origin: {lat:38.853303,lon:-77.049611},
                        destn: {lat:38.853895,lon:-77.049237},
                        mode:'walking',
                        avoidTolls:'false'
                    }
                ]
            );
        (this.staticRouteInfo as any) = new Array(
        
         {
             cost: 46.41600772175743,
             time: 1832.0,
             safetyFactor: 0.83,
             cal: 43.467558666666676
         },
         {
            cost: 41.0056143368145,
            time: 1954.0,
            safetyFactor: 1.0,
            cal: 46.36223233333333
         },
         {
            cost: 12.3,
            time: 4991.0,
            safetyFactor: 0.06,
            cal: 128.8807789
         },
         {
            cost: 27.641362051668548,
            time: 2667.0,
            safetyFactor: 0.82,
            cal: 47505.65533708407
         },
         {
            cost: 14.0,
            time: 4591.0,
            safetyFactor: 0.05,
            cal: 365471.9203350617
         },
         {
            cost: 35.30668595045428,
            time: 3774.0,
            safetyFactor: 0.8,
            cal: 280243.4371326531
         }
        
    );
        }
    route(){
     // fill the flexiRouteArr with possible routes, each route has a list of segments.
     this.getFlexiAlternatives();
     // run optimizer and sort the array by rank.
     // return list of rankedroutes.
    }
    getFlexiAlternatives(){
        // get Google base alternatives
        for (let i =0; i<2; i++){
            let flexiRoute = new FlexiRoute();
            flexiRoute.id = i;
            flexiRoute.flexiSegmentArr.push(new FlexiSegment(this.origin, this.destn, 'driving','false','true',i));
            flexiRoute.cost = this.staticRouteInfo[i].cost;
            flexiRoute.time = this.staticRouteInfo[i].time;
            flexiRoute.cal = this.staticRouteInfo[i].cal;
            flexiRoute.safetyFactor = this.staticRouteInfo[i].safetyFactor;
            
            this.flexiRouteArr.push(flexiRoute);
        }
        // get Flexi alternatives
        for (let i =0; i<3; i++) {
            let flexiRoute = new FlexiRoute();
            let k = i+2;
            for (let j =0; j<this.staticSegments[i].length; j++)
            {
                let segment = this.staticSegments[i][j];
                flexiRoute.flexiSegmentArr.push(new FlexiSegment(segment.origin, segment.destn, segment.mode,segment.avoidTolls,'false',0));
            }
            flexiRoute.cost = this.staticRouteInfo[k].cost;
            flexiRoute.time = this.staticRouteInfo[k].time;
            flexiRoute.cal = this.staticRouteInfo[k].cal;
            flexiRoute.safetyFactor = this.staticRouteInfo[k].safetyFactor;
            this.flexiRouteArr.push(flexiRoute);
        }
    }
}