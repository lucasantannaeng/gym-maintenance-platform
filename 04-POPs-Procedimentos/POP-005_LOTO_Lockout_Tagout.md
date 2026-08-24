# POP - Procedimento Operacional Padrão: Lockout/Tagout (LOTO) para Manutenção de Equipamentos de Academia

---

## 1. OBJETIVO
Estabelecer requisitos mínimos para **isolamento energético** e **bloqueio/etiquetagem** de equipamentos de academia durante atividades de manutenção, inspeção, limpeza, ajuste ou reparo, prevenindo acionamento inesperado e liberação de energia residual.

**Base Legal:** NR-12 (Itens 12.8, 12.9, 12.11), NR-10 (Item 10.3), NR-17, ISO 20957-1.

---

## 2. ESCOPO
Aplica-se a **TODAS** intervenções em:
- Equipamentos cardio (elétricos: esteiras, elípticos, bikes, remos)
- Equipamentos musculação com partida assistida (molas a gás, contrapesos)
- Equipamentos com sistemas hidráulicos/pneumáticos
- Qualquer equipamento com energia armazenada (molas, contrapesos, capacitores, inércia)

**Exceção:** Apenas inspeção visual externa sem remoção de proteções e sem zona de perigo.

---

## 3. DEFINIÇÕES

| Termo | Definição |
|-------|-----------|
| **Lockout (Bloqueio)** | Colocação de dispositivo de bloqueio (cadeado, trava) em dispositivo de isolamento energético, impedindo acionamento |
| **Tagout (Etiquetagem)** | Fixação de etiqueta de advertência no dispositivo de isolamento, identificando responsável e motivo |
| **Dispositivo de Isolamento** | Chave geral, disjuntor, plugue, válvula, pino de segurança - que impede fluxo de energia |
| **Energia Residual** | Energia remanescente após isolamento: capacitores, molas comprimidas, contrapesos elevados, inércia rotacional, pressão hidráulica |
| **Zona de Perigo** | Área onde parte do corpo pode ser atingida por movimento inesperado ou liberação de energia |
| **Pessoa Autorizada** | Treinada em LOTO, designada pelo Eng. Responsável, com ART ativa |
| **Pessoa Afetada** | Qualquer outra pessoa na área (usuários, instrutores, zeladores) |

---

## 4. TIPOS DE ENERGIA A ISOLAR

| Equipamento | Elétrica | Mecânica (Molas/Pesos) | Hidráulica/Pneumática | Térmica | Química |
|-------------|----------|------------------------|----------------------|---------|---------|
| Esteira | ✅ Rede + Capacitores | ✅ Inércia rolo + Molas deck | ❌ | ✅ Motor/Inversor | ❌ |
| Elíptico/Bike | ✅ Rede + Capacitores | ✅ Inércia volante + Molas | ❌ | ✅ Motor/Freio | ❌ |
| Remo (ar/água) | ✅ (monitor) | ✅ Inércia volante + Molas | ✅ (água) | ❌ | ❌ |
| Seletorizado | ❌ | ✅ Pilha pesos + Molas gás | ❌ | ❌ | ❌ |
| Plate-Loaded | ❌ | ✅ Discos + Molas gás | ❌ | ❌ | ❌ |
| Cabos/Polias | ❌ | ✅ Cabos tensionados + Molas | ❌ | ❌ | ❌ |
| Partida assistida | ❌ | ✅ **Mola a gás CRÍTICA** | ❌ | ❌ | ❌ |

---

## 5. PROCEDIMENTO PADRÃO LOTO (8 PASSOS)

### PASSO 1: NOTIFICAÇÃO E PLANEJAMENTO (Antes de iniciar)

1.1 **Notificar** todas as pessoas afetadas: "Equipamento [ID] será bloqueado para manutenção das HH:MM às HH:MM"
1.2 **Revisar** procedimento específico do equipamento (manual fabricante + POP do equipamento)
1.3 **Identificar** TODAS as fontes de energia e dispositivos de isolamento
1.4 **Preparar** dispositivos LOTO: cadeados (chave única por pessoa), etiquetas, hastes, travas
1.5 **Verificar** EPIs necessários para a tarefa

