// src/components/InventorySummaryCard.tsx
import { GymEquipment } from '../types/gymReport';

interface InventorySummaryCardProps {
  equipments: GymEquipment[];
}

const InventorySummaryCard: React.FC<InventorySummaryCardProps> = ({ equipments }) => {
  const total = equipments.length;
  const statusCounts = equipments.reduce((acc, eq) => {
    acc[eq.status] = (acc[eq.status] || 0) + 1;
    return acc;
  }, {} as Record<GymEquipment['status'], number>);

  // Simple GUT calculation: if any CRITICA non-conformity -> high risk, else if any MAIOR -> medium, else low
  let gutLevel: 'low' | 'medium' | 'high' = 'low';
  for (const eq of equipments) {
    for (const nc of eq.nonConformities) {
      if (nc.severity === 'CRITICA') {
        gutLevel = 'high';
        break;
      }
      if (nc.severity === 'MAIOR' && gutLevel === 'low') {
        gutLevel = 'medium';
      }
    }
    if (gutLevel === 'high') break;
  }

  const gutLabels: Record<'low'|'medium'|'high', string> = {
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto'
  };

  return (
    <div className="inventory-summary-card">
      <div className="summary-title">Resumo da Inspeção</div>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-label">Total de Equipamentos</div>
          <div className="summary-value">{total}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Conformes</div>
          <div className="summary-value status-conforme">{statusCounts['CONFORME'] || 0}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Com Observação</div>
          <div className="summary-value status-observacao">{statusCounts['OBSERVACAO'] || 0}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Não Conformes</div>
          <div className="summary-value status-naoconforme">{statusCounts['NAO_CONFORME'] || 0}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Interditados</div>
          <div className="summary-value status-interditado">{statusCounts['INTERDITADO'] || 0}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Nível de Risco (GUT)</div>
          <div className={`summary-value gut-${gutLevel}`}>{gutLabels[gutLevel]}</div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummaryCard;