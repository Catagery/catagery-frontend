import React, {useLayoutEffect} from 'react'

import * as V from 'victory';
import { VictoryPie, VictoryLabel, VictoryTooltip, VictoryTheme } from 'victory';

class CustomLabel extends React.Component {
    static defaultEvents: V.EventPropTypeInterface<string, V.StringOrNumberOrCallback>[];

    render() {
      return (
        <g>
          <VictoryLabel {...this.props}/>
          <VictoryTooltip
            {...this.props}
            x={200} y={250}
            orientation="top"
            pointerLength={0}
            cornerRadius={50}
            flyoutWidth={100}
            flyoutHeight={100}
            flyoutStyle={{ fill: "black" }}
          />
        </g>
      );
    }
  }
  
CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

const MainPage = () => {
    return (
      <VictoryPie
        style={{ labels: { fill: "white" } }}
        innerRadius={50}
        labelRadius={100}
        labels={({ datum }) => `# ${datum.y}`}
        labelComponent={<CustomLabel />}
        data={[
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 1 }
        ]}
      />
  );
}

export default MainPage;