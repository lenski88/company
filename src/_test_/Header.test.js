"use strict";

import React from "react";
import renderer from "react-test-renderer";
import { employes } from "./Authorization.test";
import { user } from "./Authorization.test";

import Header from "../components/Header";

test("проверка header", () => {
  let component = renderer.create(
    <Header user={user} employes={employes} login={true} modeEmployes={0} />
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let newUser = {
    id: 58,
    login: "kuzmin58",
    status: 0,
    level: 1,
    name: "Кузьмин Цицерон Данилович",
    email: "kuzminC",
    phone: "339043722",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  };

  component = renderer.create(
    <Header user={newUser} employes={employes} login={true} modeEmployes={0} />
  );

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  component = renderer.create(
    <Header user={newUser} employes={employes} login={true} modeEmployes={1} />
  );

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  component = renderer.create(
    <Header user={newUser} employes={employes} login={false} modeEmployes={0} />
  );

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();
});

test("правильность отображения имени", () => {
  let component = renderer.create(
    <Header user={user} employes={employes} login={true} modeEmployes={0} />
  );

  let helloUser = component.root.find((el) => el.props.id == "helloUser");
  expect(helloUser.children.join("")).toBe("Приветствую, Мишель!");

  let newUser = {
    id: 40,
    login: "kulakovI40",
    status: 0,
    level: 2,
    name: "Кулаков Иван Иванович",
    email: "kulakov@example.com",
    phone: "294389052",
    department: "Складское хозяйство",
    position: "Начальник отдела",
    task: [],
  };

  component = renderer.create(
    <Header user={newUser} employes={employes} login={true} modeEmployes={0} />
  );

  helloUser = component.root.find((el) => el.props.id == "helloUser");
  expect(helloUser.children.join("")).toBe("Приветствую, Иван!");
});

test("правильность отображения количества задач на кнопке", () => {
  let user = {
    id: 0,
    login: "ivanov0",
    status: 0,
    level: 3,
    name: "Иванов Иван Петрович",
    email: "ivanov@example.com",
    phone: "293345422",
    department: "Руководство",
    position: "Директор",
    task: [
      {
        id: 1,
        task: "Сделайте что-нибудь",
        sender: "Кулаков Кондрат Иванович",
      },
      {
        id: 2,
        task: "Поднимите уже, наконец, зарплату!",
        sender: "Ковалёва Радмила Даниловна",
      },
      { id: 3, task: "Погладьте котика", sender: "Шаров Ян Александрович" },
      { id: 4, task: "Погладьте котика", sender: "Шаров Ян Александрович" },
      { id: 5, task: "Погладьте котика", sender: "Шаров Ян Александрович" },
      { id: 6, task: "Погладьте котика", sender: "Шаров Ян Александрович" },
      { id: 7, task: "Погладьте котика", sender: "Шаров Ян Александрович" },
    ],
  };

  let component = renderer.create(
    <Header user={user} employes={employes} login={true} modeEmployes={0} />
  );
  let buttonTask = component.root.find((el) => el.props.id == "buttonTask");
  expect(buttonTask.props.value).toBe("[Мои задачи]:[7]");


  let newUser = {
    id: 0,
    login: "ivanov0",
    status: 0,
    level: 3,
    name: "Иванов Иван Петрович",
    email: "ivanov@example.com",
    phone: "293345422",
    department: "Руководство",
    position: "Директор",
    task: [
      {
        id: 1,
        task: "Сделайте что-нибудь",
        sender: "Кулаков Кондрат Иванович",
      },
      {
        id: 2,
        task: "Поднимите уже, наконец, зарплату!",
        sender: "Ковалёва Радмила Даниловна",
      },
      { id: 3, task: "Погладьте котика", sender: "Шаров Ян Александрович" },
    ],
  };

  component = renderer.create(
    <Header user={newUser} employes={employes} login={true} modeEmployes={0} />
  );
   buttonTask = component.root.find((el) => el.props.id == "buttonTask");
  expect(buttonTask.props.value).toBe("[Мои задачи]:[3]");
});
