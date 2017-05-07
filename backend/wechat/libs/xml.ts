import { parseString } from 'xml2js';

export function xml2js (buffer){
  let xml = buffer.toString();
  console.log(xml);
  return new Promise((resolve, reject)=>{
    parseString(xml, (err, result)=>{
      if(err){
        reject;
      } else {
        resolve(result.xml);
      }
    })
  })
}