import { useState } from 'react';
import { GymEquipment } from '../types/gymReport';
import PhotoUploader from './PhotoUploader';
import ChecklistGrid from './ChecklistGrid';

interface EquipmentFormProps {
  index: number;
  equipment: GymEquipment;
  onUpdate: (updated: Partial<GymEquipment>) => void;
  onRemove: () => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({
  index,
  equipment,
  onUpdate,
  onRemove
}) => {
  const [tag, setTag] = useState(equipment.tag || '');
  const [status, setStatus] = useState(equipment.status);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
    onUpdate({ tag: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as GymEquipment['status'];
    setStatus(newStatus);
    onUpdate({ status: newStatus });
  };

  return (
    <div className="equipment-card">
      <div className="equipment-header">
        <h3>
          Equipamento {index + 1}: {equipment.model}
          <span className="badge">{equipment.line}</span>
        </h3>
        <button onClick={onRemove} className="remove">
          Remover
        </button>
      </div>

      <div className="equipment-body">
        <div className="field">
          <label>TAG do Equipamento:</label>
          <input
            type="text"
            value={tag}
            onChange={handleTagChange}
            placeholder="Ex: LF-KRT-001"
          />
        </div>

        <div className="field">
          <label>Status de Conformidade:</label>
          <select value={status} onChange={handleStatusChange}>
            <option value="CONFORME">✅ Conforme</option>
            <option value="OBSERVACAO">⚠️ Observação</option>
            <option value="NAO_CONFORME">❌ Não Conforme</option>
            <option value="INTERDITADO">🚫 Interditado</option>
          </select>
        </div>

        <div className="field">
          <label>Fotos e Evidências:</label>
          <PhotoUploader
            equipmentIndex={index}
            onUpdate={onUpdate}
            currentEquipment={equipment}
          />
        </div>

        <div className="field">
          <label>Checklist de Inspeção (NR-12 / ISO 20957):</label>
          <ChecklistGrid
            equipment={equipment}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;