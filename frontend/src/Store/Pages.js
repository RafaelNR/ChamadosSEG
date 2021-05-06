import React from "react";
// Icons
import {
  AssignmentSharp,
  DashboardSharp,
  InsertChartSharp,
  BusinessSharp,
  CategorySharp,
  GroupSharp,
  ReportSharp,
  MessageSharp
} from '@material-ui/icons';

const defaultMenu = [
  {
    nome: 'Dashboard',
    icon: <DashboardSharp />,
    path: '/'
  },
  {
    nome: 'Atividades',
    icon: <AssignmentSharp />,
    path: '/atividades'
  },
  {
    nome: 'Perfil',
    path: '/perfil'
  },
  {
    nome: 'Criar Atividade',
    path: '/atividades/create'
  },
  {
    nome: 'Editar Atividade',
    path: '/atividades/edit'
  },
];

const tecnicoMenu = [
  // {
  //   nome: "Relatórios",
  //   icon: <InsertChartSharp />,
  //   path: "/relatorios/atividades/my",
  // },
];

const analistaMenu = [
  {
    nome: 'Relatórios',
    icon: <InsertChartSharp />,
    path: '/relatorios/atividades/'
  },
  {
    nome: 'Categorias',
    icon: <CategorySharp />,
    path: '/categorias'
  },
  {
    nome: 'Clientes',
    icon: <BusinessSharp />,
    path: '/clientes'
  },
  {
    nome: 'Usuários',
    icon: <GroupSharp />,
    path: '/usuarios'
  }
];

const adminMenu = [
  {
    nome: 'Logs',
    icon: <ReportSharp />,
    path: '/logs'
  }
  // {
  // 	nome: "Configurações",
  // 	icon: <SettingsSharp />,
  // 	path: "/configuracoes",
  // },
];

const Headers = [
  {
    nome: 'Dashboard',
    path: '/'
  },
  {
    nome: 'Modelos',
    path: '/modelos'
  },
  {
    nome: 'Clientes',
    path: '/clientes'
  },
  {
    nome: 'Atividades',
    path: '/atividades'
  },
  {
    nome: 'Perfil',
    path: '/perfil'
  },
  {
    nome: 'Criar Atividade',
    path: '/atividades/create'
  },
  {
    nome: 'Editar Atividade',
    path: '/atividades/edit/'
  },
  {
    nome: 'Visualizar Atividade',
    path: '/atividades/view/'
  },
  {
    nome: 'Relatórios Minhas Atividades',
    path: '/relatorios/atividades/my'
  },
  {
    nome: 'Relatórios Atividades',
    path: '/relatorios/atividades/'
  },
  {
    nome: 'Categorias',
    icon: <CategorySharp />,
    path: '/categorias'
  },
  {
    nome: 'Usuários',
    icon: <GroupSharp />,
    path: '/usuarios'
  },
  {
    nome: 'Logs',
    icon: <ReportSharp />,
    path: '/logs'
  }
];

export { adminMenu, analistaMenu, tecnicoMenu, defaultMenu , Headers };
