import React, { useState, useEffect } from 'react';

// --- ASSETS ---

const GlobalStyles = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Open+Sans:wght@400;600&display=swap"
      rel="stylesheet"
    />
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

const classNames = (...classes) => classes.filter(Boolean).join(' ');

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

const mockData = {
  dashboard: {
    kpis: [
      { title: "Conductores Activos", value: "8", change: "+2", changeType: "neutral" },
      { title: "Reservas Hoy", value: "24", change: "+12%", changeType: "positive" },
      { title: "Clientes Activos", value: "156", change: "+8%", changeType: "positive" },
      { title: "Ingresos del Mes", value: "$12,450", change: "+15%", changeType: "positive" },
    ],
    quickActions: [
      { title: "Agregar Reserva", description: "Crea un nuevo viaje para un cliente", primary: true },
      { title: "Enviar Cotización", description: "Genera y envía una nueva propuesta", primary: true },
    ],
    recentActivity: [
      { text: "Nueva reserva de Carlos Rodriguez para traslado al aeropuerto", time: "Hace 5 minutos" },
      { text: "María González cambió su estado a disponible", time: "Hace 12 minutos" },
      { text: "Nuevo cliente registrado: Ana Martínez", time: "Hace 25 minutos" },
      { text: "Propuesta de viaje generada para familia López", time: "Hace 1 hora" },
    ],
    fleetStatus: [
      { status: "Disponibles", count: 4, color: "bg-green-500" },
      { status: "Ocupados", count: 2, color: "bg-yellow-500" },
      { status: "Desconectados", count: 1, color: "bg-red-500" },
      { status: "Mantenimiento", count: 1, color: "bg-indigo-500" },
    ]
  },
  expedientes: [
    { id: "EXP-001", name: "Luna de Miel Silva", client: "Roberto Silva", type: "Individual", passengers: 2, status: "Confirmado", totalSale: 2855, totalCost: 2200, balance: 0 },
    { id: "EXP-002", name: "Familia Martinez en Orlando", client: "Familia Martinez", type: "Grupal", passengers: 4, status: "Confirmado", totalSale: 6500, totalCost: 5100, balance: 1500 },
  ],
};

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
        {change && (
          <span className={classNames("text-sm font-semibold", changeType === 'positive' ? 'text-green-600' : 'text-gray-500')}>
            {change}
          </span>
        )}
      </div>
    </div>
  </Card>
);

const Modal = ({ children, onClose, size = 'md', className }) => {
  const sizes = {
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
      <div className={classNames("bg-white rounded-xl shadow-2xl p-8 w-full", sizes[size])} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <>
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
          <Card key={action.title} className={classNames("p-5 cursor-pointer transition-transform transform hover:-translate-y-1", action.primary ? "bg-[#222222] text-white hover:bg-[#444444]" : "hover:bg-gray-50")}>
            <h3 className={classNames("font-semibold font-title", action.primary ? "text-white text-lg" : "text-[#222222]")}>{action.title.toUpperCase()}</h3>
            <p className={classNames("mt-1 text-sm", action.primary ? "text-gray-300" : "text-[#444444]")}>{action.description}</p>
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
                <span className={classNames("w-2.5 h-2.5 rounded-full mr-3", item.color)}></span>
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
  </>
);

const ExpedientesListPage = ({ onNavigateToDetail }) => {
  const expediente = mockData.expedientes[0];
  return (
    <>
      <header>
        <h1 className="header-title">Gestión de Expedientes</h1>
      </header>
      <Card className="mt-6">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Cliente</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => onNavigateToDetail(expediente.id)}>
              <td className="px-6 py-4">{expediente.id}</td>
              <td className="px-6 py-4">{expediente.name}</td>
              <td className="px-6 py-4">{expediente.client}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

const ExpedienteDetailPage = ({ expedienteId, onBackToList }) => {
  const expediente = mockData.expedientes.find(e => e.id === expedienteId);
  if (!expediente) return <p>Expediente no encontrado.</p>;

  return (
    <div>
      <button onClick={onBackToList} className="text-sm text-[#FD5C5A] hover:underline mb-4">← Volver</button>
      <h1 className="header-title">{expediente.name}</h1>
      <p className="mt-2 text-[#444444]">Cliente: {expediente.client}</p>
    </div>
  );
};


const PlaceholderComponent = ({ title }) => (
  <>
    <h1 className="header-title">{title}</h1>
    <p className="mt-4 text-[#444444]">Esta sección está en construcción.</p>
    <div className="mt-8 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <p className="text-center text-gray-500">El contenido para "{title}" aparecerá aquí.</p>
    </div>
  </>
);

const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
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

  const NavItem = ({ item }) => (
    <li>
      <a href="#" onClick={(e) => { e.preventDefault(); setActivePage(item.id); }} className={classNames('flex items-center p-2 rounded-lg transition-colors font-body', activePage === item.id ? 'bg-[#222222] text-white' : 'text-[#444444] hover:bg-gray-100 hover:text-[#222222]')}>
        {item.icon}
        <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
        {item.isNew && <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Nuevo</span>}
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
          {navItems.filter(i => i.section === 'main').map(item => <NavItem key={item.id} item={item} />)}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-body">Operativo</h3>
          <ul className="mt-2 space-y-2">
            {navItems.filter(i => i.section === 'operativo').map(item => <NavItem key={item.id} item={item} />)}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-body">Servicios</h3>
          <ul className="mt-2 space-y-2">
            {navItems.filter(i => i.section === 'servicios').map(item => <NavItem key={item.id} item={item} />)}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-body">Gestión</h3>
          <ul className="mt-2 space-y-2">
            {navItems.filter(i => i.section === 'gestion').map(item => <NavItem key={item.id} item={item} />)}
          </ul>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 text-[#444444] flex items-center justify-center font-bold">MM</div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-[#222222]">Martín Miguel</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
};


function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [activeExpediente, setActiveExpediente] = useState(null);

  const handleNavigateToExpedienteDetail = (expedienteId) => {
    setActiveExpediente(expedienteId);
    setActivePage('ExpedienteDetail');
  };

  const handleBackToExpedienteList = () => {
    setActiveExpediente(null);
    setActivePage('Expedientes');
  };

  const renderContent = () => {
    if (activePage === 'ExpedienteDetail' && activeExpediente) {
      return <ExpedienteDetailPage expedienteId={activeExpediente} onBackToList={handleBackToExpedienteList} />;
    }

    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Expedientes':
        return <ExpedientesListPage onNavigateToDetail={handleNavigateToExpedienteDetail} />;
      default:
        return <PlaceholderComponent title={activePage} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="h-screen flex bg-gray-50 font-body">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default App;
