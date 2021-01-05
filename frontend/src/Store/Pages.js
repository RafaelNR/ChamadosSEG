import React from "react";
// Icons
import {
  AssignmentSharp,
  HomeSharp,
  InsertChartSharp,
  BusinessSharp,
  CategorySharp,
  GroupSharp,
  ReportSharp,
  MessageSharp,
} from "@material-ui/icons";

const defaultMenu = [
  {
    nome: "Home",
    icon: <HomeSharp />,
    path: "/", 
  },
  {
    nome: "Atividades",
    icon: <AssignmentSharp />,
    path: "/atividades",
  },
  {
    nome: "Perfil",
    path: "/perfil",
  },
  {
    nome: "Criar Atividade",
    path: "/atividades/create",
  },
  {
    nome: "Editar Atividade",
    path: "/atividades/edit",
  },
];

const tecnicoMenu = [
  {
    nome: "Relatórios",
    icon: <InsertChartSharp />,
    path: "/relatorios/atividades/my",
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

export { adminMenu, analistaMenu, tecnicoMenu, defaultMenu };
