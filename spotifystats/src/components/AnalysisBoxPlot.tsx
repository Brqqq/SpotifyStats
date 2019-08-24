import React from "react";
import { AudioFeatures } from "../models/models";
import { VictoryChart, VictoryBoxPlot} from "victory";

const getPlotData = (prop: keyof AudioFeatures, audioFeatures: AudioFeatures[]) => {
    return { x: prop, y: audioFeatures.map(audioFeature => audioFeature[prop]) };
}


export default (props: { audioFeatures: AudioFeatures[] }) => {
    
    const measuredProps = ["danceability", "acousticness", "energy", "liveness", "speechiness", "valence"] as Array<keyof AudioFeatures>
    
    const allPlotData = measuredProps.map(prop => getPlotData(prop, props.audioFeatures));

    return <VictoryChart domainPadding={10} width={800} height={300}>
        <VictoryBoxPlot 
            
            boxWidth={10}
            whiskerWidth={5}
            data={allPlotData}
        />
    </VictoryChart>
}