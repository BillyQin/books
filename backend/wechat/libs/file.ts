import * as fs from 'fs';

export function readFileAsync(fpath,encoding): Promise<any>{
  return new Promise((resolve, reject)=>{
    fs.readFile(fpath, encoding, (err, data)=>{
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
    fs.writeFile(fpath, data, (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}
