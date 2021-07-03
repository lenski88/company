"use strict";

import React from "react";
import renderer from "react-test-renderer";
import { employes } from "./Authorization.test";
import { filterEmployes } from "./Authorization.test";
import { user } from "./Authorization.test";

import Employes from "../components/Employes";

let props = {
  employes: employes,
  user: user,
  filterEmployes: filterEmployes,
  workMode: 1,
  login: true,
};


test("проверка правильности отображения данных о сотруднике", () => {
  props = { ...props, workMode: 2 };
  let component = renderer.create(<Employes {...props} />);

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let emp = component.root.find((el) => el.props.id == 39);

  let name = emp.find((el) => el.props.id == "name");
  expect(name.children.join("")).toBe("Михалова Розалина Геласьевна");

  let position = emp.find((el) => el.props.id == "position");
  expect(position.children.join("")).toBe(
    "Специалист по кадровому делопроизводству"
  );
});


test("проверка employes", () => {
  let component = renderer.create(<Employes {...props} />);

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  props = { ...props, login: false };
  component = renderer.create(<Employes {...props} />);

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();
});
