# Sistema Web Boaretto - BackEnd

## Tabelas Implementadas

As seguintes tabelas foram criadas e estão todas implementadas no sistema. Cada tabela possui uma rota específica para acesso via API:

1. **fabcomp_tipo_tora**
    - **Rota:** `/v1/tipotora?limit=10&page=1`
    - **Descrição:** Gerencia os tipos de tora utilizados no sistema.

2. **grupo_estoque**
    - **Rota:** `/v1/grupoestoque?limit=10&page=1`
    - **Descrição:** Controla os grupos de estoque disponíveis.

3. **subgrupo_estoque**
    - **Rota:** `/v1/subgrupoestoque?limit=10&page=1`
    - **Descrição:** Gerencia os subgrupos dentro dos grupos de estoque.

4. **fabcomp_tipomaterial**
    - **Rota:** `/v1/tipomaterial?limit=10&page=1`
    - **Descrição:** Administra os diferentes tipos de materiais.

5. **fabcomp_sg1_tm**
    - **Rota:** `/v1/sg1tm?limit=10&page=1`
    - **Descrição:** Controla o primeiro nível de subgrupos de materiais.

6. **fabcomp_sg2_tm**
    - **Rota:** `/v1/sg2tm?limit=10&page=1`
    - **Descrição:** Gerencia o segundo nível de subgrupos de materiais.

7. **fabcomp_tm_subgrupo1**
    - **Rota:** `/v1/tmsubgrupo1?limit=10&page=1`
    - **Descrição:** Administra a relação entre tipos de materiais e o primeiro nível de subgrupos.

8. **fabcomp_tm_subgrupo2**
    - **Rota:** `/v1/tmsubgrupo2?limit=10&page=1`
    - **Descrição:** Administra a relação entre tipos de materiais e o segundo nível de subgrupos.

9. **fabcomp_turnos**
    - **Rota:** `/v1/turnos?limit=10&page=1`
    - **Descrição:** Gerencia os turnos de trabalho no sistema.

10. **folha_rubricas**
    - **Rota:** `/v1/folharubricas?limit=10&page=1`
    - **Descrição:** Gerencia as rubricas da folha de pagamento.

11. **folha_funcoes**
    - **Rota:** `/v1/folhafuncoes?limit=10&page=1`
    - **Descrição:** Administra as funções dos colaboradores.

12. **folha_setores**
    - **Rota:** `/v1/folhasetores?limit=10&page=1`
    - **Descrição:** Controla os setores da empresa.

13. **folha_funcionarios**
    - **Rota:** `/v1/folhafuncionarios?limit=10&page=1`
    - **Descrição:** Gerencia os dados dos funcionários da empresa.

14. **extratores**
    - **Rota:** `/v1/extratores?limit=10&page=1`
    - **Descrição:** Gerencia os dados dos extratores.

15. **tipopessoa**
    - **Rota:** `/v1/tipopessoa?limit=10&page=1`
    - **Descrição:** Gerencia os tipos de pessoas no sistema.

16. **grupoveiculos**
    - **Rota:** `/v1/grupoveiculos?limit=10&page=1`
    - **Descrição:** Administra os grupos de veículos.

17. **gruposdespesas**
    - **Rota:** `/v1/gruposdespesas?limit=10&page=1`
    - **Descrição:** Controla os grupos de despesas.

18. **folhariscos**
    - **Rota:** `/v1/folhariscos?limit=10&page=1`
    - **Descrição:** Gerencia os dados de riscos.