### PASSO 2: DESLIGAMENTO NORMAL (Shutdown Ordenado)

2.1 Operar equipamento **normalmente** até parar (não usar parada emergência exceto emergência real)
2.2 Cardio: Parar programa → Desligar painel → Aguardar parada completa do motor/volante
2.3 Musculação: Retornar pesos à posição de repouso (base) → Verificar estabilidade

### PASSO 3: ISOLAMENTO (Isolation - Físico)

| Fonte | Dispositivo de Isolamento | Ação |
|-------|---------------------------|------|
| Elétrica Rede | Plugue (tomada) | **Desplugar** + travar plugue com **cadeado plug-lock** ou travar disjuntor geral |
| Elétrica Rede | Disjuntor dedicado | Desligar disjuntor + **cadeado no manete** (disjuntor lockout) |
| Capacitores (Cardio) | Descarga interna | **Aguardar 5 min** após desplugar (tempo fabricante) → Verificar tensão zero com multímetro |
| Pilha Pesos (Seletorizado) | Pino de segurança base | Inserir **pino travamento** na base da pilha (furo dedicado) + cadeado |
| Molas a Gás (Partida Assistida) | Pino de travamento haste | Estender haste totalmente → Inserir **pino travamento** furo haste/cilindro + cadeado |
| Contrapesos Elevados | Trava mecânica | Baixar contrapeso totalmente → Travar com pino/cadeado |
| Discos (Plate-Loaded) | Remoção física | **Remover TODOS discos** → Guardar em local seguro fora zona perigo |
| Cabos Tensionados | Afrouxamento | Afrouxar tensionador completamente → Verificar folga total |
| Volantes/Inércia (Cardio) | Tempo | **Aguardar parada completa** (mín. 3 min esteira, 5 min elíptico/bike, 10 min remo ar) |

### PASSO 4: BLOQUEIO E ETIQUETAGEM (Lockout/Tagout)

4.1 **Cada pessoa autorizada** coloca **SEU PRÓPRIO CADEADO** em cada ponto de isolamento
- Cadeado: chave única, identificação (nome/ID), somente ele abre
- **NÃO** emprestar chave, **NÃO** usar cadeado de outro

4.2 Fixar **ETIQUETA** em cada ponto de isolamento contendo:
- **Nome** do responsável
- **Data/Hora** do bloqueio
- **Motivo**: "MANUTENÇÃO - NÃO LIGAR / NÃO OPERAR"
- **Contato** (telefone/rádio)
- **ART nº** (se manutenção com ART)

4.3 Etiqueta: material resistente (polímero), fixação à prova de intempéries (zip tie, arame, adesivo forte)

### PASSO 5: VERIFICAÇÃO DE ISOLAMENTO ZERO (Teste de Tentativa - CRÍTICO)

5.1 **Verificar que NINGUÉM** está em zona de perigo
5.2 Tentar **acionar** o equipamento normalmente:
- Cardio: Pressionar botão Liga/Iniciar → **NÃO DEVE LIGAR**
- Musculação: Tentar mover braço/alavanca → **NÃO DEVE MOVER** (pesos travados)
- Molas gás: Tentar mover parte assistida → **NÃO DEVE MOVER** (pino travando)
5.3 Cardio: Medir **tensão zero** nos terminais motor/entrada (multímetro)
5.4 **Documentar** verificação no checklist (assinalar "Teste Zero OK")

> ⚠️ **SE EQUIPAMENTO LIGAR/MOVER NO TESTE ZERO:** PARAR IMEDIATAMENTE. Revisar isolamento. Não prosseguir até isolamento efetivo.

### PASSO 6: EXECUÇÃO DA TAREFA

6.1 Realizar manutenção/inspeção conforme POP específico
6.2 **Manter** LOTO ativo durante **TODA** a duração da tarefa
6.3 Se **múltiplos turnos/pessoas**: cada um coloca seu cadeado (LOTO em grupo)
6.4 Se **saída temporária**: LOTO permanece; ao retornar, repetir **Passo 5**

