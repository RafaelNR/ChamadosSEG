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
  MessageSharp,
  SpeakerNotesSharp
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
    nome: 'Chamados',
    icon: <SpeakerNotesSharp />,
    path: '/chamados'
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
  }
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
    nome: 'Usuários',
    icon: <GroupSharp />,
    path: '/usuarios'
  },
  {
    nome: 'Log de Usuários',
    icon: <ReportSharp />,
    path: '/logs'
  }
];

const adminMenu = [
  {
    nome: 'Clientes',
    icon: <BusinessSharp />,
    path: '/clientes'
  },
  {
    nome: 'Modelos',
    icon: <MessageSharp />,
    path: '/modelos'
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
    nome: 'Chamados',
    path: '/chamados'
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
    nome: 'Log dos Usuários',
    icon: <ReportSharp />,
    path: '/logs'
  }
];

export { adminMenu, analistaMenu, defaultMenu , Headers };
