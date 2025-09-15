import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuración del transportador SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    const transporter = createTransporter();
    await transporter.verify();

    if (type === 'confirmation') {
      // Email de confirmación al usuario
      const { toEmail, nombre, ticket, asunto } = data;
      const mailOptions = {
        from: {
          name: 'Monte Sion - Peticiones de Oración',
          address: process.env.EMAIL_FROM || 'noreplymontesion@gmail.com',
        },
        to: toEmail,
        subject: `Confirmación de Petición de Oración #${ticket}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #831111; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .ticket { background-color: #fecaca; padding: 10px; border-radius: 6px; margin: 20px 0; text-align: center; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 14px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🙏 Monte Sion</h1>
                <p>Confirmación de Petición de Oración</p>
              </div>
              <div class="content">
                <p>Estimado/a <strong>${nombre}</strong>,</p>
                <p>Hemos recibido tu petición de oración y queremos confirmarte que está en nuestras oraciones.</p>
                <div class="ticket">
                  <strong>Número de Ticket: #${ticket}</strong><br>
                  <em>Asunto: ${asunto}</em>
                </div>
                <p><strong>¿Qué sigue ahora?</strong></p>
                <ul>
                  <li>✅ Tu petición ha sido registrada en nuestro sistema</li>
                  <li>🙏 Nuestro equipo de oración comenzará a orar por tu petición</li>
                  <li>💝 Mantendremos tu petición en confidencialidad total</li>
                  <li>📧 Te contactaremos si necesitamos más información</li>
                </ul>
                <p><em>"Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias."</em><br>
                <strong>Filipenses 4:6</strong></p>
                <div class="footer">
                  <p><strong>Monte Sion · Iglesia Cristiana</strong><br>
                  Email: ministeriomontesionoaxaca@gmail.com<br>
                  Sitio web: https://montesion.me</p>
                  <p><small>Por favor, no respondas a este correo. Este es un email automático de confirmación. Si no solicitaste una petición de oración, por favor ignora este mensaje.</small></p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      };
      await transporter.sendMail(mailOptions);
    } else if (type === 'notification') {
      // Notificación al equipo
      const { nombre, correo_electronico, asunto, peticion, ticket } = data;
      const mailOptions = {
        from: {
          name: 'Sistema Monte Sion',
          address: process.env.EMAIL_FROM || 'noreplymontesion@gmail.com',
        },
        to: 'rootmontesion@gmail.com',
        subject: `🙏 Nueva Petición de Oración #${ticket}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #831111; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #fef2f2; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-box { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
              .petition-box { background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🙏 Nueva Petición de Oración</h1>
                <p>Ticket #${ticket}</p>
              </div>
              <div class="content">
                <div class="info-box">
                  <p><strong>Nombre:</strong> ${nombre}</p>
                  <p><strong>Email:</strong> ${correo_electronico}</p>
                  <p><strong>Asunto:</strong> ${asunto}</p>
                  <p><strong>Fecha y Hora:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                </div>
                <div class="petition-box">
                  <h3>Petición:</h3>
                  <p>${peticion}</p>
                </div>
                <p><small>Esta notificación se envió automáticamente desde el sistema web de Monte Sion.</small></p>
              </div>
            </div>
          </body>
          </html>
        `,
      };
      await transporter.sendMail(mailOptions);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}
// ...existing code...
