import React from 'react';
import moment from 'moment'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

require("highcharts/modules/timeline")(Highcharts);


const FilingTimeline = ({ filings }) => {
  if(!filings) return null;

  return (
    <div style={{ width: '100% '}}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            //zoomType: 'x',
            type: 'timeline'
          },
          title: {
            text: 'Your filing schedule'
          },
          xAxis: {
            type: 'datetime',
            visible: false
          },
          yAxis: {
            gridLineWidth: 1,
            title: null,
            labels: {
              enabled: false
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            enabled: true
          },
          series: [{
            dataLabels: {
              allowOverlap: false,
              format: `
              <div style="font-weight: bold;">{point.name}</div><br/>
              <div>{point.agency}</div><br/>
              <div>{point.jurisdiction}</div><br/>
              <div>{point.date}</div>
              `
            },
            marker: {
              symbol: 'circle'
            },
            data: filings.map(f => {
              return {
                x: new Date(f.due),
                date: moment(f.due).format('MMM, Do'),
                name: f.name,
                agency: f.agency.name,
                jurisdiction: f.agency.jurisdiction.name
              }
            })
          }]
        }}
      />
    </div>
  )
}

export default FilingTimeline;
