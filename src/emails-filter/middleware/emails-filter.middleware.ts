import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as csv from 'csv';

function recordFilter(record) {
  return record.email && !record.email.match(/yahoo.com/i);
}

@Injectable()
export class EmailsFilterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.set({ 'Content-Type': 'text/csv' });

    const parser = csv.parse({
      delimiter: ',', columns: true, columnsDuplicatesToArray: false, raw: true,
    }).on('error', err => {
      if (err)
        console.log(err);
      else
        res.end();
      next();
    });

    // 'csv.parse' leaves '\r' as the last symbol within row.raw in case of CRLF, and it leaves '\n' in case of LF
    let is_crlf = false;
    let header_written = false;
    const transformer = csv.transform((row) => {
      let r = '';
      if (!header_written) {
        if (row.raw && row.raw.length > 0 && row.raw[row.raw.length-1] === '\r')
          is_crlf = true;
        r += Object.getOwnPropertyNames(row.record).join(',') + (is_crlf ? '\r\n' : '\n');
        header_written = true;
      }
      if (recordFilter(row.record))
        r += row.raw + (is_crlf ? '\n' : '');
      return r;
    });

    req.pipe(parser)
      .pipe(transformer)
      .pipe(res)
      .on('error', err => {
        if (err)
          console.log(err);
        else
          res.end();
        next();
      });
  }
}
