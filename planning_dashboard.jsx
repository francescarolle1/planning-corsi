import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function PlanningDashboard() {
  const [filtroInsegnante, setFiltroInsegnante] = useState('');
  const [filtroGiorno, setFiltroGiorno] = useState('');
  const [ricerca, setRicerca] = useState('');
  const [corsoSelezionato, setCorsoSelezionato] = useState(null);

  const coloriInsegnanti = {
    'Diletta': { bg: '#FFE5B4', text: '#8B6914', border: '#D4A574' },
    'Cristina/Chiara': { bg: '#B4D7FF', text: '#1F4788', border: '#7BA8E0' },
    'Alessandra': { bg: '#D4FFB4', text: '#2F7C2F', border: '#A8E0A8' },
    'Fabio': { bg: '#FFB4D4', text: '#7C1F4F', border: '#E0A8C8' },
    'Cristina/Daniele': { bg: '#E5D4FF', text: '#4F1F7C', border: '#C8A8E0' },
    'Ginevra': { bg: '#FFD4B4', text: '#8B4513', border: '#E0A874' },
    'Sandro': { bg: '#B4FFE5', text: '#1F6B4F', border: '#7AE0C0' }
  };

  const corsi = [
    { nome: 'SM', giorno: 'Martedì', ora: '09:00–11:30', insegnante: 'Alessandra', categoria: 'Adulti' },
    { nome: 'CH', giorno: 'Sabato', ora: '09:00–11:30', insegnante: 'Alessandra', categoria: 'Bambini' },
    { nome: 'JT_ADV', giorno: 'Lunedì', ora: '17:00–18:30', insegnante: 'Cristina/Chiara', categoria: 'Adolescenti' },
    { nome: 'J_BASE', giorno: 'Martedì', ora: '17:00–18:30', insegnante: 'Diletta', categoria: 'Bambini' },
    { nome: 'J_BASE', giorno: 'Mercoledì', ora: '17:00–18:30', insegnante: 'Diletta', categoria: 'Bambini' },
    { nome: 'SM aggiuntivo', giorno: 'Mercoledì', ora: '17:00–18:30 (saletta)', insegnante: 'Alessandra', categoria: 'Adulti' },
    { nome: 'Tra Palco e Lealtà', giorno: 'Giovedì', ora: '17:00–18:30', insegnante: 'Sandro', categoria: 'Inclusivo' },
    { nome: 'J_INT', giorno: 'Lunedì', ora: '18:30–20:30', insegnante: 'Cristina/Chiara', categoria: 'Adolescenti' },
    { nome: 'T_BASE (aggiuntivo)', giorno: 'Martedì', ora: '18:30–20:30', insegnante: 'Diletta', categoria: 'Adolescenti' },
    { nome: 'T_ADV', giorno: 'Mercoledì', ora: '18:30–20:30', insegnante: 'Ginevra', categoria: 'Adolescenti' },
    { nome: 'S_BASE', giorno: 'Lunedì', ora: '20:30–22:30', insegnante: 'Cristina/Daniele', categoria: 'Adulti' },
    { nome: 'S_INT', giorno: 'Mercoledì', ora: '20:30–22:30', insegnante: 'Ginevra', categoria: 'Adulti' },
    { nome: 'DIZ', giorno: 'Lunedì', ora: '20:30–22:30 (saletta)', insegnante: 'Fabio', categoria: 'Adulti' }
  ];

  const giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const insegnanti = [...new Set(corsi.map(c => c.insegnante))].sort();

  // Filtraggio
  let corsiFiltratiPerGiorno = [...corsi];
  
  if (filtroInsegnante) {
    corsiFiltratiPerGiorno = corsiFiltratiPerGiorno.filter(c => c.insegnante === filtroInsegnante);
  }
  
  if (ricerca) {
    corsiFiltratiPerGiorno = corsiFiltratiPerGiorno.filter(c => 
      c.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
      c.insegnante.toLowerCase().includes(ricerca.toLowerCase())
    );
  }

  // Costruisci griglia per giorno
  const corsiPerGiorno = {};
  giorni.forEach(g => { corsiPerGiorno[g] = []; });
  corsiFiltratiPerGiorno.forEach(c => {
    if (corsiPerGiorno[c.giorno]) {
      corsiPerGiorno[c.giorno].push(c);
    }
  });

  // Statistiche
  const statsInsegnanti = {};
  insegnanti.forEach(i => {
    statsInsegnanti[i] = corsi.filter(c => c.insegnante === i).length;
  });

  return (
    <div style={{ padding: '20px', background: 'var(--surface-0)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
            🎭 Planning Settimanale 2026/2027
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Scuola di Teatro Messinscena - Caselette
          </p>
        </div>

        {/* Filtri */}
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Filtra e Cerca
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {/* Ricerca */}
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '10px', width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Cerca corso o insegnante..."
                value={ricerca}
                onChange={(e) => setRicerca(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Filtro Insegnante */}
            <select
              value={filtroInsegnante}
              onChange={(e) => setFiltroInsegnante(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'var(--surface-2)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Tutti gli insegnanti</option>
              {insegnanti.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>

            {/* Reset */}
            {(filtroInsegnante || ricerca) && (
              <button
                onClick={() => { setFiltroInsegnante(''); setRicerca(''); }}
                style={{
                  padding: '10px 16px',
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: 'var(--text-primary)'
                }}
              >
                <X style={{ width: '16px', height: '16px' }} /> Azzera filtri
              </button>
            )}
          </div>
        </div>

        {/* Griglia principale */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {giorni.map(giorno => (
            <div key={giorno} style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '16px',
              minHeight: '400px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                {giorno}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {corsiPerGiorno[giorno].length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic' }}>
                    Nessun corso
                  </p>
                ) : (
                  corsiPerGiorno[giorno].map((corso, idx) => {
                    const colore = coloriInsegnanti[corso.insegnante];
                    return (
                      <div
                        key={idx}
                        onClick={() => setCorsoSelezionato(corso)}
                        style={{
                          background: colore.bg,
                          border: `2px solid ${colore.border}`,
                          borderRadius: '8px',
                          padding: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ fontWeight: '600', fontSize: '13px', color: colore.text, marginBottom: '4px' }}>
                          {corso.nome}
                        </div>
                        <div style={{ fontSize: '12px', color: colore.text, opacity: 0.85, marginBottom: '4px' }}>
                          {corso.ora}
                        </div>
                        <div style={{ fontSize: '11px', color: colore.text, opacity: 0.9 }}>
                          👨‍🏫 {corso.insegnante}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Statistiche */}
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
            📊 Statistiche Insegnanti
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {insegnanti.map(insegnante => {
              const colore = coloriInsegnanti[insegnante];
              const count = statsInsegnanti[insegnante];
              return (
                <div key={insegnante} style={{
                  background: colore.bg,
                  border: `1px solid ${colore.border}`,
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', fontSize: '13px', color: colore.text, marginBottom: '4px' }}>
                    {insegnante}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: colore.text }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '11px', color: colore.text, opacity: 0.85 }}>
                    {count === 1 ? 'corso' : 'corsi'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal dettagli */}
        {corsoSelezionato && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setCorsoSelezionato(null)}>
            <div
              style={{
                background: 'var(--surface-2)',
                borderRadius: '12px',
                padding: '30px',
                maxWidth: '400px',
                width: '90%',
                border: `2px solid ${coloriInsegnanti[corsoSelezionato.insegnante].border}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {corsoSelezionato.nome}
                </h2>
                <button
                  onClick={() => setCorsoSelezionato(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    Giorno
                  </label>
                  <p style={{ fontSize: '16px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    {corsoSelezionato.giorno}
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    Orario
                  </label>
                  <p style={{ fontSize: '16px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    {corsoSelezionato.ora}
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    Insegnante
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: coloriInsegnanti[corsoSelezionato.insegnante].text,
                    marginTop: '4px',
                    fontWeight: '600'
                  }}>
                    {corsoSelezionato.insegnante}
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    Categoria
                  </label>
                  <p style={{ fontSize: '16px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    {corsoSelezionato.categoria}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '30px' }}>
          <p>Contatti: formazione@teatrocaselette.it</p>
        </div>
      </div>
    </div>
  );
}