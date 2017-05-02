import { fs } from 'fs';

export function readFileAsync(fpath) {
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

export function writeFileAsync(fpath, data) {
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
