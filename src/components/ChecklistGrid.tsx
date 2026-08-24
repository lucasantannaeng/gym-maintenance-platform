// src/components/ChecklistGrid.tsx
import { useState } from 'react';
import { GymEquipment, NonConformity, PhotoEvidence } from '../types/gymReport';

interface ChecklistGridProps {
  equipment: GymEquipment;
  onUpdate: (updated: Partial<GymEquipment>) => void;
}

const NR12_CHECKLIST = [
  { id: 'estrutura', label: 'Estrutura e Soldas', description: 'Verificar trincas, deformações, corrosão ativa' },
  { id: 'cabo', label: 'Cabos de Aço', description: 'Fios rompidos, desgaste, oxidação, terminais' },
  { id: 'polia', label: 'Polias e Rolamentos', description: 'Rotação livre, ruído, folga, desgaste do canal' },
  { id: 'ajuste', label: 'Ajustes Ergonômicos', description: 'Travas, escalas, força de acionamento ≤30N' },
  { id: 'seguranca', label: 'Dispositivos de Segurança', description: 'Travas, limitadores, parada emergência, proteções' },
  { id: 'eletrico', label: 'Elétrico (Cardio)', description: 'Aterramento ≤10Ω, isolação ≥1MΩ, funcionamento' }
] as const;

const ChecklistGrid: React.FC<ChecklistGridProps> = ({ equipment, onUpdate }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set(equipment.nonConformities.map(nc => nc.id)));

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const newSet = new Set(checkedItems);
    if (e.target.checked) {
      newSet.add(itemId);
    } else {
      newSet.delete(itemId);
    }
    setCheckedItems(newSet);

    // Update nonConformities array based on checked state
    const nonConformities = equipment.nonConformities.filter(nc => !newSet.has(nc.id));
    // For simplicity, we are treating checked as "has issue". In a real app, you'd open a modal to describe the NC.
    // This is a simplification for the Ponytail approach: we'll just note that the item needs review.
    // A proper implementation would have a more detailed state for each checklist item.
    onUpdate({ nonConformities }); // This is a placeholder; real logic would be more complex.
  };

  return (
    <div className="checklist-grid">
      <h3>Checklist de Inspeção NR-12 / ISO 20957</h3>
      <div className="grid">
        {NR12_CHECKLIST.map(item => (
          <div key={item.id} className="checklist-item">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id={`chk-${item.id}-${equipment.tag || equipment.model}`}
                checked={checkedItems.has(item.id)}
                onChange={(e) => handleCheckboxChange(e, item.id)}
              />
              <label htmlFor={`chk-${item.id}-${equipment.tag || equipment.model}`}>
                {item.label}
              </label>
            </div>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="checklist-notes">
        <p>Itens marcados indicam necessidade de inspeção detalhada e registro de Não Conformidade.</p>
        <p>Para cada item marcado, adicione uma foto e descreva a irregularidade no uploader de fotos acima.</p>
      </div>
    </div>
  );
};

export default ChecklistGrid;