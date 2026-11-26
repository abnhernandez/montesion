import 'server-only';import {randomBytes,createCipheriv,createHmac} from 'node:crypto';
function key(n:string){const k=Buffer.from(process.env[n]||'','base64');if(k.length!==32)throw Error('Invalid key');return k}
export function encrypt(value:unknown){const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',key('DATA_KEY'),iv);const data=Buffer.concat([c.update(JSON.stringify(value),'utf8'),c.final()]);return [iv,c.getAuthTag(),data].map(x=>x.toString('base64')).join('.')}
export function hash(s:string){return createHmac('sha256',key('HASH_KEY')).update(s).digest('hex')}
