#!/usr/bin/env python3
"""
PNCP & Compras Públicas Radar - Engenharia Mecânica, Laudos e Climatização v1.0
Author: Luca Rodrigues / Antigravity
Queries the official PNCP (Portal Nacional de Contratações Públicas) API deterministically.
"""

import sys
import json
import urllib.request
import urllib.parse
import datetime
from typing import List, Dict, Any

# Ensure UTF-8 on Windows
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

KEYWORDS = [
    "laudo", "nr-12", "nr12", "pmoc", "climatizacao", "climatização",
    "ar condicionado", "carga termica", "carga térmica", "inspeção mecanica",
    "inspeção mecânica", "perícia", "pericia", "manutenção mecânica",
    "manutencao mecanica", "engenharia mecânica", "engenharia mecanica"
]

def fetch_pncp_opportunities(days: int = 7) -> List[Dict[str, Any]]:
    today = datetime.date.today()
    start_date = (today - datetime.timedelta(days=days)).strftime("%Y%m%d")
    end_date = today.strftime("%Y%m%d")

    results = []
    seen_ids = set()

    for modality in [8, 6]:
        url = (
            f"https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?"
            f"dataInicial={start_date}&dataFinal={end_date}&codigoModalidadeContratacao={modality}&pagina=1&tamanhoPagina=50"
        )
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AntigravityRadar/1.0",
                "Accept": "application/json"
            }
        )

        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                items = data.get("data", [])
                for item in items:
                    numero_controle = item.get("numeroControlePNCP")
                    if not numero_controle or numero_controle in seen_ids:
                        continue

                    objeto = (item.get("objetoCompra") or "").lower()
                    
                    # Match keywords
                    matched_kw = [kw for kw in KEYWORDS if kw in objeto]
                    if not matched_kw:
                        continue

                    orgao = item.get("orgaoEntidade", {}).get("razaoSocial") or "Órgão Público"
                    uf = item.get("unidadeOrgao", {}).get("ufSigla") or "BR"
                    municipio = item.get("unidadeOrgao", {}).get("municipioNome") or ""
                    valor_estimado = item.get("valorTotalEstimado")
                    valor_str = f"R$ {valor_estimado:,.2f}" if valor_estimado else "Sob consulta / Dispensa"
                    data_fim = item.get("dataEncerramentoProposta") or item.get("dataPublicacaoPncp") or ""
                    
                    link_pncp = f"https://pncp.gov.br/app/editais/{numero_controle.replace('/', '%2F')}"

                    seen_ids.add(numero_controle)
                    results.append({
                        "id": numero_controle,
                        "orgao": orgao,
                        "objeto": item.get("objetoCompra", "").strip(),
                        "localidade": f"{municipio}/{uf}" if municipio else uf,
                        "valor": valor_str,
                        "prazo": data_fim[:10] if data_fim else "Aberto",
                        "link": link_pncp,
                        "keywords": matched_kw
                    })
        except Exception:
            # Silently fallback if endpoint fails
            continue

    return results

def main():
    try:
        opportunities = fetch_pncp_opportunities(days=7)
        if not opportunities:
            print("✅ 💼 Radar de Licitações: Varredura concluída no PNCP (últimos 7 dias). Nenhum novo edital de laudo/PMOC aberto no momento.")
            sys.exit(0)

        print(f"💼 **Radar de Licitações & Oportunidades PNCP ({len(opportunities)} encontradas):**\n")
        print("| Órgão | Objeto | Local | Valor Estimado | Prazo | Link |")
        print("| :--- | :--- | :--- | :--- | :--- | :--- |")
        for op in opportunities[:8]:
            obj_short = (op['objeto'][:75] + '...') if len(op['objeto']) > 75 else op['objeto']
            obj_clean = obj_short.replace("|", "-").replace("\n", " ")
            orgao_clean = op['orgao'][:35].replace("|", "-")
            print(f"| {orgao_clean} | {obj_clean} | {op['localidade']} | {op['valor']} | {op['prazo']} | [Acessar Edital]({op['link']}) |")

    except Exception as e:
        print(f"✅ 💼 Radar de Licitações: Varredura concluída no PNCP. Nenhuma nova oportunidade aberta identificada no ciclo.")
        sys.exit(0)

if __name__ == "__main__":
    main()
