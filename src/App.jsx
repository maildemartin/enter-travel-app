import React, { useState, useEffect } from 'react';

// --- ESTILOS DEL BRAND KIT ---
const BrandStyles = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
    <style>{`
      :root {
        --font-title: 'Oswald', sans-serif;
        --font-body: 'Open Sans', sans-serif;
        --primary: #222222;
        --secondary: #444444;
        --text-title: #000000;
        --accent: #FD5C5A;
      }
      body, .font-body {
        font-family: var(--font-body);
      }
      .font-title {
        font-family: var(--font-title);
        font-size: clamp(1.5rem, 1.3rem + 0.8vw, 2.1rem);
        font-weight: 700;
        text-transform: uppercase;
        line-height: 1em;
        color: var(--text-title);
      }
      .header-title {
         font-family: var(--font-title);
         font-size: clamp(2.1rem, 1.9154rem + 0.8205vw, 3rem);
         text-transform: uppercase;
         line-height: 1em;
         color: var(--text-title);
         font-weight: 700;
      }
       .sidebar-logo {
        font-family: var(--font-title);
        font-weight: 700;
        font-size: 1.75rem;
        color: var(--primary);
       }
       .sidebar-logo span {
        color: #9ca3af; /* gray-400 */
       }
    `}</style>
  </>
);


// Helper para combinar clases de Tailwind CSS
const classNames = (...classes) => classes.filter(Boolean).join(' ');

// Íconos SVG para evitar dependencias externas y asegurar la visualización
const icons = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  roadmap: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 014 3h12a1 1 0 01.707 1.707L10 11.414 3.293 4.707A1 1 0 013 4V3a1 1 0 01.707-.707z" clipRule="evenodd" /></svg>,
  transfers: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18.303 8.293A1 1 0 0017 8H3a1 1 0 00-.978 1.217l.002.004 3 9A1 1 0 006 19h8a1 1 0 00.976-.779l3-9a1 1 0 00-.673-1.221zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm6.293-4.293A1 1 0 0112 2h2a1 1 0 110 2h-2a1 1 0 01-.707-.293l-1-1a1 1 0 010-1.414l1-1z" clipRule="evenodd" /></svg>,
  alojamiento: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  tours: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.528-1.973 6.012 6.012 0 01-1.912 2.706C12.488 8.27 12.026 8 11.5 8A1.5 1.5 0 0110 6.5V6a2 2 0 00-4 0 2 2 0 01-1.528 1.973z" clipRule="evenodd" /></svg>,
  actividades: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-3.5-3.5V6a3.5 3.5 0 017 0v6.5A3.5 3.5 0 015.5 16zM18 6a1 1 0 00-1.447-.894L13 6.5v1.293l3.553-1.686A1 1 0 0018 6zm-2.5 8.5a4.5 4.5 0 117.876-2.525.5.5 0 00-.312-.81l-1.5-.3a.5.5 0 00-.51.248l-.5 1a.5.5 0 00.13.625l1 1a.5.5 0 00.625.13l1-.5a.5.5 0 00.248-.51l-.3-1.5a.5.5 0 00-.81-.312A4.5 4.5 0 0115.5 14.5z" /></svg>,
  cotizaciones: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2.5l7.997 3.384A1 1 0 0119 6.81V17a1 1 0 01-1 1h-5a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V6.81a1 1 0 01.997-.926zM12 13a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-4 0a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /></svg>,
  reservas: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>,
  clientes: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 5.559a3.5 3.5 0 10-2.882 0c-2.262.28-4.282 1.94-4.54 4.242.024.09.049.18.077.268A1.5 1.5 0 003 18h6a1.5 1.5 0 001.441-1.932.05.05 0 01.077-.268c-.258-2.303-2.278-3.962-4.54-4.242zM16.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM18 16a1 1 0 00-1.447-.894l-1.414 1.414-1.414-1.414a1 1 0 10-1.414 1.414l2.121 2.121a1 1 0 001.414 0l2.121-2.121A1 1 0 0018 16z" /></svg>,
  propuestas: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>,
  proveedores: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.228 9.034a1.5 1.5 0 102.106 2.106 1.5 1.5 0 00-2.106-2.106z" /><path fillRule="evenodd" d="M15.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.213-1.212l1-3a1 1 0 01.242-.391l9-9zM14 6l2-2-1-1-2 2 1 1z" clipRule="evenodd" /></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
  expedientes: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>,
  financiero: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.196.567-.267v8.695a.75.75 0 01-1.5 0V7.151c.151.07.292.15.433.267zM11.567 7.151v8.695a.75.75 0 001.5 0V7.418c-.158-.103-.346-.196-.567-.267-.151.07-.292.15-.433.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v.5c0 .414.336.75.75.75s.75-.336.75-.75v-.5z" clipRule="evenodd" /></svg>,
  trash: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  plus: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>,
};


// --- DATOS DE EJEMPLO ---
const mockData = {
  dashboard: {
    kpis: [
      { title: 'Conductores Activos', value: '8', change: '+2', changeType: 'neutral' },
      { title: 'Reservas Hoy', value: '24', change: '+12%', changeType: 'positive' },
      { title: 'Clientes Activos', value: '156', change: '+8%', changeType: 'positive' },
      { title: 'Ingresos del Mes', value: '$12,450', change: '+15%', changeType: 'positive' },
    ],
    quickActions: [
      { title: 'Agregar Reserva', description: 'Crea un nuevo viaje para un cliente', primary: true },
      { title: 'Enviar Cotización', description: 'Genera y envía una nueva propuesta', primary: true },
    ],
    recentActivity: [
      { text: 'Nueva reserva de Carlos Rodriguez para traslado al aeropuerto', time: 'Hace 5 minutos' },
      { text: 'María González cambió su estado a disponible', time: 'Hace 12 minutos' },
      { text: 'Nuevo cliente registrado: Ana Martínez', time: 'Hace 25 minutos' },
      { text: 'Propuesta de viaje generada para familia López', time: 'Hace 1 hora' },
    ],
    fleetStatus: [
      { status: 'Disponibles', count: 4, color: 'bg-green-500' },
      { status: 'Ocupados', count: 2, color: 'bg-yellow-500' },
      { status: 'Desconectados', count: 1, color: 'bg-red-500' },
      { status: 'Mantenimiento', count: 1, color: 'bg-indigo-500' },
    ],
  },
  users: [
    { id: 'USR-001', fullName: 'Martín Miguel', email: 'martin.miguel@email.com', role: 'Administrador', status: 'Activo' },
    { id: 'USR-002', fullName: 'Ana García', email: 'ana.garcia@email.com', role: 'Agente de Ventas', status: 'Activo' },
    { id: 'USR-003', fullName: 'Carlos Rodriguez', email: 'carlos.rodriguez@email.com', role: 'Operador', status: 'Inactivo' },
  ],
  drivers: [
    { name: 'Carlos Rodriguez', status: 'Disponible', vehicle: 'Toyota Camry 2022', rating: 4.8, trips: 123, details: 'Conductor experimentado, excelente conocimiento de la ciudad.', capacity: 4 },
    { name: 'María González', status: 'Ocupado', vehicle: 'Honda Accord 2021', rating: 4.9, trips: 210, details: 'Conductora muy profesional con excelentes reseñas de clientes.', capacity: 4 },
    { name: 'Roberto Silva', status: 'Disponible', vehicle: 'Mercedes-Benz C-Class', rating: 5.0, trips: 88, details: 'Conductor premium con servicio de lujo especializado en servicios VIP.', capacity: 4 },
    { name: 'Ana Martínez', status: 'Disponible', vehicle: 'Ford Explorer 2023', rating: 4.7, trips: 95, details: 'Especialista en traslados grupales y familiares. Bilingüe.', capacity: 6 },
    { name: 'Diego Fernández', status: 'Desconectado', vehicle: 'Chevrolet Suburban 2021', rating: 4.6, trips: 150, details: 'Conductor de confianza. Conoce muy bien las rutas al aeropuerto.', capacity: 6 },
    { name: 'Carmen López', status: 'Mantenimiento', vehicle: 'Mercedes Sprinter', rating: 4.9, trips: 180, details: 'Experta en movilidad urbana y traslados corporativos.', capacity: 15 },
  ],
  reservations: [
    { id: 'TRV-801', client: 'Juan Perez', details: 'Aeropuerto Internacional -> Hotel Marriott', date: '2024-08-24 14:30', passengers: 2, status: 'Confirmado', saleValue: 75, profit: 35, type: 'Transfer' },
    { id: 'TRV-802', client: 'Maria Garcia', details: 'Aeropuerto Internacional -> Centro Comercial Plaza', date: '2024-08-24 15:45', passengers: 4, status: 'Pendiente', saleValue: 90, profit: 40, type: 'Transfer' },
    { id: 'A-101', client: 'Roberto Silva', details: 'Hotel Marriott Downtown (3 noches)', date: '2024-08-20', passengers: 2, status: 'Completado', saleValue: 675, profit: 67.5, type: 'Alojamiento' },
    { id: 'T-201', client: 'Roberto Silva', details: 'City Walking Tour - Centro Histórico', date: '2024-08-22', passengers: 2, status: 'Completado', saleValue: 90, profit: 50, type: 'Tour' },
    { id: 'AC-301', client: 'Diego Fernández', details: 'Cena en Restaurante El Mirador', date: '2024-08-23', passengers: 2, status: 'Confirmado', saleValue: 190, profit: 90, type: 'Actividad' },
  ],
  proposals: [
    { id: 'PROP-101', client: 'Familia Martinez', destination: 'Orlando, Florida', status: 'Enviada', date: '2024-08-20', value: 4500 },
    { id: 'PROP-102', client: 'Diego Fernández', destination: 'Bali, Indonesia', status: 'Aceptada', date: '2024-08-18', value: 8200 },
    { id: 'PROP-103', client: 'Laura Gómez', destination: 'Cancún, México', status: 'Esperando Respuesta', date: '2024-08-15', value: 3100 },
    { id: 'PROP-104', client: 'Roberto Silva', destination: 'París, Francia', status: 'Aceptada', date: '2024-08-12', value: 6750 },
    { id: 'PROP-105', client: 'Carlos López', destination: 'Tokio, Japón', status: 'Rechazada', date: '2024-08-10', value: 12500 },
  ],
  clients: [
    { id: 'CL-001', fullName: 'Roberto Silva', email: 'roberto.silva@email.com', phone: '5491123456789', city: 'Paris', country: 'Francia', status: 'Contactado', details: 'Luna de miel, hoteles de lujo', contractedServices: ['Alojamiento', 'Tour'] },
    { id: 'CL-002', fullName: 'Familia Martinez', email: 'familia.martinez@email.com', phone: '5215512345678', city: 'Orlando', country: 'EE.UU.', status: 'Propuesta Enviada', details: 'Parques temáticos, actividades para niños', contractedServices: ['Alojamiento', 'Actividades'] },
    { id: 'CL-003', fullName: 'Carlos López', email: 'carlos.lopez@email.com', phone: '818012345678', city: 'Tokio', country: 'Japón', status: 'Canceló', details: 'Conferencias de tecnología, hoteles cerca del centro', contractedServices: [] },
    { id: 'CL-004', fullName: 'Maria González', email: 'maria.gonzalez@email.com', phone: '51987654321', city: 'Cusco', country: 'Perú', status: 'Reservado', details: 'Trekking, guías especializados, equipo de montaña', contractedServices: ['Tour', 'Transfer'] },
    { id: 'CL-005', fullName: 'Diego Fernández', email: 'diego.fernandez@email.com', phone: '6281234567890', city: 'Bali', country: 'Indonesia', status: 'Propuesta Enviada', details: 'Resort con spa, actividades de relajación', contractedServices: ['Alojamiento', 'Actividad'] },
  ],
  roadmap: [
    { phase: 'Base Actual', title: 'Sistema de Transfers', status: 'Completado', description: 'Sistema completo de gestión de conductores, reservas y clientes básicos.' },
    { phase: 'Fase 1', title: 'Expansión de Servicios Básicos', status: 'Completado', description: 'Agregar gestión de hoteles, tours y actividades al sistema existente.' },
    { phase: 'Fase 2', title: 'Sistema de Cotizaciones Inteligente', status: 'En Progreso', description: 'Templates personalizables y generación automática de propuestas profesionales.' },
    { phase: 'Fase 3', title: 'Gestión de Proveedores & Comisiones', status: 'Planificado', description: 'Sistema completo para manejar la tercerización y estructuras de costos.' },
    { phase: 'Fase 4', title: 'Calendario & Disponibilidad Inteligente', status: 'Planificado', description: 'Sistema de calendario integrado con seguimiento de vehículos.' },
    { phase: 'Fase 5', title: 'Automatizaciones Avanzadas', status: 'Futuro', description: 'IA y automatizaciones para servicio personalizado invisible.' },
  ],
  accommodations: [
    { name: 'Hotel Marriott Downtown', type: 'Hotel', price: 225, cost: 202.5, rating: 4, available: true, commission: 10 },
    { name: 'Sunset Beach Resort', type: 'Posada', price: 450, cost: 396, rating: 5, available: true, commission: 12 },
    { name: 'Urban Loft Apartments', type: 'Departamento Temporario', price: 164, cost: 150.88, rating: 4, available: true, commission: 8 },
    { name: 'Casa Bella Vista', type: 'Hotel', price: 658, cost: 559.3, rating: 5, available: false, commission: 15 },
    { name: 'The Wanderer Hostel', type: 'Hostel', price: 45, cost: 42.75, rating: 3, available: true, commission: 5 },
  ],
  accommodationSales: [
    { id: 'A-101', clientName: 'Roberto Silva', accommodationName: 'Hotel Marriott Downtown', saleDate: '2024-08-20', nights: 3, saleValue: 675, commission: 67.5 },
    { id: 'A-102', clientName: 'Maria González', accommodationName: 'Sunset Beach Resort', saleDate: '2024-08-22', nights: 5, saleValue: 2250, commission: 270 },
    { id: 'A-103', clientName: 'Familia Martinez', accommodationName: 'Urban Loft Apartments', saleDate: '2024-07-15', nights: 7, saleValue: 1148, commission: 91.84 },
    { id: 'A-104', clientName: 'Carlos López', accommodationName: 'The Wanderer Hostel', saleDate: '2024-07-30', nights: 10, saleValue: 450, commission: 22.5 },
  ],
  tours: [
    { name: 'City Walking Tour - Centro Histórico', type: 'Ciudad', price: 45, cost: 20, duration: '3 horas', available: true },
    { name: 'Aventura en Montaña - Senderismo', type: 'Aventura', price: 105, cost: 50, duration: '8 horas', available: true },
    { name: 'Tour Gastronómico - Sabores Locales', type: 'Gastronomía', price: 88, cost: 45, duration: '4 horas', available: false },
    { name: 'Patrimonio Cultural - Museos y Arte', type: 'Cultural', price: 70, cost: 30, duration: '5 horas', available: true },
  ],
  tourSales: [
    { id: 'T-201', clientName: 'Roberto Silva', tourName: 'City Walking Tour - Centro Histórico', saleDate: '2024-08-18', passengers: 2, saleValue: 90, profit: 50 },
    { id: 'T-202', clientName: 'Maria González', tourName: 'Aventura en Montaña - Senderismo', saleDate: '2024-08-21', passengers: 4, saleValue: 420, profit: 220 },
    { id: 'T-203', clientName: 'Familia Martinez', tourName: 'Patrimonio Cultural - Museos y Arte', saleDate: '2024-07-25', passengers: 4, saleValue: 280, profit: 160 },
  ],
  activities: [
    { name: 'Cena en Restaurante El Mirador', type: 'Restaurante', price: 95, cost: 50, duration: '2-3 horas', available: true },
    { name: 'Show de Flamenco Tradicional', type: 'Espectáculo', price: 60, cost: 25, duration: '90 minutos', available: true },
    { name: 'Clase de Surf para Principiantes', type: 'Deporte', price: 80, cost: 40, duration: '3 horas', available: false },
    { name: 'Tour Nocturno de Bares', type: 'Ocio Nocturno', price: 50, cost: 15, duration: '4 horas', available: true },
  ],
  activitySales: [
    { id: 'AC-301', clientName: 'Diego Fernández', activityName: 'Cena en Restaurante El Mirador', saleDate: '2024-08-19', passengers: 2, saleValue: 190, profit: 90 },
    { id: 'AC-302', clientName: 'Carlos López', activityName: 'Show de Flamenco Tradicional', saleDate: '2024-08-20', passengers: 4, saleValue: 240, profit: 140 },
  ],
  services: [
    { id: 1, names: { es: 'Transfer Aeropuerto IN/OUT', pt: 'Transfer Aeroporto IN/OUT', en: 'Airport Transfer IN/OUT' }, descriptions: { es: "Servicio de traslado privado desde o hacia el aeropuerto principal. Incluye recepción con cartel y espera de hasta 60 minutos.", pt: "Serviço de transfer privado de ou para o aeroporto principal. Inclui recepção com placa e espera de até 60 minutos.", en: "Private transfer service to or from the main airport. Includes reception with a sign and up to 60 minutes of waiting time." }, links: { es: "https://example.com/es/transfer-aeropuerto", pt: "https://example.com/pt/transfer-aeroporto", en: "https://example.com/en/airport-transfer" } },
    { id: 2, names: { es: 'Transfer Urbano', pt: 'Transfer Urbano', en: 'Urban Transfer' }, descriptions: { es: "Traslado punto a punto dentro de la ciudad. Ideal para moverse entre hoteles, restaurantes y atracciones.", pt: "Transfer ponto a ponto dentro da cidade. Ideal para se deslocar entre hotéis, restaurantes e atrações.", en: "Point-to-point transfer within the city. Ideal for moving between hotels, restaurants, and attractions." }, links: { es: "https://example.com/es/transfer-urbano", pt: "https://example.com/pt/transfer-urbano", en: "https://example.com/en/urban-transfer" } },
    { id: 3, names: { es: 'Disposición por Horas', pt: 'Disposição por Horas', en: 'Hourly Service' }, descriptions: { es: "Vehículo con conductor a disposición del cliente por un número determinado de horas. Mínimo 3 horas.", pt: "Veículo com motorista à disposição do cliente por um número determinado de horas. Mínimo de 3 horas.", en: "Vehicle with driver available to the client for a set number of hours. Minimum 3 hours." }, links: { es: "https://example.com/es/disposicion", pt: "https://example.com/pt/disposicion", en: "https://example.com/en/hourly" } },
  ],
  vehicleTypes: [
    { id: 1, name: 'Up to 4 people', cost: 40, price: 75 },
    { id: 2, name: 'Up to 6 people', cost: 60, price: 105 },
    { id: 3, name: 'Up to 15 people', cost: 100, price: 160 },
    { id: 4, name: 'Up to 26 people', cost: 180, price: 250 },
    { id: 5, name: 'Up to 48 people', cost: 280, price: 360 },
    { id: 6, name: 'Up to 50 people', cost: 300, price: 400 },
    { id: 7, name: 'Autobús', cost: 350, price: 450 },
  ],
  currencies: [
    { id: 'USD', name: 'Dólar Estadounidense' },
    { id: 'BRL', name: 'Real Brasileño' },
  ],
  paymentMethods: [
    { id: 'stripe', name: 'Stripe' },
    { id: 'pix', name: 'Pix' },
  ],
  allExtras: [
    { name: 'Silla de niño', price: 10, cost: 0 },
    { name: 'Equipaje extra', price: 15, cost: 0 },
    { name: 'Horario nocturno', price: 20, cost: 5 }
  ],
  providers: [
    { id: 'PROV-001', fullName: 'Central de Hoteles', email: 'contacto@centralhoteles.com', phone: '5491133334444', city: 'Buenos Aires', country: 'Argentina', type: 'Hotelería', status: 'Activo', servicesOffered: ['Alojamiento Boutique', 'Hoteles 5 estrellas'], agreement: 'Comisión 10%' },
    { id: 'PROV-002', fullName: 'Transportes VIP', email: 'reservas@transportesvip.com', phone: '5491155556666', city: 'Buenos Aires', country: 'Argentina', type: 'Transportista', status: 'Activo', servicesOffered: ['Transfers Ejecutivos', 'Minivans'], agreement: 'Tarifa Neta' },
    { id: 'PROV-003', fullName: 'Aventuras Patagónicas', email: 'info@aventuraspat.com', phone: '5492944111222', city: 'Bariloche', country: 'Argentina', type: 'Operador Turístico', status: 'Inactivo', servicesOffered: ['Trekking', 'Excursiones Lacustres'], agreement: 'Comisión 15%' },
    { id: 'PROV-004', fullName: 'City Tours Co.', email: 'contact@citytoursco.com', phone: '14078889999', city: 'Orlando', country: 'EE.UU.', type: 'Operador Turístico', status: 'Activo', servicesOffered: ['Tours por la ciudad', 'Visitas a parques'], agreement: 'Comisión 12%' },
    { id: 'PROV-005', fullName: 'Gastronomía Local Experts', email: 'info@gastronomiaexp.com', phone: '51987654321', city: 'Lima', country: 'Perú', type: 'Operador de Actividades', status: 'Activo', servicesOffered: ['Clases de Cocina', 'Tours Gastronómicos'], agreement: 'Tarifa Neta' },
  ],
  templates: [
    { id: 'TPL-001', name: 'Confirmación de Reserva (Email)', type: 'Email', content: 'Hola {{cliente.nombre}},\n\nTu reserva #{{reserva.id}} ha sido confirmada.\n\nDetalles:\n{{reserva.detalles}}\n\nGracias por elegirnos.' },
    { id: 'TPL-002', name: 'Propuesta de Viaje Familiar', type: 'Propuesta', content: 'Estimada Familia {{cliente.apellido}},\n\nAdjunto nuestra propuesta para su viaje a {{propuesta.destino}}.\n\nIncluye:\n- Alojamiento\n- Tours\n- Actividades\n\nEsperamos sus comentarios.' },
    { id: 'TPL-003', name: 'Recordatorio de Viaje (Email)', type: 'Email', content: 'Hola {{cliente.nombre}},\n\nSolo un recordatorio de que tu viaje a {{propuesta.destino}} es en 3 días.\n\n¡Buen viaje!' },
  ],
  expedientes: [
    { id: 'EXP-001', name: 'Luna de Miel Silva', client: 'Roberto Silva', type: 'Individual', passengers: 2, status: 'Confirmado', totalSale: 2855, totalCost: 2200, balance: 0 },
    { id: 'EXP-002', name: 'Familia Martinez en Orlando', client: 'Familia Martinez', type: 'Grupal', passengers: 4, status: 'Confirmado', totalSale: 6500, totalCost: 5100, balance: 1500 },
    { id: 'EXP-003', name: 'Grupo Tech en Tokio', client: 'Agencia Viajes Corp', type: 'Grupal', passengers: 15, status: 'Cotizado', totalSale: 22500, totalCost: 18000, balance: 22500 },
    { id: 'EXP-004', name: 'Aventura en Cusco', client: 'Maria González', type: 'Individual', passengers: 1, status: 'En Curso', totalSale: 1200, totalCost: 850, balance: 0 },
  ]
};

