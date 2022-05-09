import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  SchedulerRegistry,
  Interval,
  Timeout,
} from '@nestjs/schedule';
import CronJob from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  //   @Cron('10 * * * * *')
  //   handleCron() {
  //     this.logger.debug('Called when the current second is 45');
  //   }
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  //   @Cron(CronExpression.EVERY_5_SECONDS)
  //   handleCron() {
  //     this.logger.debug('Called every 5 seconds');
  //   }
  //   @Cron('* * * * * *', {
  //     name: 'notifications',
  //   })
  //   triggerNotifications() {}

  addCronJob(name: string, seconds: string) {
    console.log('name', 'yamone', 'second', 3);
    const job = new CronJob(`3 * * * * *`, () => {
      this.logger.debug(`hello`);
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob('yamone', '1');
    job.start();
    console.log('helelo');

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  //   interval = this.schedulerRegistry.getInterval('notifications');
  //   clearInterval(interval);

  //   addInterval(name: string, milliseconds: number) {
  //     const callback = () => {
  //       this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
  //     };

  //     const interval = setInterval(callback, milliseconds);
  //     this.schedulerRegistry.addInterval(name, interval);
  //   }
  //   deleteInterval(name: string) {
  //     this.schedulerRegistry.deleteInterval(name);
  //     this.logger.warn(`Interval ${name} deleted!`);
  //   }
  //   getIntervals() {
  //     const intervals = this.schedulerRegistry.getIntervals();
  //     intervals.forEach(key => this.logger.log(`Interval: ${key}`));
  //   }

  //   @Cron('3 * * * * *')
  //   handleCron() {
  //     this.logger.debug('Called when the second is 3');
  //   }

  //   @Interval(10000)
  //   handleInterval() {
  //     this.logger.debug('Called every 10 seconds');
  //   }

  //   @Timeout(5000)
  //   handleTimeout() {
  //     this.logger.debug('Called once after 5 seconds');
  //   }
}
