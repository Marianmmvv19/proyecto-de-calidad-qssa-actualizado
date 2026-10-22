import React, { useState } from 'react';
import { X, Plus, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: ServiceItem) => void;
  nextOrder: number;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onAddService,
  nextOrder
}) => {
  const [formData, setFormData] = useState({
    categoria: 'Capacitaciones "In House", capacitaciones abiertas',
    servicio: '',
    viabilidad: 'Alta',
    modalidad: 'Online o presencial',
    recursos: '',
    limitaciones: 'No requiere equipos.',
    dificultad: '1 - Muy fácil',
    prioridadComercial: 'Alta'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.servicio.trim()) return;

    const newService: ServiceItem = {
      id: Date.now(),
      orden: nextOrder.toString(),
      ...formData,
      isCustom: true
    };

    onAddService(newService);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        
        <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base">Agregar Nuevo Servicio a la Matriz QSSA</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Categoría del Servicio *</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value='Capacitaciones "In House", capacitaciones abiertas'>Capacitaciones "In House", capacitaciones abiertas</option>
              <option value='Diagnósticos de Sistemas de Gestión'>Diagnósticos de Sistemas de Gestión</option>
              <option value='Auditorías Internas'>Auditorías Internas</option>
              <option value='Servicios específicos Corredor Bioceánico Bolivia - Chile - Perú'>Servicios específicos Corredor Bioceánico</option>
              <option value='Implementación de Sistemas de Gestión'>Implementación de Sistemas de Gestión</option>
              <option value='Certificación de Sistemas de Gestión'>Certificación de Sistemas de Gestión</option>
              <option value='Verificación/Validación'>Verificación/Validación</option>
              <option value='Otros Servicios'>Otros Servicios</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Servicio / Norma ISO *</label>
            <input
              type="text"
              required
              value={formData.servicio}
              onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
              placeholder="Ej. Interpretación de la Norma ISO 22000"
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Viabilidad sin Equipos</label>
              <select
                value={formData.viabilidad}
                onChange={(e) => setFormData({ ...formData, viabilidad: e.target.value })}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Condicionada">Condicionada</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Prioridad Comercial</label>
              <select
                value={formData.prioridadComercial}
                onChange={(e) => setFormData({ ...formData, prioridadComercial: e.target.value })}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dificultad Técnic / Operativa</label>
              <select
                value={formData.dificultad}
                onChange={(e) => setFormData({ ...formData, dificultad: e.target.value })}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="1 - Muy fácil">1 - Muy fácil</option>
                <option value="2 - Fácil">2 - Fácil</option>
                <option value="3 - Media">3 - Media</option>
                <option value="4 - Difícil">4 - Difícil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Modalidad de Ejecución</label>
              <input
                type="text"
                value={formData.modalidad}
                onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                placeholder="Ej. Online o presencial / Mixta"
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Recursos Necesarios</label>
            <textarea
              rows={2}
              value={formData.recursos}
              onChange={(e) => setFormData({ ...formData, recursos: e.target.value })}
              placeholder="Instructor competente; norma; casos prácticos; plantilla de examen; certificado..."
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Limitaciones / Condiciones</label>
            <input
              type="text"
              value={formData.limitaciones}
              onChange={(e) => setFormData({ ...formData, limitaciones: e.target.value })}
              placeholder="Ej. No requiere equipos propios de medición."
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow transition"
            >
              Guardar Servicio
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
