// src/components/ReportTypeSelector.tsx
import { useState } from 'react';
import { ReportType } from '../types/gymReport';

const REPORT_TYPE_OPTIONS: Array<{ value: ReportType; label: string; description: string }> = [
  {
    value: 'NR12_CONFORMITY',
    label: 'Laudo de Conformidade NR-12',
    description: 'Laudo pericial anual de conformidade com NR-12 e ABNT NBR ISO 20957 (fiscalização/trabalhista)'
  },
  {
    value: 'PREVENTIVE_MAINTENANCE',
    label: 'Laudo Preventivo & Plano de Manutenção',
    description: 'Plano de manutenção periódica com foco em MTBF, desgaste de cabos e lubrificação (mensal/trimestral)'
  },
  {
    value: 'FORENSIC_ACCIDENT_INVESTIGATION',
    label: 'Laudo Pericial Cautelar (Judicial)',
    description: 'Investigação de sinistro/acidente com análise de nexo causal, fadiga em soldas/pinos e parecer conclusivo'
  },
  {
    value: 'NEW_EQUIPMENT_HANDOVER',
    label: 'Laudo de Entrega Técnica',
    description: 'Auditoria de montagem e conformidade de fábrica para equipamentos novos (Lion Fitness, Movement, etc.)'
  }
];

interface ReportTypeSelectorProps {
  reportType: ReportType | null;
  onChange: (value: ReportType) => void;
}

const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({ reportType, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'report-type-selector-menu' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: ReportType) => {
    onChange(value);
    handleClose();
  };

  return (
    <div>
      <div
        id="report-type-select"
        aria-haspopup="true"
        aria-controls={id}
        onClick={handleClick}
        style={{
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: '8px 12px',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
          minWidth: 200,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {reportType ? (
          <>
            <span>{REPORT_TYPE_OPTIONS.find(opt => opt.value === reportType)?.label}</span>
            <span style={{ fontSize: 12, color: '#666' }}>▼</span>
          </>
        ) : (
          <>
            <span>Selecione o tipo de laudo</span>
            <span style={{ fontSize: 12, color: '#666' }}>▼</span>
          </>
        )}
      </div>
      {open && (
        <div
          id={id}
          role="menu"
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: 4,
            marginTop: 4,
            width: 280,
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
          }}
          onBlur={handleClose}
        >
          {REPORT_TYPE_OPTIONS.map(option => (
            <div
              key={option.value}
              role="menuitem"
              onMouseDown={e => {
                e.preventDefault(); // Prevent blur before click
                handleMenuItemClick(option.value);
              }}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                borderBottom: option.value === REPORT_TYPE_OPTIONS[REPORT_TYPE_OPTIONS.length - 1].value ? 'none' : '1px solid #eee',
                backgroundColor: reportType === option.value ? '#e6f7ff' : 'white'
              }}
            >
              <div style={{ fontWeight: 600 }}>{option.label}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{option.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportTypeSelector;