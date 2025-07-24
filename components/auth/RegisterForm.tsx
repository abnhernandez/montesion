'use client';

import { useState } from 'react';
import { useRecaptcha } from '@/hooks/use-recaptcha';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { executeRecaptcha } = useRecaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Execute reCAPTCHA verification
      const recaptchaToken = await executeRecaptcha('REGISTER');
      
      if (!recaptchaToken) {
        throw new Error('Error de verificación de seguridad. Por favor, intenta de nuevo.');
      }

      // Here you would typically call your registration API
      // For now, this is just a placeholder
      console.log('Registration attempt with reCAPTCHA verified:', { 
        nombre: formData.nombre,
        email: formData.email,
        recaptchaToken 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful registration
      setSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      setError(error instanceof Error ? error.message : 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-background border rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">¡Registro Exitoso!</h2>
          <p className="text-muted-foreground mb-4">
            Tu cuenta ha sido creada exitosamente. Puedes proceder a iniciar sesión.
          </p>
          <Button 
            onClick={() => setSuccess(false)}
            variant="outline"
          >
            Registrar otra cuenta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-background border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">
            Nombre Completo
          </label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Correo Electrónico
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Contraseña
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required
            disabled={loading}
            minLength={6}
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirmar Contraseña
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            required
            disabled={loading}
            minLength={6}
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      </form>
      
      <div className="mt-4 text-xs text-muted-foreground text-center">
        Este formulario está protegido por reCAPTCHA Enterprise.
      </div>
    </div>
  );
}
