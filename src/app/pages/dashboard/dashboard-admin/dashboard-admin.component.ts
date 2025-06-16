// angular import
import { Component, OnInit } from '@angular/core';

declare const AmCharts;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/pie.min.js';
import '../../../../assets/charts/amchart/ammap.min.js';
import '../../../../assets/charts/amchart/usaLow.js';
import '../../../../assets/charts/amchart/radar.js';
import '../../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductService } from 'src/services/product.service';
import { SettingService } from 'src/services/setting.service';

@Component({
  selector: 'app-dashboard-admin',
  imports: [SharedModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {

  totalSales: any;
  sales: any;
  chartDatac: any;
  userData: any;
  loading: any = true;

  constructor(
    private productService: ProductService,
    private settings: SettingService
  ) {
    this.userData = this.settings.getUserAccess();
  }

  ngOnInit() {
    this.initChart();
    this.getSalesData();
  }

  getSalesData() {
    this.productService.adminDashboardData().subscribe({
      next: (res: any) => {
        this.totalSales = res.data;
        this.reinit();
      },
      error: (error) => {
        console.error('Error fetching sales data:', error);
      }
    });
  }

  reinit() {
    this.sales = [
      {
        title: 'Daily Sales',
        icon: 'icon-arrow-down text-c-red',
        amount: this.totalSales.daily,
        percentage: this.totalSales.daily_percentage,
        progress: 50,
        design: 'col-md-6',
        progress_bg: 'progress-c-theme'
      },
      {
        title: 'Monthly Sales',
        // icon: 'icon-arrow-down text-c-red',
        icon: 'icon-arrow-up text-c-green',
        amount: this.totalSales.monthly,
        percentage: this.totalSales.monthly_percentage,
        progress: 35,
        design: 'col-md-6',
        progress_bg: 'progress-c-theme2'
      },
      {
        title: 'Admin Monthly Revenue',
        icon: 'icon-arrow-up text-c-green',
        amount: this.totalSales.admin_sales_monthly,
        percentage: this.totalSales.admin_percentage,
        progress: 70,
        design: 'col-md-12',
        progress_bg: 'progress-c-theme'
      }
    ];

    const highestSales = this.totalSales.sales_per_day.reduce((prev: {total_sales: number}, current: {total_sales: number}) => {
      return (prev.total_sales > current.total_sales) ? prev : current;
    });

    const dayMap = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat'
    }

    this.chartDatac = this.totalSales.sales_per_day.map((item: {date: Date, total_sales: number}) => {
      const nDate = new Date(item.date);
      return {
        day: dayMap[nDate.getDay()],
        value: Math.round(item.total_sales / highestSales.total_sales * 50)
      };
    });

    this.loading = false;
  }

  card = [
    {
      design: 'border-bottom',
      number: '235',
      text: 'TOTAL IDEAS',
      icon: 'icon-zap text-c-green'
    },
    {
      number: '26',
      text: 'TOTAL LOCATIONS',
      icon: 'icon-map-pin text-c-blue'
    }
  ];

  social_card = [
    {
      design: 'col-md-6',
      icon: 'fab fa-twitter text-c-blue',
      amount: '11,200',
      percentage: '+6.2%',
      color: 'text-c-purple',
      target: '34,185',
      progress: 40,
      duration: '4,567',
      progress2: 70,
      progress_bg: 'progress-c-theme',
      progress_bg_2: 'progress-c-theme2'
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-google-plus-g text-c-red',
      amount: '10,500',
      percentage: '+5.9%',
      color: 'text-c-blue',
      target: '25,998',
      progress: 80,
      duration: '7,753',
      progress2: 50,
      progress_bg: 'progress-c-theme',
      progress_bg_2: 'progress-c-theme2'
    }
  ];

  progressing = [
    {
      number: '5',
      amount: '384',
      progress: 70,
      progress_bg: 'progress-c-theme'
    },
    {
      number: '4',
      amount: '145',
      progress: 35,
      progress_bg: 'progress-c-theme'
    },
    {
      number: '3',
      amount: '24',
      progress: 25,
      progress_bg: 'progress-c-theme'
    },
    {
      number: '2',
      amount: '1',
      progress: 10,
      progress_bg: 'progress-c-theme'
    },
    {
      number: '1',
      amount: '0',
      progress: 0,
      progress_bg: 'progress-c-theme'
    }
  ];

  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Isabella Christensen',
      text: 'Requested account activation',
      time: '11 MAY 12:56',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Ida Jorgensen',
      text: 'Pending document verification',
      time: '11 MAY 10:35',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      title: 'Mathilda Andersen',
      text: 'Completed profile setup',
      time: '9 MAY 17:38',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Karla Soreness',
      text: 'Requires additional information',
      time: '19 MAY 12:56',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Albert Andersen',
      text: 'Approved and verified account',
      time: '21 July 12:56',
      color: 'text-c-green'
    }
  ]

  initChart() {
    setTimeout(() => {
      const latlong = dataJson;

      const mapData = mapColor;

      const minBulletSize = 3;
      const maxBulletSize = 70;
      let min = Infinity;
      let max = -Infinity;
      let i;
      let value;
      for (i = 0; i < mapData.length; i++) {
        value = mapData[i].value;
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
      const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

      const images = [];
      for (i = 0; i < mapData.length; i++) {
        const dataItem = mapData[i];
        value = dataItem.value;

        let square = ((value - min) / (max - min)) * (maxSquare - minSquare) + minSquare;
        if (square < minSquare) {
          square = minSquare;
        }
        const size = Math.sqrt(square / (Math.PI * 8));
        const id = dataItem.code;

        images.push({
          type: 'circle',
          theme: 'light',
          width: size,
          height: size,
          color: dataItem.color,
          longitude: latlong[id].longitude,
          latitude: latlong[id].latitude,
          title: dataItem.name + '</br> [ ' + value + ' ]',
          value: value
        });
      }

      // world-low chart
      AmCharts.makeChart('world-low', {
        type: 'map',
        projection: 'eckert6',

        dataProvider: {
          map: 'worldLow',
          images: images
        },
        export: {
          enabled: true
        }
      });

      // widget-line-chart
      AmCharts.makeChart('widget-line-chart', {
        type: 'serial',
        addClassNames: true,
        fontSize: 15,
        dataProvider: this.chartDatac,
        autoMarginOffset: 10,
        categoryField: 'day',
        categoryAxis: {
          color: '#fff',
          gridAlpha: 0,
          axisAlpha: 0,
          lineAlpha: 0,
          offset: -20,
          inside: true
        },
        valueAxes: [
          {
            fontSize: 0,
            inside: true,
            gridAlpha: 0,
            axisAlpha: 0,
            lineAlpha: 0,
            minimum: 0,
            maximum: 100
          }
        ],
        chartCursor: {
          valueLineEnabled: false,
          valueLineBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false,
          valueZoomable: false,
          cursorColor: '#fff',
          categoryBalloonColor: '#51b4e6',
          valueLineAlpha: 0
        },
        graphs: [
          {
            id: 'g1',
            type: 'line',
            valueField: 'value',
            lineColor: '#ffffff',
            lineAlpha: 1,
            lineThickness: 3,
            fillAlphas: 0,
            showBalloon: true,
            balloon: {
              drop: true,
              adjustBorderColor: false,
              color: '#222',
              fillAlphas: 0.2,
              bullet: 'round',
              bulletBorderAlpha: 1,
              bulletSize: 5,
              hideBulletsCount: 50,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: 'value',
              balloonText: '<span style="font-size:18px;">[[value]]</span>'
            }
          }
        ]
      });
    }, 500);
  }

}
