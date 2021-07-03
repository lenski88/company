"use strict";

import React from "react";
import renderer from "react-test-renderer";
import { employes } from "./Authorization.test";

import AddNewEmp from "../components/AddNewEmp";

test("проверка правильности значений инпутов при открытии", () => {
  let component = renderer.create(<AddNewEmp employes={employes} />);

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let login = component.root.find((el) => el.props.name == "login");
  expect(login.props.value).toBe("");

  let level = component.root.find((el) => el.props.name == "level");
  expect(level.props.value).toBeFalsy();

  let fio = component.root.find((el) => el.props.name == "FIO");
  expect(fio.props.value).toBe("");

  let email = component.root.find((el) => el.props.name == "email");
  expect(email.props.value).toBe("");

  let phone = component.root.find((el) => el.props.name == "phone");
  expect(phone.props.value).toBe("");

  let department = component.root.find((el) => el.props.name == "department");
  expect(department.props.value).toBeFalsy();

  let position = component.root.find((el) => el.props.name == "position");
  expect(position.props.value).toBe("");
});

test("проверка ввода", () => {
  let component = renderer.create(<AddNewEmp employes={employes} />);

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let login = component.root.find((el) => el.props.name == "login");
  login.props.onChange({ target: { value: "asdf" } });

  let level = component.root.find((el) => el.props.name == "level");
  level.props.onChange({ target: { value: 2 } });

  let fio = component.root.find((el) => el.props.name == "FIO");
  fio.props.onChange({ target: { value: "Иванов Иван Иванович" } });

  let email = component.root.find((el) => el.props.name == "email");
  email.props.onChange({ target: { value: "ivanov@example.com" } });

  let phone = component.root.find((el) => el.props.name == "phone");
  phone.props.onChange({ target: { value: "295554422" } });

  let department = component.root.find((el) => el.props.name == "department");
  department.props.onChange({ target: { value: "Отдел продаж" } });

  let position = component.root.find((el) => el.props.name == "position");
  position.props.onChange({ target: { value: "Продавец" } });

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

});

test("проверка некорректного ввода", () => {
  let component = renderer.create(<AddNewEmp employes={employes} />);

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let login = component.root.find((el) => el.props.name == "login");
  login.props.onChange({ target: { value: "asdfsdfasdfasdfsd" } });

  let level = component.root.find((el) => el.props.name == "level");
  level.props.onChange({ target: { value: 2 } });

  let fio = component.root.find((el) => el.props.name == "FIO");
  fio.props.onChange({ target: { value: "ИвановИванИванович" } });

  let email = component.root.find((el) => el.props.name == "email");
  email.props.onChange({ target: { value: "ivanovexample.com" } });

  let phone = component.root.find((el) => el.props.name == "phone");
  phone.props.onChange({ target: { value: "2955544uu22" } });

  let department = component.root.find((el) => el.props.name == "department");
  department.props.onChange({ target: { value: "Отдел продаж" } });

  let position = component.root.find((el) => el.props.name == "position");
  position.props.onChange({ target: { value: "продавец" } });

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

}); 

