import React from "react";
// Icons
import {
  LibraryBooksSharp,
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
  // {
  // 	nome: "Tarefa",
  // 	icon: <LibraryBooksSharp />,
  // 	path: "/tarefas",
  // },
  {
    nome: "Relatórios",
    icon: <InsertChartSharp />,
    path: "/relatorios",
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

const adminMenu = [
  {
    nome: "Modelos",
    icon: <MessageSharp />,
    path: "/modelos",
  },
  {
    nome: "Clientes",
    icon: <BusinessSharp />,
    path: "/clientes",
  },
  {
    nome: "Categorias",
    icon: <CategorySharp />,
    path: "/categorias",
  },
  {
    nome: "Usuários",
    icon: <GroupSharp />,
    path: "/usuarios",
  },
  {
    nome: "Log",
    icon: <ReportSharp />,
    path: "/log",
  },
  // {
  // 	nome: "Configurações",
  // 	icon: <SettingsSharp />,
  // 	path: "/configuracoes",
  // },
];

export { adminMenu, defaultMenu };
