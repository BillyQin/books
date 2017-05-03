import * as fs from 'fs';

export function readFileAsync(fpath): Promise<any>{
  return new Promise((resolve, reject)=>{
    fs.readFile(fpath, (err, data)=>{
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

export function writeFileAsync(fpath, data): Promise<any>{
  return new Promise((resolve, reject)=>{
    fs.writeFile(fpath, data, (err, data)=>{
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}
