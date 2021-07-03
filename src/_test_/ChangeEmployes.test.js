"use strict";

import React from "react";
import renderer from "react-test-renderer";
import { employes } from "./Authorization.test";

import ChangeEmployes from "../components/ChangeEmployee";

/* {
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
  } */

test("проверка правильности значений инпутов при открытии карточки", () => {
  let component = renderer.create(
    <ChangeEmployes employes={employes} idEmp={employes[0].id} indexEmp={0} />
  );
  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let level = component.root.find((el) => el.props.name == "level");
  expect(level.props.value).toBe(2);

  let email = component.root.find((el) => el.props.name == "email");
  expect(email.props.value).toBe("kulakov@example.com");

  let phone = component.root.find((el) => el.props.name == "phone");
  expect(phone.props.value).toBe("294389052");

  let department = component.root.find((el) => el.props.name == "department");
  expect(department.props.value).toBe("Складское хозяйство");

  let position = component.root.find((el) => el.props.name == "position");
  expect(position.props.value).toBe("Начальник отдела");
});

test("проверка ввода", () => {
  let component = renderer.create(
    <ChangeEmployes employes={employes} idEmp={employes[0].id} indexEmp={0} />
  );
  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let level = component.root.find((el) => el.props.name == "level");
  level.props.onChange({ target: { value: 2 } });

  let email = component.root.find((el) => el.props.name == "email");
  email.props.onChange({ target: { value: "dad@errr.com" } });

  let phone = component.root.find((el) => el.props.name == "phone");
  phone.props.onChange({ target: { value: '"295559052"' } });

  let department = component.root.find((el) => el.props.name == "department");
  department.props.onChange({ target: { value: "Руководство" } });

  let position = component.root.find((el) => el.props.name == "position");
  position.props.onChange({ target: { value: "Рукамиводитель" } });

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();
});

test("проверка некорректного ввода", () => {
  let component = renderer.create(
    <ChangeEmployes employes={employes} idEmp={employes[0].id} indexEmp={0} />
  );
  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let level = component.root.find((el) => el.props.name == "level");
  level.props.onChange({ target: { value: 2 } });

  let email = component.root.find((el) => el.props.name == "email");
  email.props.onChange({ target: { value: "daderrr.com" } });

  let phone = component.root.find((el) => el.props.name == "phone");
  phone.props.onChange({ target: { value: '"29555ппп9052"' } });

  let department = component.root.find((el) => el.props.name == "department");
  department.props.onChange({ target: { value: "Руководство" } });

  let position = component.root.find((el) => el.props.name == "position");
  position.props.onChange({ target: { value: "рукамиводитель" } });

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();
});
