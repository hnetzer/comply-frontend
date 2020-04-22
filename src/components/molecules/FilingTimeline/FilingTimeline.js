import React from 'react';
import moment from 'moment'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

require("highcharts/modules/timeline")(Highcharts);


const FilingTimeline = ({ filings }) => {
  if(!filings) return null;


  function dataLabelFormat(x = this.x, point = this.point)  {
    return (`
       <div style="font-size: 14px;">${point.name}</div><br/><br/>
       <div style="font-size: 11px;">${point.jurisdiction}</div><br/>
       <div style="font-size: 11px; font-weight: bold;">${point.date}</div>
   `)
  }

  return (
    <div style={{ width: '100%', padding: 0, margin: 0}}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'timeline'
          },
          pane: {
            size: '100%'
          },
          colors: ['#309F76', '#299FEB', '#30749F', '#112532'],
          title: {
            text: '',
          },
          credits: {
            enabled: false
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
            enabled: false
          },
          series: [{
            type: 'timeline',
            dataLabels: {
              //align: 'left',
              allowOverlap: false,
              backgroundColor: '#F1F2F3',
              color: '#112532',
              borderRadius: 2,
              style: { "font-family": "'Avenir', sans-serif" },
              formatter: dataLabelFormat
            },
            marker: {
              symbol: 'circle'
            },
            data: filings.map(f => {
              return {
                x: new Date(f.due),
                date: moment(f.due).format('MMM Do, YYYY'),
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
