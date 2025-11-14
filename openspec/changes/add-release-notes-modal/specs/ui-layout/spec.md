## ADDED Requirements
### Requirement: Release Notes Modal
L'applicazione SHALL mostrare una modale informativa con le novità quando viene caricata una nuova versione contrassegnata da release notes curate nel file YAML.

#### Scenario: Modale dopo un aggiornamento
- **GIVEN** esiste una release note con versione `X` nel file YAML
- **AND** l'utente non ha ancora visualizzato la versione `X`
- **WHEN** la PWA viene aggiornata e ricaricata
- **THEN** compare una modale con titolo, versione e contenuto della release
- **AND** il contenuto mostra il testo markdown convertito in HTML

#### Scenario: Persistenza dopo chiusura
- **GIVEN** la modale di release `X` è visibile
- **WHEN** l'utente la chiude
- **THEN** la versione `X` viene salvata in localStorage come "vista"
- **AND** la modale non viene più mostrata finché non esiste una release con versione diversa
