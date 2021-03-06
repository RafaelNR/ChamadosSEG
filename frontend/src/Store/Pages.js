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
  Chat,
  ModeComment
} from '@material-ui/icons';

const defaultMenu = [
  {
    nome: 'Dashboard',
    icon: <DashboardSharp />,
    path: '/'
  },
  {
    nome: 'Minhas Atividades',
    icon: <AssignmentSharp />,
    path: '/atividades'
  },
  {
    nome: 'Meus Chamados',
    icon: <Chat />,
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
  },
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
    nome: 'Modelos Chamados',
    icon: <ModeComment />,
    path: '/modelos'
  },
  {
    nome: 'Logs',
    icon: <ReportSharp />,
    path: '/logs'
  }
];

const Headers = [
  {
    nome: 'Dashboard',
    path: '/'
  },
  {
    nome: 'Modelos Chamados',
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
    nome: 'Editar Chamado',
    path: '/chamado/edit/'
  },
  {
    nome: 'Criar Chamado',
    path: '/chamado/create'
  },
  {
    nome: 'Visualizar Chamado',
    path: '/chamado/view/'
  },
  {
    nome: 'Perfil',
    path: '/perfil'
  },
  {
    nome: 'Atividades',
    path: '/atividades'
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
    path: '/categorias'
  },
  {
    nome: 'Usuários',
    path: '/usuarios'
  },
  {
    nome: 'Logs',
    path: '/logs'
  },
];

export { adminMenu, analistaMenu, defaultMenu , Headers };
