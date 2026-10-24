import React, { useState } from 'react';
import { X, KeyRound, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import qssaLogo from '../assets/qssa_official_logo-4aPsr4dZ.png';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password })
      });
      const result: { success?: boolean; error?: string } = await response.json();

      if (response.ok && result.success) {
        setError('');
        onLoginSuccess();
        onClose();
        setUsername('');
        setPassword('');
      } else {
        setError(result.error || 'Usuario o contraseña incorrectos. Verifique sus credenciales de administrador.');
      }
    } catch {
      setError('No se pudo verificar el acceso. Inténtelo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200/80">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <img src={qssaLogo} alt="Logo QSSA" className="w-10 h-10 object-contain drop-shadow-sm shrink-0" />
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Acceso Administrador
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">Ingreso al Sistema QSSA</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed mt-2">
            Inicie sesión con su cuenta administrativa para acceder a la gestión y publicación de nuevos servicios.
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs font-semibold flex items-start space-x-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Usuario de Administrador <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su usuario"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contraseña <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition font-medium"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Ingresar y Crear Servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Institutional Mail Shortcut */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500 font-medium">¿Desea revisar su correo corporativo? </span>
            <a
              href="https://mail.hostinger.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline"
            >
              Inicia sesión en Hostinger Mail
            </a>
          </div>

        </form>
      </div>
    </div>
  );
};