### PASSO 7: REMOÇÃO DO LOTO (Somente após conclusão)

7.1 **Verificar**:
- Ferramentas/peças removidas da zona de perigo
- Proteções/carenagens **TODAS recolocadas** e parafusadas
- Pessoal **FORA** da zona de perigo
- Equipamento em condição segura para operar

7.2 **Remover** cadeados e etiquetas:
- **Apenas** quem colocou pode remover seu cadeado
- Se pessoa não disponível: **Somente Eng. Responsável** pode autorizar remoção (procedimento escrito, testemunhas, registro)

7.3 **Restaurar energia** na ordem inversa:
- Remover pinos travamento pesos/molas
- Conectar plugue / Ligar disjuntor
- Cardio: Ligar → Testar parada emergência → Teste funcional 2 min

### PASSO 8: NOTIFICAÇÃO DE RETORNO

8.1 Notificar pessoas afetadas: "Equipamento [ID] liberado para uso normal"
8.2 Registrar fim LOTO no checklist (hora, assinatura)
8.3 Arquivar etiquetas usadas (registro histórico)

---

## 6. LOTO EM GRUPO (Múltiplos Trabalhadores)

- **Haste multi-cadeados** (group lockout hasp) em cada ponto de isolamento
- **Cada trabalhador** coloca seu cadeado na haste
- Equipamento só energizado quando **ÚLTIMO cadeado** removido
- **Coordenador LOTO** designado (geralmente Eng. Responsável ou Técnico Sênior)
- Quadro de controle visual: foto equipe + cadeados + equipamento

---

## 7. SITUAÇÕES ESPECIAIS

### 7.1 Remoção de Cadeado por Terceiro (Pessoa Ausente)
**Somente com autorização escrita do Eng. Responsável:**
1. Tentar contato com pessoa (telefone, rádio, supervisor) - registrar tentativas
2. Verificar que pessoa **não está** em zona de perigo (busca visual, chamada)
3. Eng. Responsável autoriza por escrito (e-mail/WhatsApp com print + assinatura digital)
4. Remoção com **duas testemunhas** (nomes, assinaturas, hora)
5. Cadeado guardado, etiqueta arquivada
6. Pessoa notificada imediatamente ao retornar

### 7.2 Equipamento Sem Dispositivo de Isolamento Adequado
- **NÃO INICIAR** manutenção
- Requer **modificação/adequação** (instalar disjuntor, plugue travável, pino segurança)
- Registrar como **Não Conformidade Crítica** (RNC)
- Interditar equipamento até adequação

### 7.3 Manutenção com Equipamento Energizado (Exceção Rara)
**Somente se indispensável** (testes, ajustes finos, diagnóstico):
- Análise de risco escrita (ARA) assinada Eng. Responsável
- Procedimento específico escrito
- EPIs adicionais (luva isolante, face shield, roupa anti-chama)
- **Duas pessoas** mínimas (executor + observador com parada emergência)
- Área isolada, sinalizada
- Tempo mínimo energizado
- Registrar como exceção no laudo

---

## 8. TREINAMENTO

| Público | Conteúdo | Carga Horária | Frequência | Avaliação |
|---------|----------|---------------|------------|-----------|
| Pessoas Autorizadas (Técnicos, Engenheiros) | Completo: teoria + prática em cada tipo equipamento | 8h | Inicial + Anual (reciclagem 4h) | Teórica + Prática (simulado) |
| Pessoas Afetadas (Instrutores, Recepção, Limpeza) | Consciência: reconhecer LOTO, não remover, não operar bloqueado, quem chamar | 1h | Inicial + Anual | Teórica |

**Registro:** Certificado, lista presença, avaliação, arquivo 5 anos.

---

## 9. DISPOSITIVOS LOTO - ESPECIFICAÇÕES MÍNIMAS

