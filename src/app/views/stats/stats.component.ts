import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { StatsService } from '@services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  imports: [ChartModule],
})
export class StatsComponent implements OnInit {
  private statistics = inject(StatsService);
  private cd = inject(ChangeDetectorRef);
  private statsFromStorage = this.statistics.getStatistics();

  data: any;
  options: any;

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Red', 'Yellow', 'Draw'],
      datasets: [
        {
          label: 'Total',
          data: [this.statsFromStorage.redIsWinner, this.statsFromStorage.yellowIsWinner, this.statsFromStorage.draw],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-red-500'),
            documentStyle.getPropertyValue('--p-yellow-500'),
            documentStyle.getPropertyValue('--p-gray-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-red-400'),
            documentStyle.getPropertyValue('--p-yellow-400'),
            documentStyle.getPropertyValue('--p-gray-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
    this.cd.markForCheck();
  }
}
