/**
 * @param path  Log file path
 * @param [period]  Log file rotation period. i.e:  1h ,1d ,1m
 *       <number><scope> where scope is:
              h   hours (at the start of the hour)
              d   days (at the start of the day, i.e. just after midnight)
              w   weeks (at the start of Sunday)
              m   months (on the first of the month)
              y   years (at the start of Jan 1st)
          with special values 'hourly' (1h), 'daily' (1d), "weekly" (1w),
         'monthly' (1m) and 'yearly' (1y)

   @param [count] Maximum number of rotation log files retained.
 */
export interface FileStoreOption {
     path: string,
     period?: string,
     count?: number
}