| Item | Especificação | Qtd Mínima Kit |
|------|---------------|----------------|
| Cadeado LOTO | Aço/latão, chave única, corpo colorido (vermelho), haste 38-50mm, chave retida | 1 por pessoa + 2 reserva |
| Haste Multi-cadeados | Aço, 6-8 furos, haste 25mm | 2 por equipe |
| Cadeado Plug-lock | Para plugue IEC C13/C19 ou NEMA 5-15/5-20 | 2 por kit cardio |
| Trava Disjuntor | Universal (pino, grampo, manete) | 2 por kit |
| Pino Travamento Pilha | Aço inox 304, diâmetro conforme furo equipamento | 1 por modelo equipamento |
| Pino Travamento Mola Gás | Aço inox 304, diâmetro conforme furo haste | 1 por modelo equipamento |
| Etiquetas LOTO | Polímero 75x150mm, "PERIGO - NÃO OPERAR", campos preenchíveis, UV resistente | 50 por kit |
| Fitas Zip Tie / Arame | Nylon 6.6 UV resistente / Arame inox | 100 unid |
| Caneta Permanente | À prova d'água, ponta fina | 2 |
| Fita Zebrada | "CUIDADO - MANUTENÇÃO" 70mm x 100m | 1 rolo |
| Cones Sinalização | 50cm, laranja, refletivo | 4 |

---

## 10. CHECKLIST LOTO (Preencher em CADA intervenção)

| Etapa | Item | OK | Hora | Assinatura |
|-------|------|----|------|------------|
| 1 | Notificação pessoas afetadas feita | ☐ | | |
| 2 | Desligamento normal executado | ☐ | | |
| 3 | Isolamento: Elétrico (plug/disjuntor) | ☐ | | |
| 3 | Isolamento: Capacitores (tempo + teste tensão) | ☐ | | |
| 3 | Isolamento: Pilha pesos (pino base) | ☐ | | |
| 3 | Isolamento: Molas gás (pino haste) | ☐ | | |
| 3 | Isolamento: Discos removidos | ☐ | | |
| 3 | Isolamento: Cabos afrouxados | ☐ | | |
| 3 | Isolamento: Inércia (tempo espera) | ☐ | | |
| 4 | Bloqueio: Cadeados colocados (todos pontos) | ☐ | | |
| 4 | Etiquetagem: Todas fixadas, preenchidas | ☐ | | |
| 5 | **TESTE ZERO** executado e OK | ☐ | | |
| 6 | Tarefa executada com LOTO ativo | ☐ | | |
| 7 | Área limpa, proteções recolocadas | ☐ | | |
| 7 | Pessoal fora zona perigo | ☐ | | |
| 7 | Cadeados/etiquetas removidos (autorizados) | ☐ | | |
| 7 | Energia restaurada (ordem correta) | ☐ | | |
| 7 | Teste funcional pós-LOTO OK | ☐ | | |
| 8 | Notificação retorno feita | ☐ | | |

**Responsável LOTO (Coordenador):** _____________________ **CREA:** ___________
**Data:** __/__/____ **Hora Início:** __:__ **Hora Fim:** __:__
**ART nº:** _______________________

---

## 11. ANEXOS

- Anexo A: Fotos Dispositivos Isolamento por Tipo Equipamento
- Anexo B: Modelo Etiqueta LOTO (imprimir em polímero)
- Anexo C: Formulário Autorização Remoção Cadeado Terceiro
- Anexo D: Mapa Pontos Isolamento por Modelo Equipamento (colar na oficina)

---

## 12. HISTÓRICO DE REVISÕES

| Rev | Data | Autor | Alteração |
|-----|------|-------|-----------|
| 00 | __/__/____ | Eng. Responsável | Emissão inicial |

---

**APROVAÇÃO:**

Elaborado por: ___________________________ Data: __/__/____
(Engenheiro Responsável Técnico - CREA: __________)

Aprovado por: ___________________________ Data: __/__/____
(Gestor/Proprietário)

**VIGÊNCIA:** 12 meses | **PRÓXIMA REVISÃO:** __/__/____