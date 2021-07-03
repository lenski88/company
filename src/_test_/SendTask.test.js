"use strict";

import React from "react";
import renderer from "react-test-renderer";
import { employes } from "./Authorization.test";

import SendTask from "../components/SendTask";

test("рендерится ли кнопка 'отмена'", () => {
  let component = renderer.create(
    <SendTask employes={employes} idEmp={employes[4].id} />
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let button = component.root.find((el) => el.props.value == "[Отмена]");
  expect(button).toBeTruthy();
});

test("правильность отображения имени адресата", () => {
  let component = renderer.create(
    <SendTask employes={employes} idEmp={employes[4].id} />
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let empName = component.root.find((el) => el.props.id == "empName");
  expect(empName.children.join("").trim()).toBe("Кому:Кулаков Кондрат");
});

test("рендерится ли кнопка 'отправить' при заполненном поле ввода", () => {
  let component = renderer.create(
    <SendTask employes={employes} idEmp={employes[4].id} />
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let input = component.root.find((el) => el.props.className == "inputText");
  input.props.onChange({ target: { value: "dk;gasjkdghlkjahdlkjahldkj" } });

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let buttonSend = component.root.find((el) => el.props.value == "[Отправить]");
  expect(buttonSend).toBeTruthy();
});
