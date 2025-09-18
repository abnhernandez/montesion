// generate-jwt.js
// Script seguro para generar un JWT compatible con el middleware (usa jose)
// Uso: node generate-jwt.js <user_id> <secret> [exp_seconds]


import { SignJWT } from 'jose';

async function main() {
  const [,, userId, emailArg, secretArg, expSecondsArg] = process.argv;
  if (!userId || !emailArg || !secretArg) {
    console.error('Uso: node generate-jwt.js <user_id> <email> <secret> [exp_seconds]');
    process.exit(1);
  }
  const secret = new TextEncoder().encode(secretArg);
  // Claims compatibles con Supabase
  const payload = {
    sub: userId,
    email: emailArg,
    role: 'authenticated',
    aud: 'authenticated',
  };

  let jwtBuilder = new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt();

  if (expSecondsArg) {
    const exp = Math.floor(Date.now() / 1000) + parseInt(expSecondsArg);
    jwtBuilder = jwtBuilder.setExpirationTime(exp);
  }

  const jwt = await jwtBuilder.sign(secret);

  console.log('JWT generado:');
  console.log(jwt);
}

main();
