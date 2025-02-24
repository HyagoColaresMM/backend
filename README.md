# Sistema Web Boaretto - BackEnd

## Tabelas Implementadas

As seguintes tabelas foram criadas e estão todas implementadas no sistema. Cada tabela possui uma rota específica para acesso via API:

1. **fabcomp_tipo_tora**
    - **Rota:** `/v1/tipotora`
    - **Descrição:** Gerencia os tipos de tora utilizados no sistema.

2. **grupo_estoque**
    - **Rota:** `/v1/grupoestoque`
    - **Descrição:** Controla os grupos de estoque disponíveis.

3. **subgrupo_estoque**
    - **Rota:** `/v1/subgrupoestoque`
    - **Descrição:** Gerencia os subgrupos dentro dos grupos de estoque.

4. **fabcomp_tipomaterial**
    - **Rota:** `/v1/tipomaterial`
    - **Descrição:** Administra os diferentes tipos de materiais.

5. **fabcomp_sg1_tm**
    - **Rota:** `/v1/sg1tm`
    - **Descrição:** Controla o primeiro nível de subgrupos de materiais.

6. **fabcomp_sg2_tm**
    - **Rota:** `/v1/sg2tm`
    - **Descrição:** Gerencia o segundo nível de subgrupos de materiais.

7. **fabcomp_tm_subgrupo1**
    - **Rota:** `/v1/tmsubgrupo1`
    - **Descrição:** Administra a relação entre tipos de materiais e o primeiro nível de subgrupos.

8. **fabcomp_tm_subgrupo2**
    - **Rota:** `/v1/tmsubgrupo2`
    - **Descrição:** Administra a relação entre tipos de materiais e o segundo nível de subgrupos.

9. **fabcomp_turnos**
    - **Rota:** `/v1/turnos`
    - **Descrição:** Gerencia os turnos de trabalho no sistema.
