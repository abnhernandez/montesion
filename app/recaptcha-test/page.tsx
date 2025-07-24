import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RecaptchaTestPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Formularios con reCAPTCHA</h1>
          <p className="text-muted-foreground">
            Prueba los formularios protegidos con reCAPTCHA Enterprise
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
            <LoginForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Registro</h2>
            <RegisterForm />
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Otros formularios protegidos:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <a href="/oracion" className="hover:text-foreground transition-colors">Petición de Oración</a> - Ya implementado con reCAPTCHA</li>
            <li>• Formularios de contacto - Utilizan las utilidades creadas</li>
            <li>• API de envío de emails - Verificación en el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
