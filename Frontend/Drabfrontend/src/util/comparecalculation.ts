import { Weatherstation } from "../types";

export const compareCalulation = (weatherStation1: Weatherstation, weatherStation2: Weatherstation) => {

    const longDiff =  Math.round((weatherStation1.longitude - weatherStation2.longitude) * 100) / 100;
    const latDiff = Math.round((weatherStation1.latitude - weatherStation2.latitude) * 100) / 100;
    const elDiff = Math.round((weatherStation1.elevation - weatherStation2.elevation) * 100) / 100;

    const avgTempW1 = weatherStation1.weatherdatas.reduce((acc, curr) => acc + Number(curr.temp), 0) / weatherStation1.weatherdatas.length;
    const avgTempW2 = weatherStation2.weatherdatas.reduce((acc, curr) => acc + Number(curr.temp), 0) / weatherStation2.weatherdatas.length;
    const tempDiff = Math.round((avgTempW1 - avgTempW2) * 100) / 100;
    return{
        longDiff: longDiff.toString(),
        latDiff: latDiff.toString(),
        elDiff: elDiff.toString(),
        tempDiff: tempDiff.toString(),
    }
}