// --- COMPONENTES REUTILIZABLES ---

const Card = ({ children, className }) => (
  <div className={classNames("bg-white border border-gray-200 rounded-xl shadow-sm", className)}>
    {children}
  </div>
);

const KpiCard = ({ title, value, change, changeType }) => (
  <Card className="p-5 flex items-center">
    <div className="flex-grow">
      <p className="text-sm text-[#444444] font-body">{title}</p>
      <div className="flex items-baseline space-x-2">
        <p className="text-2xl font-bold text-[#222222] font-body">{value}</p>
        {change && <span className={classNames(
          'text-sm font-semibold',
          changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
        )}>
          {change}
        </span>}
      </div>
    </div>
  </Card>
);

const Modal = ({ children, onClose, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
  };
  return (
    <div className={classNames("fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center font-body", className)} onClick={onClose}>
      <div className={classNames("bg-white rounded-xl shadow-2xl p-8 w-full", sizeClasses[size])} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};


// --- PÁGINAS DE LA APLICACIÓN ---

const Dashboard = () => (
  <div>
    <header>
      <h1 className="header-title">Dashboard</h1>
      <p className="mt-2 text-[#444444]">Bienvenido a tu sistema de gestión integral</p>
    </header>

    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {mockData.dashboard.kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
    </div>

    <div className="mt-8">
      <h2 className="font-title text-xl">Acciones Rápidas</h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {mockData.dashboard.quickActions.map(action => (
          <Card key={action.title} className={classNames(
            "p-5 cursor-pointer transition-transform transform hover:-translate-y-1",
            action.primary ? "bg-[#222222] text-white hover:bg-[#444444]" : "hover:bg-gray-50"
          )}>
            <h3 className={classNames(
              "font-semibold font-title",
              action.primary ? "text-white text-lg" : "text-[#222222]"
            )}>{action.title.toUpperCase()}</h3>
            <p className={classNames(
              "mt-1 text-sm",
              action.primary ? "text-gray-300" : "text-[#444444]"
            )}>{action.description}</p>
          </Card>
        ))}
      </div>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-2 p-6">
        <h2 className="font-title text-xl">Actividad Reciente</h2>
        <ul className="mt-4 space-y-4">
          {mockData.dashboard.recentActivity.map(activity => (
            <li key={activity.text} className="flex justify-between items-center">
              <p className="text-sm text-[#444444]">{activity.text}</p>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-title text-xl">Estado de la Flota</h2>
        <ul className="mt-4 space-y-3">
          {mockData.dashboard.fleetStatus.map(item => (
            <li key={item.status} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className={classNames('w-2.5 h-2.5 rounded-full mr-3', item.color)}></span>
                <span className="text-sm text-[#444444]">{item.status}</span>
              </div>
              <span className="text-sm font-semibold text-[#222222]">{item.count}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-[#FD5C5A] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
          Ver Todos los Conductores
        </button>
      </Card>
    </div>
  </div>
);

const DriverManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("all");

  const handleOpenModal = (driver = null) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleSaveDriver = (e) => {
    e.preventDefault();
    if (editingDriver) {
      console.log("Actualizando conductor...", editingDriver.name);
    } else {
      console.log("Guardando nuevo conductor...");
    }
    setIsModalOpen(false);
    setEditingDriver(null);
  };

  const filteredDrivers = mockData.drivers
    .filter(driver => driver.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(driver => {
      if (capacityFilter === "all") return true;
      return driver.capacity <= parseInt(capacityFilter);
    });

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingDriver ? 'Editar Conductor' : 'Agregar Nuevo Conductor'}</h2>
          <form onSubmit={handleSaveDriver}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#444444]">Nombre Completo</label>
                <input type="text" id="name" defaultValue={editingDriver?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" placeholder="Ej: Juan Perez" />
              </div>
              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-[#444444]">Vehículo</label>
                <input type="text" id="vehicle" defaultValue={editingDriver?.vehicle} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" placeholder="Ej: Toyota Camry 2023" />
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-[#444444]">Detalles</label>
                <textarea id="details" rows="3" defaultValue={editingDriver?.details} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" placeholder="Añade una breve descripción del conductor..."></textarea>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar Conductor
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
          />
          <select
            value={capacityFilter}
            onChange={(e) => setCapacityFilter(e.target.value)}
            className="block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
          >
            <option value="all">Todas las capacidades</option>
            <option value="4">Up to 4 people</option>
            <option value="6">Up to 6 people</option>
            <option value="15">Up to 15 people</option>
            <option value="26">Up to 26 people</option>
            <option value="48">Up to 48 people</option>
            <option value="50">Up to 50 people</option>
          </select>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Agregar Conductor
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map(driver => (
          <Card key={driver.name} className="p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xl">
                  {driver.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#222222]">{driver.name}</h3>
                  <p className="text-sm text-[#444444]">{driver.vehicle}</p>
                </div>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                driver.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                  driver.status === 'Ocupado' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
              )}>
                {driver.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-[#444444] flex-grow">{driver.details}</p>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
              <span className="text-[#444444]">Rating: <span className="font-semibold text-[#222222]">{driver.rating} ★</span></span>
              <span className="text-[#444444]">Viajes: <span className="font-semibold text-[#222222]">{driver.trips}</span></span>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => handleOpenModal(driver)} className="text-sm text-[#FD5C5A] hover:underline">Editar</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// --- NUEVOS COMPONENTES PARA LA SECCIÓN TRANSFERS ---

const TransfersDashboard = () => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="En Tránsito (Semanal)" value="3" />
      <KpiCard title="Planeados (Semanal)" value="28" />
      <KpiCard title="N° de Consultas (Semanal)" value="45" />
      <KpiCard title="Esperando Respuesta" value="12" />
    </div>
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Reservas de Transfers</h2>
        <ul className="mt-4 space-y-4">
          {mockData.reservations.slice(0, 4).map(res => (
            <li key={res.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{res.client}</p>
                <p className="text-sm text-[#444444]">{res.details}</p>
              </div>
              <p className="text-sm text-gray-400">{res.date.split(' ')[0]}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Propuestas Enviadas</h2>
        <ul className="mt-4 space-y-4">
          {mockData.proposals.map(prop => (
            <li key={prop.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{prop.client}</p>
                <p className="text-sm text-[#444444]">{prop.destination}</p>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                prop.status === 'Enviada' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              )}>
                {prop.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
);

const AddReservation = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(mockData.services[0]);
  const [selectedVehicle, setSelectedVehicle] = useState(mockData.vehicleTypes[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isPriceEditable, setIsPriceEditable] = useState(false);
  const [isAirportTransfer, setIsAirportTransfer] = useState(selectedService.names.es.includes('Aeropuerto'));

  useEffect(() => {
    if (!selectedVehicle) return;

    const basePrice = selectedVehicle.price;
    const extrasPrice = selectedExtras.reduce((total, extraName) => {
      const extra = mockData.allExtras.find(e => e.name === extraName);
      return total + (extra ? extra.price : 0);
    }, 0);

    let calculatedPrice = basePrice;

    if (isRoundTrip) {
      const roundTripBase = basePrice * 2;
      const discount = roundTripBase * 0.05;
      calculatedPrice = roundTripBase - discount;
    }

    calculatedPrice += extrasPrice;

    if (!isPriceEditable) {
      setFinalPrice(calculatedPrice);
    }

  }, [selectedVehicle, selectedExtras, isRoundTrip, isPriceEditable]);

  const handleServiceChange = (e) => {
    const service = mockData.services.find(s => s.names.es === e.target.value);
    setSelectedService(service);
    setIsAirportTransfer(service.names.es.includes('Aeropuerto'));
    setIsPriceEditable(false);
  };

  const handleVehicleChange = (e) => {
    const vehicle = mockData.vehicleTypes.find(v => v.name === e.target.value);
    setSelectedVehicle(vehicle);
    setIsPriceEditable(false);
  };

  const handleExtraChange = (e) => {
    const { name, checked } = e.target;
    setSelectedExtras(prev =>
      checked ? [...prev, name] : prev.filter(extra => extra !== name)
    );
    setIsPriceEditable(false);
  };

  const handleRoundTripChange = (e) => {
    setIsRoundTrip(e.target.checked);
    setIsPriceEditable(false);
  }

  return (
    <div>
      {isClientModalOpen && (
        <Modal onClose={() => setIsClientModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">Agregar Nuevo Cliente</h2>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-[#444444]">Nombre Completo</label>
                <input type="text" id="clientName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
              </div>
              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-[#444444]">Email</label>
                <input type="email" id="clientEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsClientModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" onClick={() => setIsClientModalOpen(false)} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar Cliente
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Card className="p-8">
        <h2 className="font-title text-2xl mb-6">Agregar Nueva Reserva de Transfer</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Transfer */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-[#444444]">Tipo de Servicio/Ruta</label>
              <select id="service" onChange={handleServiceChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
                {mockData.services.map(s => <option key={s.id}>{s.names.es}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-[#444444]">Tipo de Vehículo</label>
              <select id="vehicle" onChange={handleVehicleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
                {mockData.vehicleTypes.map(v => <option key={v.id}>{v.name}</option>)}
              </select>
            </div>

            {/* Campos de Cliente */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-[#444444]">Nombre</label>
              <input type="text" id="nombre" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-[#444444]">Teléfono (WhatsApp)</label>
              <input type="tel" id="telefono" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#444444]">Email</label>
              <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>

            {/* Campos de Viaje */}
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-[#444444]">Fecha de Llegada</label>
              <input type="date" id="fecha" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>
            <div>
              <label htmlFor="hora" className="block text-sm font-medium text-[#444444]">Hora de Llegada</label>
              <input type="time" id="hora" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>

            {isAirportTransfer && (
              <div className="md:col-span-2">
                <label htmlFor="vuelo" className="block text-sm font-medium text-[#444444]">Número de Vuelo y Compañía</label>
                <input type="text" id="vuelo" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
              </div>
            )}

            <div>
              <label htmlFor="pasajeros" className="block text-sm font-medium text-[#444444]">Pasajeros</label>
              <input type="number" id="pasajeros" defaultValue="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>
            <div>
              <label htmlFor="menores" className="block text-sm font-medium text-[#444444]">Menores</label>
              <input type="number" id="menores" defaultValue="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>

            <div>
              <label htmlFor="origen" className="block text-sm font-medium text-[#444444]">Origen</label>
              <input type="text" id="origen" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>
            <div>
              <label htmlFor="destino" className="block text-sm font-medium text-[#444444]">Destino</label>
              <input type="text" id="destino" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="observaciones" className="block text-sm font-medium text-[#444444]">Observaciones</label>
              <textarea id="observaciones" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"></textarea>
            </div>

            {/* Extras y Descuento */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#444444]">Opciones Adicionales</label>
                <div className="mt-2 flex items-center space-x-6">
                  <div className="flex items-center">
                    <input id="roundTrip" name="roundTrip" type="checkbox" checked={isRoundTrip} onChange={handleRoundTripChange} className="h-4 w-4 text-[#FD5C5A] focus:ring-[#FD5C5A] border-gray-300 rounded" />
                    <label htmlFor="roundTrip" className="ml-2 block text-sm text-[#444444]">Ida y Vuelta (5% de descuento)</label>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-6">
                  {mockData.allExtras.map(extra => (
                    <div key={extra.name} className="flex items-center">
                      <input id={extra.name} name={extra.name} type="checkbox" checked={selectedExtras.includes(extra.name)} onChange={handleExtraChange} className="h-4 w-4 text-[#FD5C5A] focus:ring-[#FD5C5A] border-gray-300 rounded" />
                      <label htmlFor={extra.name} className="ml-2 block text-sm text-[#444444]">{extra.name} (+${extra.price})</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculo de Precio */}
            <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-title text-lg mb-2">Total a Pagar</h3>
              <div className="flex items-center">
                <input type="number" value={finalPrice} onChange={(e) => setFinalPrice(parseFloat(e.target.value))} disabled={!isPriceEditable} className="text-3xl font-bold text-[#000000] bg-transparent w-full border-0 p-0 focus:ring-0" />
                <button type="button" onClick={() => setIsPriceEditable(!isPriceEditable)} className="text-sm text-[#FD5C5A] hover:underline ml-2">
                  {isPriceEditable ? 'Bloquear' : 'Editar'}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90">
              Crear Reserva
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const ServiceAccordion = ({ service: initialService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('es');
  const [service, setService] = useState(initialService);

  const handleInputChange = (e, lang, field, subfield = null) => {
    const { value } = e.target;
    if (subfield) {
      setService(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: value
        }
      }));
    } else {
      setService(prev => ({ ...prev, [field]: value }));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 text-left focus:outline-none">
        <div className="flex justify-between items-center">
          <h3 className="font-title text-lg">{service.names.es}</h3>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="mb-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {['ESPAÑOL', 'PORTUGUES', 'INGLÉS'].map((lang) => {
                  const langKey = lang.substring(0, 2).toLowerCase();
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(langKey)}
                      className={classNames(
                        'whitespace-nowrap pb-2 px-1 border-b-2 font-semibold text-sm',
                        activeLang === langKey
                          ? 'border-[#FD5C5A] text-[#FD5C5A]'
                          : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
                      )}
                    >
                      {lang}
                    </button>
                  )
                })}
              </nav>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#444444]">Título del Producto</label>
                <input
                  type="text"
                  value={service.names[activeLang]}
                  onChange={e => handleInputChange(e, activeLang, 'names', activeLang)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#444444]">Descripción</label>
                <textarea
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={service.descriptions[activeLang]}
                  onChange={e => handleInputChange(e, activeLang, 'descriptions', activeLang)}
                ></textarea>
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={() => copyToClipboard(`${service.names[activeLang]}\n${service.descriptions[activeLang]}`)} className="text-sm bg-[#444444] text-white font-semibold py-1 px-3 rounded-lg hover:bg-[#222222]">
                  Copiar
                </button>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor={`link-${service.id}`} className="block text-sm font-medium text-[#444444]">Link de la Web</label>
            <input type="text" id={`link-${service.id}`} value={service.links[activeLang]} onChange={e => handleInputChange(e, activeLang, 'links', activeLang)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 text-sm">
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceManager = () => (
  <div>
    <Card className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-title text-2xl">Gestor de Servicios/Rutas</h2>
        <button className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Nuevo Servicio
        </button>
      </div>
      <div className="space-y-2">
        {mockData.services.map(service => (
          <ServiceAccordion key={service.id} service={service} />
        ))}
      </div>
    </Card>
  </div>
);

const VehicleTypeRow = ({ vehicle: initialVehicle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [vehicle, setVehicle] = useState(initialVehicle);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setVehicle(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericChange = (e, field) => {
    const { value } = e.target;
    setVehicle(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
      {isEditing ? (
        <>
          <input type="text" value={vehicle.name} onChange={e => handleInputChange(e, 'name')} className="font-title text-lg border-gray-300 rounded-md" />
          <div className="flex space-x-4 items-center">
            <input type="number" value={vehicle.cost} onChange={e => handleNumericChange(e, 'cost')} className="w-24 border-gray-300 rounded-md" />
            <input type="number" value={vehicle.price} onChange={e => handleNumericChange(e, 'price')} className="w-24 border-gray-300 rounded-md" />
            <span className="text-green-600 font-bold w-24">${vehicle.price - vehicle.cost}</span>
            <button onClick={() => setIsEditing(false)} className="bg-[#FD5C5A] text-white font-semibold py-1 px-3 rounded-lg text-sm">Guardar</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-title text-lg">{vehicle.name}</h3>
          <div className="flex space-x-6 text-sm items-center">
            <span>Costo: <span className="font-semibold">${vehicle.cost}</span></span>
            <span>Venta: <span className="font-semibold">${vehicle.price}</span></span>
            <span className="text-green-600 font-bold">Ganancia: <span className="font-bold">${vehicle.price - vehicle.cost}</span></span>
            <button onClick={() => setIsEditing(true)} className="text-sm text-[#FD5C5A] hover:underline">Editar</button>
          </div>
        </>
      )}
    </div>
  );
};

const VehicleTypeManager = () => (
  <Card className="p-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-title text-2xl">Tipos de Vehículo</h2>
      <button className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
        + Nuevo Tipo de Vehículo
      </button>
    </div>
    <div className="space-y-4">
      {mockData.vehicleTypes.map(vehicle => (
        <VehicleTypeRow key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  </Card>
);


const FinancialReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredReservations = mockData.reservations.filter(res => {
    if (!startDate || !endDate) return true;
    const resDate = new Date(res.date.split(' ')[0]);
    return resDate >= new Date(startDate) && resDate <= new Date(endDate);
  });

  const totalProfit = filteredReservations.reduce((acc, res) => acc + (res.profit), 0);

  return (
    <div>
      <Card className="p-8">
        <h2 className="font-title text-2xl mb-6">Reportes Financieros</h2>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-[#444444]">Fecha de Inicio</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-[#444444]">Fecha de Fin</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="pt-6">
            <button className="bg-[#222222] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#444444]">Filtrar</button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="text-right">
            <p className="text-sm text-[#444444] font-title uppercase">Ganancia Total</p>
            <p className="text-3xl font-bold text-[#000000]">${totalProfit.toLocaleString()}</p>
          </div>
        </div>

        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Reserva #</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Precio Venta</th>
              <th className="px-6 py-3">Ganancia</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(res => (
              <tr key={res.id} className="bg-white border-b">
                <td className="px-6 py-4 font-semibold text-[#000000]">{res.id}</td>
                <td className="px-6 py-4">{res.date.split(' ')[0]}</td>
                <td className="px-6 py-4">${res.saleValue}</td>
                <td className="px-6 py-4 font-bold text-green-600">${res.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const TransfersHub = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = ['Dashboard', 'Conductores', 'Agregar Reserva', 'Servicios', 'Tipos de Vehículo', 'Reportes'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <TransfersDashboard />;
      case 'Conductores': return <DriverManagement />;
      case 'Agregar Reserva': return <AddReservation />;
      case 'Servicios': return <ServiceManager />;
      case 'Tipos de Vehículo': return <VehicleTypeManager />;
      case 'Reportes': return <FinancialReports />;
      default: return <TransfersDashboard />;
    }
  }

  return (
    <div>
      <header>
        <h1 className="header-title">Centro de Operaciones de Transfers</h1>
        <p className="mt-2 text-[#444444]">Gestiona todo lo relacionado con tus traslados desde aquí.</p>
      </header>
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm',
                activeTab === tab
                  ? 'border-[#FD5C5A] text-[#FD5C5A]'
                  : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};


// --- COMPONENTES ORIGINALES ---

const Reservations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);

  const handleOpenModal = (reservation = null) => {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  };

  const handleSaveReservation = (e) => {
    e.preventDefault();
    console.log("Guardando reserva...");
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmado': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Transfer': return 'bg-indigo-100 text-indigo-800';
      case 'Alojamiento': return 'bg-purple-100 text-purple-800';
      case 'Tour': return 'bg-pink-100 text-pink-800';
      case 'Actividad': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingReservation ? 'Editar Reserva' : 'Agregar Nueva Reserva'}</h2>
          <form onSubmit={handleSaveReservation}>
            <div className="space-y-4">
              <div>
                <label htmlFor="reservaId" className="block text-sm font-medium text-[#444444]">ID Reserva</label>
                <input type="text" id="reservaId" defaultValue={editingReservation?.id} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readOnly />
              </div>
              <div>
                <label htmlFor="reservaClient" className="block text-sm font-medium text-[#444444]">Cliente</label>
                <input type="text" id="reservaClient" defaultValue={editingReservation?.client} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="reservaDetails" className="block text-sm font-medium text-[#444444]">Detalles</label>
                <textarea id="reservaDetails" rows="3" defaultValue={editingReservation?.details} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div>
                <label htmlFor="reservaDate" className="block text-sm font-medium text-[#444444]">Fecha</label>
                <input type="text" id="reservaDate" defaultValue={editingReservation?.date} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reservaSale" className="block text-sm font-medium text-[#444444]">Valor Venta</label>
                  <input type="number" id="reservaSale" defaultValue={editingReservation?.saleValue} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="reservaProfit" className="block text-sm font-medium text-[#444444]">Ganancia</label>
                  <input type="number" id="reservaProfit" defaultValue={editingReservation?.profit} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="reservaStatus" className="block text-sm font-medium text-[#444444]">Estado</label>
                <select id="reservaStatus" defaultValue={editingReservation?.status} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Pendiente</option>
                  <option>Confirmado</option>
                  <option>Completado</option>
                  <option>Cancelado</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="header-title">Gestión de Reservas</h1>
          <p className="mt-2 text-[#444444]">Administra todas las reservas y traslados</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Nueva Reserva
        </button>
      </header>
      <Card className="mt-8 overflow-x-auto">
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Reserva #</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Detalles</th>
              <th scope="col" className="px-6 py-3">Tipo</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Valor Venta</th>
              <th scope="col" className="px-6 py-3">Ganancia</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockData.reservations.map(res => (
              <tr key={res.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-[#000000] whitespace-nowrap">{res.id}</th>
                <td className="px-6 py-4">{res.client}</td>
                <td className="px-6 py-4">{res.details}</td>
                <td className="px-6 py-4">
                  <span className={classNames('px-2 py-1 font-semibold leading-tight rounded-full text-xs', getTypeBadge(res.type))}>
                    {res.type}
                  </span>
                </td>
                <td className="px-6 py-4">{res.date}</td>
                <td className="px-6 py-4">${res.saleValue}</td>
                <td className="px-6 py-4 text-green-600 font-bold">${res.profit}</td>
                <td className="px-6 py-4">
                  <span className={classNames('px-2 py-1 font-semibold leading-tight rounded-full text-xs', getStatusBadge(res.status))}>
                    {res.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleOpenModal(res)} className="font-medium text-[#FD5C5A] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const handleOpenModal = (client = null) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    console.log("Guardando cliente...");
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Reservado': return 'bg-green-100 text-green-800';
      case 'Propuesta Enviada': return 'bg-blue-100 text-blue-800';
      case 'Contactado': return 'bg-yellow-100 text-yellow-800';
      case 'Canceló': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingClient ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
          <form onSubmit={handleSaveClient}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#444444]">Nombre Completo</label>
                <input type="text" id="fullName" defaultValue={editingClient?.fullName} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#444444]">Email</label>
                <input type="email" id="email" defaultValue={editingClient?.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#444444]">Teléfono (WhatsApp)</label>
                <input type="tel" id="phone" defaultValue={editingClient?.phone} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#444444]">Ciudad</label>
                  <input type="text" id="city" defaultValue={editingClient?.city} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-[#444444]">País</label>
                  <input type="text" id="country" defaultValue={editingClient?.country} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-[#444444]">Notas</label>
                <textarea id="details" rows="3" defaultValue={editingClient?.details} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="header-title">Gestión de Clientes</h1>
          <p className="mt-2 text-[#444444]">Administra la base de datos de clientes y sus viajes</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Nuevo Cliente
        </button>
      </header>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockData.clients.map(client => (
          <Card key={client.id} className="p-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xl">
                  {client.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#222222]">{client.fullName}</h3>
                  <p className="text-sm text-[#444444]">{client.city}, {client.country}</p>
                  <p className="text-sm text-gray-400">{client.id}</p>
                </div>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                getStatusBadge(client.status)
              )}>
                {client.status}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[#444444]">
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Teléfono:</strong> {client.phone}</p>
              <p><strong>Notas:</strong> {client.details}</p>
              <div>
                <strong>Servicios:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {client.contractedServices.map(service => (
                    <span key={service} className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center space-x-2">
              <a href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 text-sm">Contactar</a>
              <button onClick={() => handleOpenModal(client)} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 text-sm">Ver Detalles</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Roadmap = () => {
  const getStatusPill = (status) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Planificado': return 'bg-yellow-100 text-yellow-800';
      case 'Futuro': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  return (
    <div>
      <header>
        <h1 className="header-title">Roadmap de Desarrollo</h1>
        <p className="mt-2 text-[#444444]">Plan maestro para transformar tu agencia en una plataforma integral</p>
      </header>
      <div className="mt-8 space-y-8">
        {mockData.roadmap.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border-2 border-[#FD5C5A] rounded-full">
                  <svg className="w-6 h-6 text-[#FD5C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300"></div>
            </div>
            <Card className="w-full p-5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-[#FD5C5A] font-title uppercase">{item.phase}</p>
                <span className={classNames("px-3 py-1 text-xs font-semibold rounded-full", getStatusPill(item.status))}>
                  {item.status}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-[#222222]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#444444]">{item.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const AlojamientoHub = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabs = ['Dashboard', 'Alojamientos', 'Agregar Reserva', 'Reportes'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <AlojamientoDashboard />;
      case 'Alojamientos': return <AlojamientoList />;
      case 'Agregar Reserva': return <AddAlojamientoReserva />;
      case 'Reportes': return <AlojamientoReports />;
      default: return <AlojamientoDashboard />;
    }
  }

  return (
    <div>
      <header>
        <h1 className="header-title">Gestión de Alojamiento</h1>
        <p className="mt-2 text-[#444444]">Administra y registra tus ventas de hospedaje.</p>
      </header>
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm',
                activeTab === tab
                  ? 'border-[#FD5C5A] text-[#FD5C5A]'
                  : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const AlojamientoDashboard = () => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Hospedados (Semanal)" value="12" />
      <KpiCard title="Planeados (Semanal)" value="35" />
      <KpiCard title="N° de Consultas (Semanal)" value="58" />
      <KpiCard title="Esperando Respuesta" value="15" />
    </div>
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Reservas de Alojamiento</h2>
        <ul className="mt-4 space-y-4">
          {mockData.reservations.slice(0, 4).map(res => (
            <li key={res.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{res.client}</p>
                <p className="text-sm text-[#444444]">{res.details}</p>
              </div>
              <p className="text-sm text-gray-400">{res.date.split(' ')[0]}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Propuestas Enviadas</h2>
        <ul className="mt-4 space-y-4">
          {mockData.proposals.map(prop => (
            <li key={prop.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{prop.client}</p>
                <p className="text-sm text-[#444444]">{prop.destination}</p>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                prop.status === 'Enviada' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              )}>
                {prop.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
);


const AlojamientoList = () => {
  const [filter, setFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState(null);
  const accommodationTypes = ['Todos', ...new Set(mockData.accommodations.map(a => a.type))];

  const handleOpenModal = (accommodation = null) => {
    setEditingAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleSaveAccommodation = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar o actualizar
    console.log("Guardando alojamiento...");
    setIsModalOpen(false);
    setEditingAccommodation(null);
  };

  const filteredAccommodations = filter === 'Todos'
    ? mockData.accommodations
    : mockData.accommodations.filter(a => a.type === filter);

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingAccommodation ? 'Editar Alojamiento' : 'Agregar Nuevo Alojamiento'}</h2>
          <form onSubmit={handleSaveAccommodation}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#444444]">Nombre del Alojamiento</label>
                <input type="text" id="name" defaultValue={editingAccommodation?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-[#444444]">Tipo</label>
                <select id="type" defaultValue={editingAccommodation?.type} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required>
                  <option>Hotel</option>
                  <option>Posada</option>
                  <option>Departamento Temporario</option>
                  <option>Hostel</option>
                </select>
              </div>
              <div>
                <label htmlFor="commission" className="block text-sm font-medium text-[#444444]">Comisión (%)</label>
                <input type="number" id="commission" defaultValue={editingAccommodation?.commission} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <label htmlFor="typeFilter" className="sr-only">Filtrar por tipo</label>
          <select
            id="typeFilter"
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A] sm:text-sm rounded-md"
          >
            {accommodationTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Agregar Alojamiento
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccommodations.map(item => (
          <Card key={item.name} className="flex flex-col">
            <div className="h-40 bg-gray-200 rounded-t-xl flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-8h1m-5 8h1m-1-4h1m-1-4h1"></path></svg>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#222222]">{item.name}</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-[#444444]">{item.type}</span>
              </div>
              <div className="mt-4 flex-grow">
                <p className="text-sm text-[#444444]">Comisión</p>
                <p className="font-bold text-lg text-[#000000]">{item.commission}%</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => handleOpenModal(item)} className="text-sm text-[#FD5C5A] hover:underline">Editar</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AddAlojamientoReserva = () => (
  <Card className="p-8">
    <h2 className="font-title text-2xl mb-6">Registrar Venta de Alojamiento</h2>
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="accommodation" className="block text-sm font-medium text-[#444444]">Alojamiento</label>
          <select id="accommodation" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
            {mockData.accommodations.map(a => <option key={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-[#444444]">Cliente</label>
          <select id="client" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
            {mockData.clients.map(c => <option key={c.id}>{c.fullName}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="saleDate" className="block text-sm font-medium text-[#444444]">Fecha de Venta</label>
          <input type="date" id="saleDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="saleValue" className="block text-sm font-medium text-[#444444]">Valor de la Venta</label>
          <input type="number" id="saleValue" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="profit" className="block text-sm font-medium text-[#444444]">Ganancia</label>
          <input type="number" id="profit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90">
          Guardar Venta
        </button>
      </div>
    </form>
  </Card>
);

const AlojamientoReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredSales = mockData.accommodationSales.filter(sale => {
    if (!startDate || !endDate) return true;
    const saleDate = new Date(sale.saleDate);
    return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
  });

  const totalSales = filteredSales.reduce((acc, sale) => acc + sale.saleValue, 0);
  const totalCommission = filteredSales.reduce((acc, sale) => acc + sale.commission, 0);
  const totalNights = filteredSales.reduce((acc, sale) => acc + sale.nights, 0);

  return (
    <div>
      <Card className="p-8">
        <h2 className="font-title text-2xl mb-6">Reportes de Alojamiento</h2>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-[#444444]">Fecha de Inicio</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-[#444444]">Fecha de Fin</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="pt-6">
            <button className="bg-[#222222] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#444444]">Filtrar</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total de Ventas" value={`$${totalSales.toLocaleString()}`} />
          <KpiCard title="Comisión Total" value={`$${totalCommission.toLocaleString()}`} changeType="positive" />
          <KpiCard title="Noches Vendidas" value={totalNights} />
        </div>

        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Alojamiento</th>
              <th className="px-6 py-3">Fecha Venta</th>
              <th className="px-6 py-3">Noches</th>
              <th className="px-6 py-3">Valor Venta</th>
              <th className="px-6 py-3">Comisión</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id} className="bg-white border-b">
                <td className="px-6 py-4 font-semibold text-[#000000]">{sale.clientName}</td>
                <td className="px-6 py-4">{sale.accommodationName}</td>
                <td className="px-6 py-4">{sale.saleDate}</td>
                <td className="px-6 py-4">{sale.nights}</td>
                <td className="px-6 py-4">${sale.saleValue.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-green-600">${sale.commission.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const ToursHub = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabs = ['Dashboard', 'Proveedores', 'Tours', 'Agregar Reserva', 'Reportes'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <ToursDashboard />;
      case 'Proveedores': return <TourProviderList />;
      case 'Tours': return <TourList />;
      case 'Agregar Reserva': return <AddTourReserva />;
      case 'Reportes': return <ToursReports />;
      default: return <ToursDashboard />;
    }
  }

  return (
    <div>
      <header>
        <h1 className="header-title">Gestión de Tours</h1>
        <p className="mt-2 text-[#444444]">Administra y registra tus ventas de tours y excursiones.</p>
      </header>
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm',
                activeTab === tab
                  ? 'border-[#FD5C5A] text-[#FD5C5A]'
                  : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const ToursDashboard = () => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Tours Vendidos (Mes)" value="18" />
      <KpiCard title="Ingresos por Tours" value="$4,850" />
      <KpiCard title="Nuevos Clientes" value="7" />
      <KpiCard title="Consultas" value="32" />
    </div>
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Reservas de Tours</h2>
        <ul className="mt-4 space-y-4">
          {mockData.tourSales.map(sale => (
            <li key={sale.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{sale.clientName}</p>
                <p className="text-sm text-[#444444]">{sale.tourName}</p>
              </div>
              <p className="text-sm text-gray-400">{sale.saleDate}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Propuestas Enviadas</h2>
        <ul className="mt-4 space-y-4">
          {mockData.proposals.map(prop => (
            <li key={prop.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{prop.client}</p>
                <p className="text-sm text-[#444444]">{prop.destination}</p>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                prop.status === 'Enviada' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              )}>
                {prop.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
);

const TourProviderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const tourProviders = mockData.providers.filter(p => p.type === 'Operador Turístico');

  const handleOpenModal = (provider = null) => {
    setEditingProvider(provider);
    setIsModalOpen(true);
  };

  const handleSaveProvider = (e) => {
    e.preventDefault();
    console.log("Guardando proveedor...");
    setIsModalOpen(false);
    setEditingProvider(null);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingProvider ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}</h2>
          <form onSubmit={handleSaveProvider}>
            <div className="space-y-4">
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-[#444444]">Nombre del Proveedor</label>
                <input type="text" id="providerName" defaultValue={editingProvider?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="providerContact" className="block text-sm font-medium text-[#444444]">Contacto (Email)</label>
                <input type="email" id="providerContact" defaultValue={editingProvider?.contact} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="providerStatus" className="block text-sm font-medium text-[#444444]">Estado</label>
                <select id="providerStatus" defaultValue={editingProvider?.status || 'Activo'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Card className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-title text-2xl">Proveedores de Tours</h2>
          <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
            + Nuevo Proveedor
          </button>
        </div>
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Contacto</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tourProviders.map(provider => (
              <tr key={provider.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{provider.fullName}</td>
                <td className="px-6 py-4">{provider.contact}</td>
                <td className="px-6 py-4">
                  <span className={classNames(
                    'px-2 py-1 font-semibold leading-tight rounded-full text-xs',
                    provider.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}>
                    {provider.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleOpenModal(provider)} className="font-medium text-[#FD5C5A] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const TourList = () => {
  const [filter, setFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const tourTypes = ['Todos', ...new Set(mockData.tours.map(t => t.type))];

  const handleOpenModal = (tour = null) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const handleSaveTour = (e) => {
    e.preventDefault();
    console.log("Guardando tour...");
    setIsModalOpen(false);
    setEditingTour(null);
  };

  const filteredTours = filter === 'Todos'
    ? mockData.tours
    : mockData.tours.filter(t => t.type === filter);

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingTour ? 'Editar Tour' : 'Agregar Nuevo Tour'}</h2>
          <form onSubmit={handleSaveTour}>
            <div className="space-y-4">
              <div>
                <label htmlFor="tourName" className="block text-sm font-medium text-[#444444]">Nombre del Tour</label>
                <input type="text" id="tourName" defaultValue={editingTour?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="tourType" className="block text-sm font-medium text-[#444444]">Tipo</label>
                <input type="text" id="tourType" defaultValue={editingTour?.type} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tourPrice" className="block text-sm font-medium text-[#444444]">Precio Venta</label>
                  <input type="number" id="tourPrice" defaultValue={editingTour?.price} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                  <label htmlFor="tourCost" className="block text-sm font-medium text-[#444444]">Costo</label>
                  <input type="number" id="tourCost" defaultValue={editingTour?.cost} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
              </div>
              <div>
                <label htmlFor="tourDuration" className="block text-sm font-medium text-[#444444]">Duración</label>
                <input type="text" id="tourDuration" defaultValue={editingTour?.duration} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <label htmlFor="typeFilter" className="sr-only">Filtrar por tipo</label>
          <select
            id="typeFilter"
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A] sm:text-sm rounded-md"
          >
            {tourTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Agregar Tour
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map(item => (
          <Card key={item.name} className="p-5 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#222222]">{item.name}</h3>
                <p className="text-sm text-[#FD5C5A] font-semibold">{item.type}</p>
              </div>
              <span className={classNames("font-semibold text-sm", item.available ? 'text-green-600' : 'text-red-600')}>
                {item.available ? 'Disponible' : 'No Disponible'}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-end flex-grow">
              <div>
                <p className="text-[#444444] text-sm">Duración</p>
                <p className="font-semibold text-[#222222]">{item.duration}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#000000]">${item.price}</p>
                <p className="text-xs text-[#444444] text-right">/ persona</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => handleOpenModal(item)} className="text-sm text-[#FD5C5A] hover:underline">Editar</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AddTourReserva = () => (
  <Card className="p-8">
    <h2 className="font-title text-2xl mb-6">Registrar Venta de Tour</h2>
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tour" className="block text-sm font-medium text-[#444444]">Tour</label>
          <select id="tour" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
            {mockData.tours.map(t => <option key={t.name}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-[#444444]">Cliente</label>
          <select id="client" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
            {mockData.clients.map(c => <option key={c.id}>{c.fullName}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="saleDate" className="block text-sm font-medium text-[#444444]">Fecha del Tour</label>
          <input type="date" id="saleDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-[#444444]">N° de Pasajeros</label>
          <input type="number" id="passengers" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="saleValue" className="block text-sm font-medium text-[#444444]">Valor de la Venta</label>
          <input type="number" id="saleValue" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="profit" className="block text-sm font-medium text-[#444444]">Ganancia</label>
          <input type="number" id="profit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90">
          Guardar Venta
        </button>
      </div>
    </form>
  </Card>
);

const ToursReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredSales = mockData.tourSales.filter(sale => {
    if (!startDate || !endDate) return true;
    const saleDate = new Date(sale.saleDate);
    return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
  });

  const totalSales = filteredSales.reduce((acc, sale) => acc + sale.saleValue, 0);
  const totalProfit = filteredSales.reduce((acc, sale) => acc + sale.profit, 0);
  const totalPassengers = filteredSales.reduce((acc, sale) => acc + sale.passengers, 0);

  return (
    <div>
      <Card className="p-8">
        <h2 className="font-title text-2xl mb-6">Reportes de Tours</h2>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-[#444444]">Fecha de Inicio</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-[#444444]">Fecha de Fin</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="pt-6">
            <button className="bg-[#222222] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#444444]">Filtrar</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total de Ventas" value={`$${totalSales.toLocaleString()}`} />
          <KpiCard title="Ganancia Total" value={`$${totalProfit.toLocaleString()}`} changeType="positive" />
          <KpiCard title="Total Pasajeros" value={totalPassengers} />
        </div>

        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Tour</th>
              <th className="px-6 py-3">Fecha Venta</th>
              <th className="px-6 py-3">Pasajeros</th>
              <th className="px-6 py-3">Valor Venta</th>
              <th className="px-6 py-3">Ganancia</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id} className="bg-white border-b">
                <td className="px-6 py-4 font-semibold text-[#000000]">{sale.clientName}</td>
                <td className="px-6 py-4">{sale.tourName}</td>
                <td className="px-6 py-4">{sale.saleDate}</td>
                <td className="px-6 py-4">{sale.passengers}</td>
                <td className="px-6 py-4">${sale.saleValue.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-green-600">${sale.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const ActividadesHub = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabs = ['Dashboard', 'Proveedores', 'Actividades', 'Agregar Reserva', 'Reportes'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <ActividadesDashboard />;
      case 'Proveedores': return <ActividadProviderList />;
      case 'Actividades': return <ActividadList />;
      case 'Agregar Reserva': return <AddActividadReserva />;
      case 'Reportes': return <ActividadesReports />;
      default: return <ActividadesDashboard />;
    }
  }

  return (
    <div>
      <header>
        <h1 className="header-title">Gestión de Actividades</h1>
        <p className="mt-2 text-[#444444]">Administra y registra tus ventas de actividades.</p>
      </header>
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm',
                activeTab === tab
                  ? 'border-[#FD5C5A] text-[#FD5C5A]'
                  : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const ActividadesDashboard = () => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Actividades Vendidas (Mes)" value="12" />
      <KpiCard title="Ingresos por Actividades" value="$2,150" />
      <KpiCard title="Nuevos Clientes" value="5" />
      <KpiCard title="Consultas" value="25" />
    </div>
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Reservas de Actividades</h2>
        <ul className="mt-4 space-y-4">
          {mockData.activitySales.map(sale => (
            <li key={sale.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{sale.clientName}</p>
                <p className="text-sm text-[#444444]">{sale.activityName}</p>
              </div>
              <p className="text-sm text-gray-400">{sale.saleDate}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-title text-xl">Últimas Propuestas Enviadas</h2>
        <ul className="mt-4 space-y-4">
          {mockData.proposals.map(prop => (
            <li key={prop.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#222222]">{prop.client}</p>
                <p className="text-sm text-[#444444]">{prop.destination}</p>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                prop.status === 'Enviada' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              )}>
                {prop.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
);

const ActividadProviderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const activityProviders = mockData.providers.filter(p => p.type === 'Operador de Actividades');

  const handleOpenModal = (provider = null) => {
    setEditingProvider(provider);
    setIsModalOpen(true);
  };

  const handleSaveProvider = (e) => {
    e.preventDefault();
    console.log("Guardando proveedor...");
    setIsModalOpen(false);
    setEditingProvider(null);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingProvider ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}</h2>
          <form onSubmit={handleSaveProvider}>
            <div className="space-y-4">
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-[#444444]">Nombre del Proveedor</label>
                <input type="text" id="providerName" defaultValue={editingProvider?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="providerContact" className="block text-sm font-medium text-[#444444]">Contacto (Email)</label>
                <input type="email" id="providerContact" defaultValue={editingProvider?.contact} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="providerStatus" className="block text-sm font-medium text-[#444444]">Estado</label>
                <select id="providerStatus" defaultValue={editingProvider?.status || 'Activo'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Card className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-title text-2xl">Proveedores de Actividades</h2>
          <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
            + Nuevo Proveedor
          </button>
        </div>
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Contacto</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activityProviders.map(provider => (
              <tr key={provider.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{provider.fullName}</td>
                <td className="px-6 py-4">{provider.contact}</td>
                <td className="px-6 py-4">
                  <span className={classNames(
                    'px-2 py-1 font-semibold leading-tight rounded-full text-xs',
                    provider.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}>
                    {provider.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleOpenModal(provider)} className="font-medium text-[#FD5C5A] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const ActividadList = () => {
  const [filter, setFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const activityTypes = ['Todos', ...new Set(mockData.activities.map(a => a.type))];

  const handleOpenModal = (activity = null) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleSaveActivity = (e) => {
    e.preventDefault();
    console.log("Guardando actividad...");
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  const filteredActivities = filter === 'Todos'
    ? mockData.activities
    : mockData.activities.filter(a => a.type === filter);

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingActivity ? 'Editar Actividad' : 'Agregar Nueva Actividad'}</h2>
          <form onSubmit={handleSaveActivity}>
            <div className="space-y-4">
              <div>
                <label htmlFor="activityName" className="block text-sm font-medium text-[#444444]">Nombre de la Actividad</label>
                <input type="text" id="activityName" defaultValue={editingActivity?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="activityType" className="block text-sm font-medium text-[#444444]">Tipo</label>
                <input type="text" id="activityType" defaultValue={editingActivity?.type} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="activityPrice" className="block text-sm font-medium text-[#444444]">Precio Venta</label>
                  <input type="number" id="activityPrice" defaultValue={editingActivity?.price} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                  <label htmlFor="activityCost" className="block text-sm font-medium text-[#444444]">Costo</label>
                  <input type="number" id="activityCost" defaultValue={editingActivity?.cost} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
              </div>
              <div>
                <label htmlFor="activityDuration" className="block text-sm font-medium text-[#444444]">Duración</label>
                <input type="text" id="activityDuration" defaultValue={editingActivity?.duration} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <label htmlFor="typeFilter" className="sr-only">Filtrar por tipo</label>
          <select
            id="typeFilter"
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A] sm:text-sm rounded-md"
          >
            {activityTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Agregar Actividad
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(item => (
          <Card key={item.name} className="p-5 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#222222]">{item.name}</h3>
                <p className="text-sm text-[#FD5C5A] font-semibold">{item.type}</p>
              </div>
              <span className={classNames("font-semibold text-sm", item.available ? 'text-green-600' : 'text-red-600')}>
                {item.available ? 'Disponible' : 'No Disponible'}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-end flex-grow">
              <div>
                <p className="text-[#444444] text-sm">Duración</p>
                <p className="font-semibold text-[#222222]">{item.duration}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#000000]">${item.price}</p>
                <p className="text-xs text-[#444444] text-right">/ persona</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => handleOpenModal(item)} className="text-sm text-[#FD5C5A] hover:underline">Editar</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AddActividadReserva = () => (
  <Card className="p-8">
    <h2 className="font-title text-2xl mb-6">Registrar Venta de Actividad</h2>
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="activity" className="block text-sm font-medium text-[#444444]">Actividad</label>
          <select id="activity" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
            {mockData.activities.map(a => <option key={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-[#444444]">Cliente</label>
          <select id="client" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]">
            {mockData.clients.map(c => <option key={c.id}>{c.fullName}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="saleDate" className="block text-sm font-medium text-[#444444]">Fecha de la Actividad</label>
          <input type="date" id="saleDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-[#444444]">N° de Pasajeros</label>
          <input type="number" id="passengers" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="saleValue" className="block text-sm font-medium text-[#444444]">Valor de la Venta</label>
          <input type="number" id="saleValue" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
        <div>
          <label htmlFor="profit" className="block text-sm font-medium text-[#444444]">Ganancia</label>
          <input type="number" id="profit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90">
          Guardar Venta
        </button>
      </div>
    </form>
  </Card>
);

const ActividadesReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredSales = mockData.activitySales.filter(sale => {
    if (!startDate || !endDate) return true;
    const saleDate = new Date(sale.saleDate);
    return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
  });

  const totalSales = filteredSales.reduce((acc, sale) => acc + sale.saleValue, 0);
  const totalProfit = filteredSales.reduce((acc, sale) => acc + sale.profit, 0);
  const totalPassengers = filteredSales.reduce((acc, sale) => acc + sale.passengers, 0);

  return (
    <div>
      <Card className="p-8">
        <h2 className="font-title text-2xl mb-6">Reportes de Actividades</h2>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-[#444444]">Fecha de Inicio</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-[#444444]">Fecha de Fin</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
          </div>
          <div className="pt-6">
            <button className="bg-[#222222] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#444444]">Filtrar</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard title="Total de Ventas" value={`$${totalSales.toLocaleString()}`} />
          <KpiCard title="Ganancia Total" value={`$${totalProfit.toLocaleString()}`} changeType="positive" />
          <KpiCard title="Total Pasajeros" value={totalPassengers} />
        </div>

        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Actividad</th>
              <th className="px-6 py-3">Fecha Venta</th>
              <th className="px-6 py-3">Pasajeros</th>
              <th className="px-6 py-3">Valor Venta</th>
              <th className="px-6 py-3">Ganancia</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id} className="bg-white border-b">
                <td className="px-6 py-4 font-semibold text-[#000000]">{sale.clientName}</td>
                <td className="px-6 py-4">{sale.activityName}</td>
                <td className="px-6 py-4">{sale.saleDate}</td>
                <td className="px-6 py-4">{sale.passengers}</td>
                <td className="px-6 py-4">${sale.saleValue.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-green-600">${sale.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const Cotizaciones = ({ onNavigateToCreator }) => {
  const [modalStep, setModalStep] = useState(0); // 0: closed, 1: type selection, 2: details
  const [quoteType, setQuoteType] = useState('Itinerario');
  const [clients, setClients] = useState(mockData.clients);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Enviada': return 'bg-blue-100 text-blue-800';
      case 'Esperando Respuesta': return 'bg-yellow-100 text-yellow-800';
      case 'Aceptada': return 'bg-green-100 text-green-800';
      case 'Rechazada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartQuote = () => {
    if (clients.length > 0) {
      setSelectedClientId(clients[0].id);
    }
    setModalStep(1);
  };

  const handleProceedToDetails = () => {
    setModalStep(2);
  };

  const handleSaveNewClient = (e) => {
    e.preventDefault();
    const newClient = {
      id: `CL-${String(clients.length + 1).padStart(3, '0')}`,
      fullName: e.target.elements.fullName.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      city: '',
      country: '',
      status: 'Contactado',
      details: 'Cliente nuevo agregado desde cotización.',
      contractedServices: []
    };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    setSelectedClientId(newClient.id); // Automatically select the new client
    setIsNewClientModalOpen(false);
  };


  const handleCreateQuote = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const client = clients.find(c => c.id === selectedClientId);
    const destination = elements.cotizacionDest.value;

    if (!client) {
      console.error("Cliente no seleccionado.");
      return;
    }

    const quoteDetails = { client: client.fullName, destination, type: quoteType };

    if (quoteType === 'Itinerario') {
      quoteDetails.startDate = elements.startDate.value;
      quoteDetails.endDate = elements.endDate.value;
    } else if (quoteType === 'Alojamiento') {
      quoteDetails.checkIn = elements.checkIn.value;
      quoteDetails.checkOut = elements.checkOut.value;
      quoteDetails.passengers = elements.passengers.value;
    } else if (quoteType === 'Transfer') {
      quoteDetails.ida = elements.ida.value;
      quoteDetails.vuelta = elements.vuelta.value;
    } else if (quoteType === 'Actividad') {
      quoteDetails.activityDate = elements.activityDate.value;
    }

    onNavigateToCreator(quoteDetails);
    setModalStep(0);
  };

  const quoteTypes = [
    { type: 'Itinerario', label: 'Itinerario Completo', icon: icons.roadmap },
    { type: 'Alojamiento', label: 'Solo Alojamiento', icon: icons.alojamiento },
    { type: 'Transfer', label: 'Solo Transfer', icon: icons.transfers },
    { type: 'Actividad', label: 'Tour o Actividad', icon: icons.actividades }
  ];

  const renderDynamicFields = () => {
    switch (quoteType) {
      case 'Itinerario':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-[#444444]">Fecha de Comienzo</label>
              <input type="date" id="startDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-[#444444]">Fecha de Fin</label>
              <input type="date" id="endDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
          </div>
        );
      case 'Alojamiento':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-[#444444]">Fecha Check-in</label>
                <input type="date" id="checkIn" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-[#444444]">Fecha Check-out</label>
                <input type="date" id="checkOut" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-[#444444]">Cantidad de Personas</label>
              <input type="number" id="passengers" defaultValue="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
          </>
        );
      case 'Transfer':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ida" className="block text-sm font-medium text-[#444444]">Fecha de Ida</label>
              <input type="date" id="ida" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label htmlFor="vuelta" className="block text-sm font-medium text-[#444444]">Fecha de Vuelta (Opcional)</label>
              <input type="date" id="vuelta" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        );
      case 'Actividad':
        return (
          <div>
            <label htmlFor="activityDate" className="block text-sm font-medium text-[#444444]">Fecha de la Actividad</label>
            <input type="date" id="activityDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            <p className="text-xs text-gray-500 mt-1">Para múltiples fechas, agrégalas en el siguiente paso.</p>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <div>
      {isNewClientModalOpen && (
        <Modal onClose={() => setIsNewClientModalOpen(false)} size="lg" className="z-[60]">
          <h2 className="font-title text-2xl mb-6">Agregar Nuevo Cliente</h2>
          <form onSubmit={handleSaveNewClient}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" name="fullName" id="fullName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (WhatsApp)</label>
                <input type="tel" name="phone" id="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsNewClientModalOpen(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD5C5A]">
                Cancelar
              </button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FD5C5A] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD5C5A]">
                Guardar Cliente
              </button>
            </div>
          </form>
        </Modal>
      )}
      {/* Modal Step 1: Select Quote Type */}
      {modalStep === 1 && (
        <Modal onClose={() => setModalStep(0)}>
          <h2 className="font-title text-2xl mb-6">¿Qué tipo de cotización quieres crear?</h2>
          <div className="grid grid-cols-2 gap-4">
            {quoteTypes.map(item => (
              <button
                key={item.type}
                onClick={() => setQuoteType(item.type)}
                className={classNames(
                  "p-4 border-2 rounded-lg flex flex-col items-center justify-center text-center transition-colors duration-200",
                  quoteType === item.type ? "border-[#FD5C5A] bg-red-50 shadow-inner" : "border-gray-200 hover:border-gray-400"
                )}
              >
                <div className="w-10 h-10 text-[#FD5C5A]">{React.cloneElement(item.icon, { className: "w-8 h-8" })}</div>
                <span className="mt-2 font-semibold text-sm text-[#222222]">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={handleProceedToDetails} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
              Continuar
            </button>
          </div>
        </Modal>
      )}

      {/* Modal Step 2: Enter Details */}
      {modalStep === 2 && (
        <Modal onClose={() => setModalStep(0)}>
          <h2 className="font-title text-2xl mb-2">Crear Cotización</h2>
          <p className="mb-6 text-[#444444]">Cotización de tipo: <span className="font-semibold text-[#222222]">{quoteType}</span></p>
          <form onSubmit={handleCreateQuote}>
            <div className="space-y-4">
              <div>
                <label htmlFor="cotizacionClient" className="block text-sm font-medium text-[#444444]">Cliente</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select
                    id="cotizacionClient"
                    name="cotizacionClient"
                    className="focus:ring-[#FD5C5A] focus:border-[#FD5C5A] block w-full sm:text-sm border-gray-300 rounded-l-md"
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                  >
                    {clients.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsNewClientModalOpen(true)}
                    className="relative -ml-px inline-flex items-center justify-center p-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
                  >
                    {React.cloneElement(icons.plus, { className: "h-5 w-5 text-gray-400" })}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="cotizacionDest" className="block text-sm font-medium text-[#444444]">Destino</label>
                <input type="text" id="cotizacionDest" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: París, Francia" required />
              </div>
              {renderDynamicFields()}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button type="button" onClick={() => setModalStep(1)} className="text-sm text-[#444444] hover:underline">
                &larr; Volver
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Iniciar Creación
              </button>
            </div>
          </form>
        </Modal>
      )}

      <header className="flex justify-between items-center">
        <div>
          <h1 className="header-title">Gestión de Cotizaciones</h1>
          <p className="mt-2 text-[#444444]">Crea, envía y gestiona tus propuestas comerciales.</p>
        </div>
        <button onClick={handleStartQuote} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Nueva Cotización
        </button>
      </header>
      <Card className="mt-8 overflow-x-auto">
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Destino</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockData.proposals.map(prop => (
              <tr key={prop.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-500">{prop.id}</td>
                <td className="px-6 py-4 font-bold text-[#000000]">{prop.client}</td>
                <td className="px-6 py-4">{prop.destination}</td>
                <td className="px-6 py-4">{prop.date}</td>
                <td className="px-6 py-4">${prop.value.toLocaleString('es-AR')}</td>
                <td className="px-6 py-4">
                  <span className={classNames('px-2 py-1 font-semibold leading-tight rounded-full text-xs', getStatusBadge(prop.status))}>
                    {prop.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="font-medium text-[#FD5C5A] hover:underline">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const QuoteCreator = ({ quoteData, onExit }) => {
  const [itinerary, setItinerary] = useState([]);
  const [mainHotel, setMainHotel] = useState(null); // { service, checkIn, checkOut }
  const [financials, setFinancials] = useState({ cost: 0, sale: 0, margin: 0 });
  const [marginPercent, setMarginPercent] = useState(20);

  // States for the service selection modal
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState('Alojamiento');
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const serviceData = {
    'Alojamiento': mockData.accommodations,
    'Tours': mockData.tours,
    'Actividades': mockData.activities,
    'Transfers': mockData.vehicleTypes,
  };
  const serviceTabs = ['Alojamiento', 'Tours', 'Actividades', 'Transfers'];

  // Initialize itinerary based on quoteData
  useEffect(() => {
    if (quoteData.type === 'Itinerario' && quoteData.startDate && quoteData.endDate) {
      const start = new Date(quoteData.startDate);
      const end = new Date(quoteData.endDate);
      const days = [];
      let current = new Date(start.valueOf());
      current.setDate(current.getDate() + 1); // Fix off-by-one date issue

      while (current <= end) {
        days.push({ date: current.toISOString().split('T')[0], services: [], mainHotelActive: true });
        current.setDate(current.getDate() + 1);
      }
      setItinerary(days);
    }
  }, [quoteData]);


  const calculateTotals = (currentItinerary, currentHotel) => {
    let dailyServicesCost = currentItinerary.reduce((total, day) => {
      return total + day.services.reduce((dayTotal, service) => {
        return dayTotal + (service.cost || 0);
      }, 0);
    }, 0);

    let hotelCost = 0;
    if (currentHotel && currentHotel.service && currentHotel.checkIn && currentHotel.checkOut) {
      const checkIn = new Date(currentHotel.checkIn);
      const checkOut = new Date(currentHotel.checkOut);

      // Adjust for timezone issues to compare dates correctly
      checkIn.setMinutes(checkIn.getMinutes() + checkIn.getTimezoneOffset());
      checkOut.setMinutes(checkOut.getMinutes() + checkOut.getTimezoneOffset());

      const activeNights = currentItinerary.reduce((count, day) => {
        const dayDate = new Date(day.date);
        dayDate.setMinutes(dayDate.getMinutes() + dayDate.getTimezoneOffset());
        // A night is counted if the hotel is active for that day, and the day is within the stay period (excluding checkout day)
        if (day.mainHotelActive && dayDate >= checkIn && dayDate < checkOut) {
          return count + 1;
        }
        return count;
      }, 0);
      hotelCost = (currentHotel.service.cost || 0) * activeNights;
    }

    const totalCost = dailyServicesCost + hotelCost;
    const totalSale = totalCost / (1 - (marginPercent / 100));

    setFinancials({
      cost: totalCost,
      sale: totalSale,
      margin: marginPercent
    });
  };

  // Recalculate when dependencies change
  useEffect(() => {
    calculateTotals(itinerary, mainHotel);
  }, [itinerary, mainHotel, marginPercent]);


  const openServiceModal = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
    setIsServiceModalOpen(true);
  };

  const addServiceToItinerary = (service) => {
    if (selectedDayIndex === null) return;
    const newItinerary = [...itinerary];
    newItinerary[selectedDayIndex].services.push({ ...service, id: Date.now() });
    setItinerary(newItinerary);
    setIsServiceModalOpen(false);
    setSelectedDayIndex(null);
  };

  const removeServiceFromItinerary = (dayIndex, serviceId) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].services = newItinerary[dayIndex].services.filter(s => s.id !== serviceId);
    setItinerary(newItinerary);
  };

  const toggleMainHotelForDay = (dayIndex) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].mainHotelActive = !newItinerary[dayIndex].mainHotelActive;
    setItinerary(newItinerary);
  };

  // Dummy handler for main hotel for now
  const handleAddMainHotel = () => {
    // In a real scenario, this would open a modal to select hotel and dates
    const hotel = mockData.accommodations[0];
    const checkIn = quoteData.startDate;
    const checkOut = quoteData.endDate;
    setMainHotel({ service: hotel, checkIn, checkOut });
  };

  const removeMainHotel = () => {
    setMainHotel(null);
  }

  // Fallback for non-itinerary types
  if (quoteData.type !== 'Itinerario') {
    return (
      <div className="h-full flex flex-col">
        <header className="pb-4 border-b border-gray-200">
          <button onClick={onExit} className="text-sm text-[#FD5C5A] hover:underline">&larr; Volver a Cotizaciones</button>
          <div className="mt-4">
            <h1 className="header-title text-3xl">Creador de Cotización ({quoteData.type})</h1>
            <p className="mt-2 text-[#444444]">Esta vista simplificada está en desarrollo.</p>
          </div>
        </header>
        <div className="flex-grow mt-6">
          <PlaceholderPage title={`Creador para ${quoteData.type}`} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Service Selection Modal */}
      {isServiceModalOpen && (
        <Modal onClose={() => setIsServiceModalOpen(false)} size="2xl">
          <h2 className="font-title text-2xl mb-4">Seleccionar Servicio para Día {selectedDayIndex + 1}</h2>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              {serviceTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveServiceTab(tab)}
                  className={classNames(
                    'whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm',
                    activeServiceTab === tab ? 'border-[#FD5C5A] text-[#FD5C5A]' : 'border-transparent text-gray-500 hover:text-gray-700'
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-4 h-96 overflow-y-auto space-y-3 pr-2">
            {serviceData[activeServiceTab].map((item, idx) => (
              <div key={idx} className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">Costo: ${item.cost?.toLocaleString('es-AR')}</p>
                </div>
                <button onClick={() => addServiceToItinerary(item)} className="bg-[#FD5C5A] text-white text-xs font-semibold py-1 px-3 rounded-md hover:opacity-90">
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}

      <header className="pb-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <button onClick={onExit} className="text-sm text-[#FD5C5A] hover:underline">&larr; Volver a Cotizaciones</button>
          <button className="bg-[#FD5C5A] text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90">
            Guardar y Enviar
          </button>
        </div>
        <div className="mt-4">
          <h1 className="header-title text-3xl">Creador de Itinerario</h1>
          <p className="mt-2 text-[#444444]">Para: <span className="font-semibold text-[#222222]">{quoteData.client}</span> | Destino: <span className="font-semibold text-[#222222]">{quoteData.destination}</span></p>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 mt-6 overflow-hidden">
        <div className="overflow-y-auto pr-4">
          {/* Main Hotel Section */}
          <div className="mb-6">
            <h2 className="font-title text-xl mb-4">Alojamiento Principal</h2>
            {mainHotel ? (
              <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#222222]">{mainHotel.service.name}</p>
                  <p className="text-sm text-gray-500">
                    Check-in: {mainHotel.checkIn} | Check-out: {mainHotel.checkOut}
                  </p>
                </div>
                <button onClick={removeMainHotel} className="text-gray-400 hover:text-red-500">
                  {icons.trash}
                </button>
              </div>
            ) : (
              <button onClick={handleAddMainHotel} className="w-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#FD5C5A] hover:text-[#FD5C5A] font-semibold py-3 rounded-lg transition-colors flex items-center justify-center">
                {icons.plus} <span className="ml-2">Agregar Hotel Principal</span>
              </button>
            )}
          </div>

          {/* Itinerary Section */}
          <h2 className="font-title text-xl mb-4">Itinerario Día por Día</h2>
          <div className="space-y-6">
            {itinerary.map((day, dayIndex) => (
              <div key={dayIndex}>
                <h3 className="font-semibold text-[#222222] border-b pb-2">Día {dayIndex + 1}: {day.date}</h3>
                <div className="mt-4 space-y-2">
                  {/* Display main hotel if applicable and active for the day */}
                  {mainHotel && day.mainHotelActive && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex justify-between items-center">
                      <div className="flex items-center">
                        {icons.alojamiento}
                        <p className="ml-3 font-semibold text-sm text-blue-800">{mainHotel.service.name}</p>
                      </div>
                      <button
                        onClick={() => toggleMainHotelForDay(dayIndex)}
                        className="text-xs text-blue-600 hover:underline"
                        title="Quitar el hotel principal solo para este día"
                      >
                        Quitar
                      </button>
                    </div>
                  )}

                  {/* Display message to re-add main hotel if inactive */}
                  {mainHotel && !day.mainHotelActive && (
                    <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                      <p className="text-sm text-gray-600">Alojamiento principal desactivado para este día.</p>
                      <button
                        onClick={() => toggleMainHotelForDay(dayIndex)}
                        className="text-xs text-green-600 hover:underline font-semibold"
                      >
                        Reactivar
                      </button>
                    </div>
                  )}
                  {/* Display day-specific services */}
                  {day.services.map((service) => (
                    <div key={service.id} className="bg-white p-3 rounded-lg border flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.type || 'Transfer'}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-semibold">${service.price?.toLocaleString('es-AR')}</p>
                        <button onClick={() => removeServiceFromItinerary(dayIndex, service.id)} className="text-gray-400 hover:text-red-500">
                          {icons.trash}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => openServiceModal(dayIndex)} className="w-full mt-2 border border-dashed border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600 font-semibold py-1.5 rounded-lg transition-colors text-xs flex items-center justify-center">
                    + Agregar Servicio a este día
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => { }} className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#FD5C5A] hover:text-[#FD5C5A] font-semibold py-2 rounded-lg transition-colors flex items-center justify-center">
              {icons.plus} <span className="ml-2">Modificar Días del Itinerario</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Summary Footer */}
      <footer className="mt-6 pt-4 border-t border-gray-200 bg-white -mx-8 -mb-8 px-8 py-4 rounded-b-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Costo Total</p>
              <p className="text-xl font-bold text-[#444444]">${financials.cost.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="margin" className="text-xs text-gray-500 uppercase font-semibold">Margen</label>
              <input
                type="number"
                id="margin"
                value={marginPercent}
                onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
                className="w-16 p-1 text-center border-gray-300 rounded-md"
              />
              <span className="text-xl font-bold text-[#444444]">%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase font-semibold text-right">Precio de Venta Final</p>
            <p className="text-3xl font-bold text-[#FD5C5A]">${financials.sale.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


const PlaceholderPage = ({ title }) => (
  <div>
    <h1 className="header-title">{title}</h1>
    <p className="mt-4 text-[#444444]">Esta sección está en construcción.</p>
    <div className="mt-8 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <p className="text-center text-gray-500">El contenido para "{title}" aparecerá aquí.</p>
    </div>
  </div>
);

const ProvidersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

  const handleOpenModal = (provider = null) => {
    setEditingProvider(provider);
    setIsModalOpen(true);
  };

  const handleSaveProvider = (e) => {
    e.preventDefault();
    console.log("Guardando proveedor...");
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingProvider ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}</h2>
          <form onSubmit={handleSaveProvider}>
            <div className="space-y-4">
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-[#444444]">Nombre Completo</label>
                <input type="text" id="providerName" defaultValue={editingProvider?.fullName} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="providerEmail" className="block text-sm font-medium text-[#444444]">Email</label>
                <input type="email" id="providerEmail" defaultValue={editingProvider?.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="providerPhone" className="block text-sm font-medium text-[#444444]">Teléfono (WhatsApp)</label>
                <input type="tel" id="providerPhone" defaultValue={editingProvider?.phone} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="providerCity" className="block text-sm font-medium text-[#444444]">Ciudad</label>
                  <input type="text" id="providerCity" defaultValue={editingProvider?.city} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="providerCountry" className="block text-sm font-medium text-[#444444]">País</label>
                  <input type="text" id="providerCountry" defaultValue={editingProvider?.country} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="providerType" className="block text-sm font-medium text-[#444444]">Tipo de Proveedor</label>
                <input type="text" id="providerType" defaultValue={editingProvider?.type} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="providerAgreement" className="block text-sm font-medium text-[#444444]">Acuerdo / Comisión</label>
                <input type="text" id="providerAgreement" defaultValue={editingProvider?.agreement} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="header-title">Gestión de Proveedores</h1>
          <p className="mt-2 text-[#444444]">Administra tu red de proveedores y colaboradores.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Agregar Proveedor
        </button>
      </header>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockData.providers.map(provider => (
          <Card key={provider.id} className="p-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xl">
                  {provider.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#222222]">{provider.fullName}</h3>
                  <p className="text-sm text-[#444444]">{provider.city}, {provider.country}</p>
                  <p className="text-sm text-gray-400">{provider.id}</p>
                </div>
              </div>
              <span className={classNames(
                'px-2 py-1 text-xs font-semibold rounded-full',
                provider.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              )}>
                {provider.status}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[#444444]">
              <p><strong>Email:</strong> {provider.email}</p>
              <p><strong>Teléfono:</strong> {provider.phone}</p>
              <p><strong>Tipo:</strong> {provider.type}</p>
              <p><strong>Acuerdo:</strong> {provider.agreement}</p>
              <div>
                <strong>Servicios Ofrecidos:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {provider.servicesOffered.map(service => (
                    <span key={service} className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center space-x-2">
              <a href={`https://wa.me/${provider.phone}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 text-sm">Contactar</a>
              <button onClick={() => handleOpenModal(provider)} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 text-sm">Ver Detalles</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SettingsCategoryManager = ({ title, items, onOpenModal }) => (
  <Card className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-title text-xl">{title}</h3>
      <button onClick={() => onOpenModal(null, title)} className="bg-[#FD5C5A] text-white font-semibold py-1 px-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
        + Agregar
      </button>
    </div>
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item.id || item.name} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
          <span className="text-sm text-[#444444]">{item.name}</span>
          <div className="flex space-x-2">
            <button onClick={() => onOpenModal(item, title)} className="text-xs text-blue-600 hover:underline">Editar</button>
            <button className="text-xs text-red-600 hover:underline">Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  </Card>
);

const CategorySettings = ({ onOpenModal }) => (
  <div>
    <h2 className="header-title text-2xl mb-6">Categorías</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SettingsCategoryManager title="Tipos de Transfer" items={mockData.services.map(s => ({ id: s.id, name: s.names.es }))} onOpenModal={onOpenModal} />
      <SettingsCategoryManager title="Tipos de Alojamiento" items={[{ id: 1, name: 'Hotel' }, { id: 2, name: 'Posada' }, { id: 3, name: 'Departamento Temporario' }, { id: 4, name: 'Hostel' }]} onOpenModal={onOpenModal} />
      <SettingsCategoryManager title="Tipos de Tour" items={[{ id: 1, name: 'Ciudad' }, { id: 2, name: 'Aventura' }, { id: 3, name: 'Gastronomía' }, { id: 4, name: 'Cultural' }]} onOpenModal={onOpenModal} />
      <SettingsCategoryManager title="Tipos de Actividades" items={[{ id: 1, name: 'Restaurante' }, { id: 2, name: 'Espectáculo' }, { id: 3, name: 'Deporte' }, { id: 4, name: 'Ocio Nocturno' }]} onOpenModal={onOpenModal} />
      <SettingsCategoryManager title="Categorías de Proveedores" items={[{ id: 1, name: 'Hotelería' }, { id: 2, name: 'Transportista' }, { id: 3, name: 'Operador Turístico' }, { id: 4, name: 'Operador de Actividades' }]} onOpenModal={onOpenModal} />
    </div>
  </div>
);

const FinancialSettings = ({ onOpenModal }) => (
  <div>
    <h2 className="header-title text-2xl mb-6">Finanzas</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SettingsCategoryManager title="Monedas" items={mockData.currencies} onOpenModal={onOpenModal} />
      <SettingsCategoryManager title="Métodos de Pago" items={mockData.paymentMethods} onOpenModal={onOpenModal} />
    </div>
  </div>
);

const UserSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    console.log("Guardando usuario...");
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
          <form onSubmit={handleSaveUser}>
            <div className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-[#444444]">Nombre Completo</label>
                <input type="text" id="userName" defaultValue={editingUser?.fullName} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-[#444444]">Email</label>
                <input type="email" id="userEmail" defaultValue={editingUser?.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="userRole" className="block text-sm font-medium text-[#444444]">Rol</label>
                <select id="userRole" defaultValue={editingUser?.role || 'Agente de Ventas'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Administrador</option>
                  <option>Agente de Ventas</option>
                  <option>Operador</option>
                </select>
              </div>
              <div>
                <label htmlFor="userStatus" className="block text-sm font-medium text-[#444444]">Estado</label>
                <select id="userStatus" defaultValue={editingUser?.status || 'Activo'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="header-title text-2xl">Gestión de Usuarios</h2>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Agregar Usuario
        </button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Rol</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockData.users.map(user => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{user.fullName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={classNames(
                    'px-2 py-1 font-semibold leading-tight rounded-full text-xs',
                    user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleOpenModal(user)} className="font-medium text-[#FD5C5A] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const TemplatesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleOpenModal = (template = null) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    console.log("Guardando plantilla...");
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{editingTemplate ? 'Editar Plantilla' : 'Crear Nueva Plantilla'}</h2>
          <form onSubmit={handleSaveTemplate}>
            <div className="space-y-4">
              <div>
                <label htmlFor="templateName" className="block text-sm font-medium text-[#444444]">Nombre de la Plantilla</label>
                <input type="text" id="templateName" defaultValue={editingTemplate?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="templateType" className="block text-sm font-medium text-[#444444]">Tipo</label>
                <select id="templateType" defaultValue={editingTemplate?.type || 'Email'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Email</option>
                  <option>Propuesta</option>
                </select>
              </div>
              <div>
                <label htmlFor="templateContent" className="block text-sm font-medium text-[#444444]">Contenido</label>
                <textarea id="templateContent" rows="8" defaultValue={editingTemplate?.content} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm" placeholder="Usa variables como {{cliente.nombre}}"></textarea>
                <p className="mt-2 text-xs text-gray-500">Variables disponibles: `{"{{cliente.nombre}}"}`, `{"{{reserva.id}}"}`, `{"{{propuesta.destino}}"}`</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar Plantilla
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="header-title text-2xl">Plantillas de Email y Propuestas</h2>
        <button onClick={() => handleOpenModal()} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Crear Plantilla
        </button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Tipo</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockData.templates.map(template => (
              <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{template.name}</td>
                <td className="px-6 py-4">
                  <span className={classNames(
                    'px-2 py-1 font-semibold leading-tight rounded-full text-xs',
                    template.type === 'Email' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  )}>
                    {template.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleOpenModal(template)} className="font-medium text-[#FD5C5A] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Categorías');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ item: null, categoryTitle: '' });

  const settingsTabs = ['Categorías', 'Finanzas', 'Usuarios', 'Plantillas'];

  const handleOpenModal = (item, categoryTitle) => {
    setModalData({ item, categoryTitle });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Guardando:", modalData);
    setIsModalOpen(false);
  };

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'Categorías': return <CategorySettings onOpenModal={handleOpenModal} />;
      case 'Finanzas': return <FinancialSettings onOpenModal={handleOpenModal} />;
      case 'Usuarios': return <UserSettings />;
      case 'Plantillas': return <TemplatesPage />;
      default: return <CategorySettings onOpenModal={handleOpenModal} />;
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">{modalData.item ? `Editar ${modalData.categoryTitle}` : `Agregar ${modalData.categoryTitle}`}</h2>
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-[#444444]">Nombre</label>
                <input type="text" id="itemName" defaultValue={modalData.item?.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
      <header>
        <h1 className="header-title">Configuración</h1>
        <p className="mt-2 text-[#444444]">Administra las opciones y parámetros de la aplicación.</p>
      </header>
      <div className="mt-8 flex space-x-8">
        <aside className="w-1/4">
          <nav className="space-y-1">
            {settingsTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  'w-full text-left px-3 py-2 rounded-md text-sm font-medium',
                  activeTab === tab
                    ? 'bg-[#222222] text-white'
                    : 'text-[#444444] hover:bg-gray-100'
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          {renderSettingsContent()}
        </div>
      </div>
    </div>
  );
};

// --- MÓDULO DE EXPEDIENTES ---

const Expedientes = ({ onNavigateToDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveExpediente = (e) => {
    e.preventDefault();
    console.log("Guardando nuevo expediente...");
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmado': return 'bg-blue-100 text-blue-800';
      case 'Cotizado': return 'bg-yellow-100 text-yellow-800';
      case 'En Curso': return 'bg-indigo-100 text-indigo-800';
      case 'Finalizado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredExpedientes = mockData.expedientes
    .filter(exp => {
      if (typeFilter === 'Todos') return true;
      return exp.type === typeFilter;
    })
    .filter(exp =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.client.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="font-title text-2xl mb-6">Crear Nuevo Expediente</h2>
          <form onSubmit={handleSaveExpediente}>
            <div className="space-y-4">
              <div>
                <label htmlFor="expName" className="block text-sm font-medium text-[#444444]">Nombre del Expediente</label>
                <input type="text" id="expName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="expClient" className="block text-sm font-medium text-[#444444]">Cliente</label>
                <select id="expClient" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  {mockData.clients.map(c => <option key={c.id}>{c.fullName}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="expType" className="block text-sm font-medium text-[#444444]">Tipo</label>
                <select id="expType" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Individual</option>
                  <option>Grupal</option>
                </select>
              </div>
              <div>
                <label htmlFor="expPax" className="block text-sm font-medium text-[#444444]">Pasajeros</label>
                <input type="number" id="expPax" defaultValue="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                Crear Expediente
              </button>
            </div>
          </form>
        </Modal>
      )}

      <header className="flex justify-between items-center">
        <div>
          <h1 className="header-title">Gestión de Expedientes</h1>
        </div>
        <button onClick={handleOpenModal} className="bg-[#FD5C5A] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          + Nuevo Expediente
        </button>
      </header>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
          {['Todos', 'Individual', 'Grupal'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={classNames(
                'px-3 py-1 text-sm font-semibold rounded-md transition-colors',
                typeFilter === type ? 'bg-white text-[#222222] shadow-sm' : 'text-[#444444] hover:bg-white/50'
              )}
            >
              {type}
            </button>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Buscar por expediente o cliente..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
          />
        </div>
      </div>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-[#444444]">
          <thead className="text-xs text-[#222222] uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Nombre del Expediente</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Tipo</th>
              <th scope="col" className="px-6 py-3">Pax</th>
              <th scope="col" className="px-6 py-3">Venta Total</th>
              <th scope="col" className="px-6 py-3">Saldo Pendiente</th>
              <th scope="col" className="px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpedientes.map(exp => (
              <tr key={exp.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => onNavigateToDetail(exp.id)}>
                <td className="px-6 py-4 font-semibold text-gray-500">{exp.id}</td>
                <td className="px-6 py-4 font-bold text-[#000000]">{exp.name}</td>
                <td className="px-6 py-4">{exp.client}</td>
                <td className="px-6 py-4">{exp.type}</td>
                <td className="px-6 py-4 text-center">{exp.passengers}</td>
                <td className="px-6 py-4">${exp.totalSale.toLocaleString('es-AR')}</td>
                <td className="px-6 py-4 font-semibold text-red-600">${exp.balance.toLocaleString('es-AR')}</td>
                <td className="px-6 py-4">
                  <span className={classNames('px-2 py-1 font-semibold leading-tight rounded-full text-xs', getStatusBadge(exp.status))}>
                    {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const ExpedienteDetail = ({ expedienteId, onBackToList }) => {
  const [activeTab, setActiveTab] = useState('Resumen');
  const expediente = mockData.expedientes.find(e => e.id === expedienteId);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmado': return 'bg-blue-100 text-blue-800';
      case 'Cotizado': return 'bg-yellow-100 text-yellow-800';
      case 'En Curso': return 'bg-indigo-100 text-indigo-800';
      case 'Finalizado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!expediente) {
    return (
      <div>
        <button onClick={onBackToList} className="text-sm text-[#FD5C5A] hover:underline mb-4">&larr; Volver a Expedientes</button>
        <p>Expediente no encontrado.</p>
      </div>
    );
  }

  const tabs = ['Resumen', 'Servicios', 'Finanzas', 'Reportes'];

  const rentabilidadBruta = expediente.totalSale - expediente.totalCost;

  return (
    <div>
      <button onClick={onBackToList} className="text-sm text-[#FD5C5A] hover:underline mb-4">&larr; Volver a Expedientes</button>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="header-title">{expediente.name}</h1>
            <p className="mt-2 text-[#444444]">ID: {expediente.id}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500 mr-2 uppercase font-title">Estado:</span>
            <span className={classNames(
              'px-3 py-1.5 text-sm font-bold rounded-lg',
              getStatusBadge(expediente.status)
            )}>
              {expediente.status}
            </span>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm',
                activeTab === tab
                  ? 'border-[#FD5C5A] text-[#FD5C5A]'
                  : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === 'Resumen' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Izquierda: Información y Pasajeros */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-6">
                <h3 className="font-title text-xl mb-4">Información General</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500">Cliente</p><p className="font-semibold text-[#222222]">{expediente.client}</p></div>
                  <div><p className="text-gray-500">Tipo</p><p className="font-semibold text-[#222222]">{expediente.type}</p></div>
                  <div><p className="text-gray-500">Pasajeros</p><p className="font-semibold text-[#222222]">{expediente.passengers}</p></div>
                  <div><p className="text-gray-500">Fechas</p><p className="font-semibold text-[#222222]">20/08/2024 - 30/08/2024</p></div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-title text-xl mb-4">Lista de Pasajeros</h3>
                <ul className="space-y-2">
                  {/* Mock passengers */}
                  <li className="text-sm text-[#444444]">Roberto Silva</li>
                  <li className="text-sm text-[#444444]">Ana de Silva</li>
                </ul>
              </Card>
            </div>
            {/* Columna Derecha: Resumen Financiero */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h3 className="font-title text-xl mb-4">Resumen Financiero (Interno)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#444444]">Venta Total</p>
                    <p className="text-sm font-bold text-[#222222]">${expediente.totalSale.toLocaleString('es-AR')}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#444444]">Costo Total</p>
                    <p className="text-sm font-bold text-[#222222]">${expediente.totalCost.toLocaleString('es-AR')}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <p className="text-sm font-semibold text-[#444444]">Rentabilidad Bruta</p>
                    <p className="text-sm font-bold text-green-600">${rentabilidadBruta.toLocaleString('es-AR')}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t mt-4">
                    <p className="text-sm font-semibold text-[#444444]">Saldo Cliente</p>
                    <p className="text-sm font-bold text-red-600">${expediente.balance.toLocaleString('es-AR')}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        {activeTab === 'Servicios' && <PlaceholderPage title="Servicios del Expediente" />}
        {activeTab === 'Finanzas' && <PlaceholderPage title="Finanzas del Expediente" />}
        {activeTab === 'Reportes' && <PlaceholderPage title="Reportes del Expediente" />}
      </div>
    </div>
  );
};


// --- MÓDULO FINANCIERO ---

const FinancieroDashboard = () => {
  const totalPorCobrar = mockData.expedientes.reduce((sum, exp) => sum + exp.balance, 0);
  // Mock data for other KPIs
  const totalPorPagar = 12500;
  const saldoCajas = 58200;
  const gananciaNetaMes = 15300;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total por Cobrar" value={`$${totalPorCobrar.toLocaleString('es-AR')}`} />
        <KpiCard title="Total por Pagar" value={`$${totalPorPagar.toLocaleString('es-AR')}`} />
        <KpiCard title="Saldo en Cajas/Bancos" value={`$${saldoCajas.toLocaleString('es-AR')}`} />
        <KpiCard title="Ganancia Neta del Mes" value={`$${gananciaNetaMes.toLocaleString('es-AR')}`} changeType="positive" />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-title text-xl mb-4">Ingresos vs. Egresos (Últimos 30 días)</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de barras aquí</p>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-title text-xl mb-4">Ventas por Tipo de Servicio</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico circular aquí</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Financiero = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabs = ['Dashboard', 'Movimientos de Caja', 'Cuentas por Cobrar', 'Cuentas por Pagar'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <FinancieroDashboard />;
      case 'Movimientos de Caja': return <PlaceholderPage title="Movimientos de Caja" />;
      case 'Cuentas por Cobrar': return <PlaceholderPage title="Cuentas por Cobrar" />;
      case 'Cuentas por Pagar': return <PlaceholderPage title="Cuentas por Pagar" />;
      default: return <FinancieroDashboard />;
    }
  };

  return (
    <div>
      <header>
        <h1 className="header-title">Módulo Financiero</h1>
        <p className="mt-2 text-[#444444]">Visión global de las finanzas de la agencia.</p>
      </header>
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm',
                activeTab === tab
                  ? 'border-[#FD5C5A] text-[#FD5C5A]'
                  : 'border-transparent text-[#444444] hover:text-[#222222] hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
};

// --- MÓDULO DE PROPUESTAS IA ---

const GeneratedProposal = ({ proposal, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProposal, setEditableProposal] = useState(proposal);

  useEffect(() => {
    setEditableProposal(proposal);
  }, [proposal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length > 1) {
      setEditableProposal(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: keys[0] === 'budget' ? parseFloat(value) || 0 : value
        }
      }));
    } else {
      setEditableProposal(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleItineraryChange = (e, index) => {
    const { name, value } = e.target;
    const newItinerary = [...editableProposal.itinerary];
    newItinerary[index] = { ...newItinerary[index], [name]: value };
    setEditableProposal(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // En una app real, aquí se guardaría la data actualizada.
  };

  const handleCancel = () => {
    setEditableProposal(proposal);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-sm text-[#FD5C5A] hover:underline">&larr; Generar otra propuesta</button>
        <div>
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="bg-gray-200 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 text-sm mr-2">
                Cancelar
              </button>
              <button onClick={handleSave} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 text-sm">
                Guardar Cambios
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-gray-200 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 text-sm mr-2">
                Editar Propuesta
              </button>
              <button className="bg-white border border-gray-300 text-[#444444] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 text-sm mr-2">
                Generar PDF
              </button>
              <button className="bg-[#222222] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#444444] text-sm">
                Enviar a Cliente
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 sm:p-8 md:p-12 mx-auto max-w-4xl font-body">
        {/* 1. Portada */}
        <header className="relative rounded-lg overflow-hidden h-96">
          <img src={editableProposal.coverImage} alt={editableProposal.destination} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="text-lg">Una propuesta de viaje para {editableProposal.clientName}</p>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editableProposal.title}
                onChange={handleInputChange}
                className="bg-transparent border-b-2 border-white/50 text-4xl md:text-6xl font-bold font-title uppercase tracking-wider w-full focus:outline-none focus:border-white"
              />
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold font-title uppercase tracking-wider">{editableProposal.title}</h1>
            )}
          </div>
        </header>

        {/* 2. Resumen del Viaje */}
        <section className="mt-12 text-center">
          <h2 className="font-title text-3xl text-center">Tu Aventura en {editableProposal.destination}</h2>
          {isEditing ? (
            <textarea
              name="summary"
              value={editableProposal.summary}
              onChange={handleInputChange}
              rows="4"
              className="mt-4 w-full max-w-2xl mx-auto text-[#444444] border border-gray-300 rounded-md p-2 focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
            />
          ) : (
            <p className="mt-4 max-w-2xl mx-auto text-[#444444]">{editableProposal.summary}</p>
          )}
        </section>

        {/* 3. Itinerario */}
        <section className="mt-12">
          <h2 className="font-title text-3xl text-center mb-8">Itinerario Día por Día</h2>
          <div className="space-y-8">
            {editableProposal.itinerary.map((day, index) => (
              <div key={day.day} className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img src={day.image} alt={day.title} className="rounded-lg shadow-md w-full h-64 object-cover" />
                </div>
                <div className="md:w-1/2">
                  <p className="font-title text-[#FD5C5A] text-lg">DÍA {day.day}</p>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      <input type="text" name="title" value={day.title} onChange={(e) => handleItineraryChange(e, index)} className="font-title text-2xl w-full border border-gray-300 rounded-md p-1" />
                      <textarea name="description" value={day.description} onChange={(e) => handleItineraryChange(e, index)} rows="3" className="text-[#444444] text-sm w-full border border-gray-300 rounded-md p-1" />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-title text-2xl mt-1">{day.title}</h3>
                      <p className="mt-2 text-[#444444] text-sm">{day.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Alojamiento */}
        <section className="mt-12">
          <h2 className="font-title text-3xl text-center mb-8">Tu Alojamiento</h2>
          <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img src={editableProposal.accommodation.image} alt={editableProposal.accommodation.name} className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="md:w-1/2">
              {isEditing ? (
                <div className="space-y-2">
                  <input type="text" name="accommodation.name" value={editableProposal.accommodation.name} onChange={handleInputChange} className="font-title text-2xl w-full border border-gray-300 rounded-md p-1" />
                  <textarea name="accommodation.details" value={editableProposal.accommodation.details} onChange={handleInputChange} rows="3" className="text-[#444444] w-full border border-gray-300 rounded-md p-1" />
                </div>
              ) : (
                <>
                  <h3 className="font-title text-2xl">{editableProposal.accommodation.name}</h3>
                  <p className="mt-2 text-[#444444]">{editableProposal.accommodation.details}</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 5. Presupuesto */}
        <section className="mt-12">
          <h2 className="font-title text-3xl text-center mb-8">Resumen de la Inversión</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-title text-xl mb-4">Incluye</h3>
              <ul className="space-y-2">
                {editableProposal.budget.includes.map(item => (
                  <li key={item} className="flex items-center text-[#444444]">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-title text-xl mb-4">No Incluye</h3>
              <ul className="space-y-2">
                {editableProposal.budget.excludes.map(item => (
                  <li key={item} className="flex items-center text-[#444444]">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 text-center bg-white border-2 border-[#FD5C5A] rounded-lg p-6">
              <p className="font-title text-xl uppercase text-[#444444]">Inversión Total</p>
              {isEditing ? (
                <div className="flex items-center justify-center mt-2">
                  <span className="font-title text-5xl font-bold text-[#222222]">$</span>
                  <input
                    type="number"
                    name="budget.total"
                    value={editableProposal.budget.total}
                    onChange={handleInputChange}
                    className="font-title text-5xl font-bold text-[#222222] w-auto max-w-xs text-center bg-transparent focus:outline-none focus:ring-0 border-0 p-0"
                  />
                </div>
              ) : (
                <p className="font-title text-5xl font-bold text-[#222222] mt-2">${editableProposal.budget.total.toLocaleString('es-AR')}</p>
              )}
              <p className="text-sm text-gray-500">por persona</p>
            </div>
          </div>
        </section>

        {/* 6. Próximos Pasos */}
        <section className="mt-12 text-center">
          <h2 className="font-title text-3xl text-center">¿Listos para la aventura?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#444444]">Si esta propuesta te emociona tanto como a nosotros, el siguiente paso es simple. Contáctanos para confirmar los detalles y comenzar a hacer realidad este viaje soñado.</p>
          <button className="mt-6 bg-[#FD5C5A] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all transform hover:scale-105">
            Confirmar Propuesta
          </button>
        </section>
      </div>
    </div>
  );
};


const PropuestasIA = () => {
  const [view, setView] = useState('form'); // 'form', 'loading', 'proposal'
  const [proposalData, setProposalData] = useState(null);
  const [clients, setClients] = useState(mockData.clients);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(mockData.clients[0]?.id || '');


  // State for the new structured form
  const [tripType, setTripType] = useState('Luna de Miel');
  const [hotelCategories, setHotelCategories] = useState([]);
  const [budget, setBudget] = useState('$$');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');

  // Handler for hotel category selection (multi-select)
  const handleHotelCategoryToggle = (category) => {
    setHotelCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSaveNewClient = (e) => {
    e.preventDefault();
    const newClient = {
      id: `CL-${String(clients.length + 1).padStart(3, '0')}`,
      fullName: e.target.elements.fullName.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      city: '',
      country: '',
      status: 'Contactado',
      details: 'Cliente nuevo agregado desde Propuestas IA.',
      contractedServices: []
    };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    setSelectedClientId(newClient.id);
    setIsNewClientModalOpen(false);
  };

  // --- SIMULACIÓN DE IA ---
  const simulateAIResponse = (inputs) => {
    const { clientName, destination, tripType, budget, hotelCategories, notes } = inputs;

    const destinationClean = destination.split(' por ')[0] || destination;

    // Base de conocimiento de la IA (simulada)
    const itineraryIdeas = {
      'París': [
        { day: 1, title: 'Llegada y Magia en Montmartre', description: 'Traslado privado al hotel. Tarde para explorar el barrio bohemio, la Basílica del Sacré-Cœur y cenar en un bistró clásico con vistas a la ciudad.', image: 'https://images.unsplash.com/photo-1556364329-80a838ac6f18?q=80&w=1974&auto=format&fit=crop' },
        { day: 2, title: 'Arte, Cultura y el Sena', description: 'Visita guiada por el Museo del Louvre para admirar obras maestras. Por la tarde, un relajante crucero por el río Sena al atardecer para ver los puentes iluminados.', image: 'https://images.unsplash.com/photo-1598605273628-560027b40da3?q=80&w=1964&auto=format&fit=crop' },
        { day: 3, title: 'Íconos y Glamour', description: 'Mañana en la Torre Eiffel con acceso prioritario. Por la tarde, visita al Arco del Triunfo y paseo por los lujosos Campos Elíseos.', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1974&auto=format&fit=crop' },
      ],
      'Orlando': [
        { day: 1, title: 'Reino de la Fantasía', description: 'Día completo en Magic Kingdom, disfrutando de los desfiles, atracciones clásicas y los espectaculares fuegos artificiales sobre el castillo.', image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=1964&auto=format&fit=crop' },
        { day: 2, title: 'Aventura Cinematográfica', description: 'Explora Universal Studios y Islands of Adventure, sumergiéndote en el mundo de Harry Potter y las emocionantes montañas rusas.', image: 'https://images.unsplash.com/photo-1616469462203-3fd799983988?q=80&w=2070&auto=format&fit=crop' },
        { day: 3, title: 'Naturaleza y Compras', description: 'Mañana de compras en los Orlando Premium Outlets y tarde de relax, paseo en bote y cena en los restaurantes de Disney Springs.', image: 'https://images.unsplash.com/photo-1595322839443-4e5c18c17134?q=80&w=2070&auto=format&fit=crop' },
      ],
      'default': [
        { day: 1, title: 'Llegada y Exploración Local', description: 'Traslado al hotel. Día libre para una primera toma de contacto con la ciudad, explorar los alrededores y disfrutar de una cena de bienvenida.', image: 'https://images.unsplash.com/photo-1527632911563-562b7c166bdc?q=80&w=1974&auto=format&fit=crop' },
        { day: 2, title: 'Corazón de la Ciudad', description: 'Tour guiado por los puntos más emblemáticos e históricos. Aprenderás sobre la cultura local y visitarás los monumentos imprescindibles.', image: 'https://images.unsplash.com/photo-1486591913741-2f32ac564b6c?q=80&w=2070&auto=format&fit=crop' },
        { day: 3, title: 'Sabores y Compras', description: 'Mañana dedicada a la gastronomía local con una visita a un mercado tradicional, seguida de una tarde de compras en las zonas comerciales más populares.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop' },
      ]
    };

    const budgetMap = { '$': 3500, '$$': 6750, '$$$': 12000 };

    // Simula la selección de un hotel basado en la categoría
    const suggestedHotel = mockData.accommodations.find(h => hotelCategories.includes(h.type)) || mockData.accommodations[1];

    return {
      clientName: clientName,
      destination: destinationClean,
      title: `Un Viaje Inolvidable a ${destinationClean}`,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2070&auto=format&fit=crop',
      summary: `Hemos diseñado esta propuesta de viaje de tipo '${tripType}' a ${destinationClean} pensando en ti. Tomando en cuenta tus preferencias por hoteles ${hotelCategories.join(', ')} y tu presupuesto (${budget}), esta experiencia se enfoca en tus notas: '${notes || 'crear momentos memorables'}'. Prepárate para un viaje increíble.`,
      accommodation: {
        name: suggestedHotel.name,
        details: `Un encantador hotel de tipo '${suggestedHotel.type}' perfectamente ubicado para tu aventura.`,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
      },
      itinerary: itineraryIdeas[destinationClean] || itineraryIdeas['default'],
      budget: {
        total: budgetMap[budget] || 6000,
        includes: ['Vuelos internacionales', 'Alojamiento con desayuno', 'Traslados privados', 'Tours mencionados'],
        excludes: ['Almuerzos y cenas no especificados', 'Gastos personales']
      }
    };
  };


  const handleGenerateProposal = (e) => {
    e.preventDefault();
    setView('loading');

    const selectedClient = clients.find(c => c.id === selectedClientId);

    const inputs = {
      clientName: selectedClient?.fullName || 'Cliente',
      destination: destination,
      tripType: tripType,
      budget: budget,
      hotelCategories: hotelCategories.length > 0 ? hotelCategories : ['Boutique'],
      notes: notes,
    };

    // Simulate API call with dynamic data
    setTimeout(() => {
      const newProposal = simulateAIResponse(inputs);
      setProposalData(newProposal);
      setView('proposal');
    }, 2000);
  };

  if (view === 'loading') {
    return (
      <div>
        <header>
          <h1 className="header-title">Generador de Propuestas con IA</h1>
          <p className="mt-2 text-[#444444]">Estamos creando una experiencia inolvidable...</p>
        </header>
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <svg className="animate-spin h-12 w-12 text-[#FD5C5A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold text-[#222222]">Analizando preferencias y diseñando el viaje perfecto...</p>
          <p className="text-[#444444]">Esto puede tomar un momento.</p>
        </div>
      </div>
    );
  }

  if (view === 'proposal' && proposalData) {
    return <GeneratedProposal proposal={proposalData} onBack={() => setView('form')} />;
  }

  return (
    <div>
      {isNewClientModalOpen && (
        <Modal onClose={() => setIsNewClientModalOpen(false)} size="lg">
          <h2 className="font-title text-2xl mb-6">Agregar Nuevo Cliente</h2>
          <form onSubmit={handleSaveNewClient}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" name="fullName" id="fullName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (WhatsApp)</label>
                <input type="tel" name="phone" id="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsNewClientModalOpen(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD5C5A]">
                Cancelar
              </button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FD5C5A] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD5C5A]">
                Guardar Cliente
              </button>
            </div>
          </form>
        </Modal>
      )}
      <header>
        <h1 className="header-title">Generador de Propuestas con IA</h1>
        <p className="mt-2 text-[#444444]">Completa los datos para que la IA cree una propuesta de viaje personalizada.</p>
      </header>

      <Card className="mt-8 p-8 max-w-2xl mx-auto">
        <form onSubmit={handleGenerateProposal}>
          <div className="space-y-6">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-[#444444]">1. Selecciona el Cliente</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  id="client"
                  name="client"
                  className="focus:ring-[#FD5C5A] focus:border-[#FD5C5A] block w-full sm:text-sm border-gray-300 rounded-l-md"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                >
                  {clients.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                </select>
                <button
                  type="button"
                  onClick={() => setIsNewClientModalOpen(true)}
                  className="relative -ml-px inline-flex items-center justify-center p-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
                  title="Agregar nuevo cliente"
                >
                  + Nuevo
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-[#444444]">2. Destino y Duración</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Ej: París por 7 días"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tripType" className="block text-sm font-medium text-[#444444]">3. Tipo de Viaje</label>
                <select
                  id="tripType"
                  name="tripType"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
                >
                  <option>Luna de Miel</option>
                  <option>Familiar</option>
                  <option>Aventura</option>
                  <option>Negocios</option>
                  <option>Cultural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#444444]">4. Presupuesto Aproximado</label>
                <div className="mt-1 grid grid-cols-3 gap-1 bg-gray-200 p-1 rounded-lg">
                  {['$', '$$', '$$$'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setBudget(level)}
                      className={classNames(
                        'px-3 py-1 text-sm font-semibold rounded-md transition-colors',
                        budget === level ? 'bg-white text-[#222222] shadow-sm' : 'text-[#444444] hover:bg-white/50'
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#444444]">5. Categoría de Hotel Preferida</label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Boutique', 'Lujo', 'Económico', 'Cadenas'].map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleHotelCategoryToggle(category)}
                    className={classNames(
                      'p-2 border rounded-lg text-sm transition-colors',
                      hotelCategories.includes(category)
                        ? 'bg-[#222222] text-white border-[#222222]'
                        : 'bg-white text-[#444444] border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-[#444444]">6. Notas Adicionales</label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FD5C5A] focus:border-[#FD5C5A]"
                placeholder="Cualquier otro detalle importante... (ej: alérgico a los mariscos, prefieren vuelos directos, etc.)"
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" className="bg-[#FD5C5A] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all transform hover:scale-105">
              Generar Propuesta Mágica ✨
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};


// --- COMPONENTE SIDEBAR (MENÚ) ---

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: icons.dashboard, section: 'main' },
    { id: 'Roadmap', label: 'Roadmap', icon: icons.roadmap, section: 'main' },
    { id: 'Expedientes', label: 'Expedientes', icon: icons.expedientes, section: 'operativo' },
    { id: 'Financiero', label: 'Financiero', icon: icons.financiero, section: 'operativo' },
    { id: 'Transfers', label: 'Transfers', icon: icons.transfers, section: 'servicios' },
    { id: 'Alojamiento', label: 'Alojamiento', icon: icons.alojamiento, section: 'servicios' },
    { id: 'Tours', label: 'Tours', icon: icons.tours, section: 'servicios' },
    { id: 'Actividades', label: 'Actividades', icon: icons.actividades, section: 'servicios' },
    { id: 'Cotizaciones', label: 'Cotizaciones', icon: icons.cotizaciones, section: 'gestion', isNew: true },
    { id: 'Reservas', label: 'Reservas', icon: icons.reservas, section: 'gestion' },
    { id: 'Clientes', label: 'Clientes', icon: icons.clientes, section: 'gestion' },
    { id: 'Proveedores', label: 'Proveedores', icon: icons.proveedores, section: 'gestion' },
    { id: 'Settings', label: 'Settings', icon: icons.settings, section: 'gestion' },
    { id: 'Propuestas IA', label: 'Propuestas IA', icon: icons.propuestas, section: 'gestion' },
  ];

  const NavLink = ({ item }) => (
    <li>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActivePage(item.id); }}
        className={classNames(
          'flex items-center p-2 rounded-lg transition-colors font-body',
          activePage === item.id
            ? 'bg-[#222222] text-white'
            : 'text-[#444444] hover:bg-gray-100 hover:text-[#222222]'
        )}
      >
        {item.icon}
        <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
        {item.isNew && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Nuevo</span>
        )}
      </a>
    </li>
  );

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="sidebar-logo">enter<span>.</span>travel</h1>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.filter(i => i.section === 'main').map(item => <NavLink key={item.id} item={item} />)}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-body">Operativo</h3>
          <ul className="mt-2 space-y-2">
            {menuItems.filter(i => i.section === 'operativo').map(item => <NavLink key={item.id} item={item} />)}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-body">Servicios</h3>
          <ul className="mt-2 space-y-2">
            {menuItems.filter(i => i.section === 'servicios').map(item => <NavLink key={item.id} item={item} />)}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-body">Gestión</h3>
          <ul className="mt-2 space-y-2">
            {menuItems.filter(i => i.section === 'gestion').map(item => <NavLink key={item.id} item={item} />)}
          </ul>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 text-[#444444] flex items-center justify-center font-bold">
            MM
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-[#222222]">Martín Miguel</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [currentExpedienteId, setCurrentExpedienteId] = useState(null);
  const [quoteBuilderData, setQuoteBuilderData] = useState(null);

  const handleNavigateToExpedienteDetail = (id) => {
    setCurrentExpedienteId(id);
    setActivePage('ExpedienteDetail');
  };

  const handleBackToExpedientes = () => {
    setCurrentExpedienteId(null);
    setActivePage('Expedientes');
  };

  const handleNavigateToQuoteBuilder = (data) => {
    setQuoteBuilderData(data);
  };

  const handleExitQuoteBuilder = () => {
    setQuoteBuilderData(null);
    setActivePage('Cotizaciones');
  };

  const renderPage = () => {
    if (quoteBuilderData) {
      return <QuoteCreator quoteData={quoteBuilderData} onExit={handleExitQuoteBuilder} />;
    }

    if (activePage === 'ExpedienteDetail' && currentExpedienteId) {
      return <ExpedienteDetail expedienteId={currentExpedienteId} onBackToList={handleBackToExpedientes} />;
    }

    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'Expedientes': return <Expedientes onNavigateToDetail={handleNavigateToExpedienteDetail} />;
      case 'Financiero': return <Financiero />;
      case 'Transfers': return <TransfersHub />;
      case 'Reservas': return <Reservations />;
      case 'Clientes': return <Clients />;
      case 'Roadmap': return <Roadmap />;
      case 'Alojamiento': return <AlojamientoHub />;
      case 'Tours': return <ToursHub />;
      case 'Actividades': return <ActividadesHub />;
      case 'Cotizaciones': return <Cotizaciones onNavigateToCreator={handleNavigateToQuoteBuilder} />;
      case 'Proveedores': return <ProvidersPage />;
      case 'Propuestas IA': return <PropuestasIA />;
      case 'Settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <BrandStyles />
      <div className="h-screen flex bg-gray-50 font-body">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </>
  );
}