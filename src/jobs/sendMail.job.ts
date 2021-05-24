import {sendNewsletters} from '../models/services';
import {CronJob} from "cron";

export const cronJob: CronJob = new CronJob('*/1 * * * *', () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = hours*100 + minutes;
  sendNewsletters(time);
})
