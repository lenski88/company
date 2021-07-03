"use strict";

import React from "react";
import renderer from "react-test-renderer";

import Authorization from "../components/Authorization";

export let employes = [
  {
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
  },
  {
    id: 41,
    login: "guleka41",
    status: 0,
    level: 1,
    name: "Гулека Илья Андреевич",
    email: "guleka@example.com",
    phone: "293009088",
    department: "Складское хозяйство",
    position: "Заведующий складом",
    task: [],
  },
  {
    id: 42,
    login: "makarov42",
    status: 0,
    level: 1,
    name: "Макаров Касьян Миронович",
    email: "makarov@example.com",
    phone: "338367899",
    department: "Складское хозяйство",
    position: "Водитель погрузчика",
    task: [],
  },
  {
    id: 43,
    login: "doronin43",
    status: 0,
    level: 1,
    name: "Доронин Ермолай Степанович",
    email: "doroninE@example.com",
    phone: "296378900",
    department: "Складское хозяйство",
    position: "Водитель погрузчика",
    task: [],
  },
  {
    id: 44,
    login: "kulakov44",
    status: 0,
    level: 1,
    name: "Кулаков Кондрат Иванович",
    email: "kulakovK@example.com",
    phone: "294890974",
    department: "Складское хозяйство",
    position: "Водитель погрузчика",
    task: [],
  },
  {
    id: 45,
    login: "gorshkov45",
    status: 0,
    level: 1,
    name: "Горшков Витольд Германнович ",
    email: "gorshkovV@example.com",
    phone: "447389900",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 46,
    login: "gusev46",
    status: 0,
    level: 1,
    name: "Гусев Иосиф Вениаминович",
    email: "gusevI@example.com",
    phone: "293337892",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 47,
    login: "saveliev47",
    status: 0,
    level: 1,
    name: "Савельев Кондратий Владиславович",
    email: "savelievK@example.com",
    phone: "294039048",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 48,
    login: "tretiakov48",
    status: 0,
    level: 1,
    name: "Третьяков Назарий Ростиславович",
    email: "tretiyakovN@example.com",
    phone: "338390073",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 49,
    login: "dementiev49",
    status: 0,
    level: 1,
    name: "Дементьев Аверьян Борисович",
    email: "dementievA@example.com",
    phone: "293039944",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 50,
    login: "shestakov50",
    status: 0,
    level: 1,
    name: "Шестаков Рудольф Антонович",
    email: "shestakovR@example.com",
    phone: "293990877",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 51,
    login: "scherbakov51",
    status: 0,
    level: 1,
    name: "Щербаков Василий Вячеславович",
    email: "scherbakovV@example.com",
    phone: "293008966",
    department: "Складское хозяйство",
    position: "Грузчик",
    employmentDate: "15.12.2016",
    task: [],
  },
  {
    id: 52,
    login: "kopylov52",
    status: 0,
    level: 1,
    name: "Копылов Харитон Павлович",
    email: "kopylovH@example.com",
    phone: "293876640",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 53,
    login: "zaitsev53",
    status: 0,
    level: 1,
    name: "Зайцев Эльдар Артемович",
    email: "zaitsevE@example.com",
    phone: "293099028",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 54,
    login: "kononov54",
    status: 0,
    level: 1,
    name: "Кононов Захар Эльдарович",
    email: "kononovZ@example.com",
    phone: "338490038",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 55,
    login: "tretyakov55",
    status: 0,
    level: 1,
    name: "Третьяков Платон Сергеевич",
    email: "tretiyakovP@example.com",
    phone: "338490374",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 56,
    login: "nesterov56",
    status: 0,
    level: 1,
    name: "Нестеров Шарль Борисович",
    email: "nesterovS@example.com",
    phone: "294302784",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 57,
    login: "shashkov57",
    status: 0,
    level: 1,
    name: "Шашков Чарльз Эдуардович",
    email: "shashkovC",
    phone: "294037103",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
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
  },
  {
    id: 59,
    login: "savin59",
    status: 0,
    level: 1,
    name: "Савин Вадим Михайлович",
    email: "savinV@example.com",
    phone: "293027739",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 60,
    login: "chernov60",
    status: 0,
    level: 1,
    name: "Чернов Николай Григорьевич",
    email: "chernovN@example.com",
    phone: "339046390",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 61,
    login: "temchenko61",
    status: 0,
    level: 1,
    name: "Темченко Харитон Анатолиевич",
    email: "temchenkoH@example.com",
    phone: "339047389",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
  {
    id: 62,
    login: "stegailo62",
    status: 0,
    level: 1,
    name: "Стегайло Прохор Васильевич",
    email: "stegailo@example.com",
    phone: "337483900",
    department: "Складское хозяйство",
    position: "Грузчик",
    task: [],
  },
];

export let filterEmployes = [
  {
    id: 35,
    login: "smirnova35",
    status: 0,
    level: 2,
    name: "Смирнова Августа Мироновна",
    email: "smirnova@example.com",
    phone: "338490037",
    department: "Отдел кадров",
    position: "Начальник отдела",
    task: [],
  },
  {
    id: 36,
    login: "volkova36",
    status: 0,
    level: 1,
    name: "Волкова Альжбета Наумовна",
    email: "volkova@example.com",
    phone: "338904788",
    department: "Отдел кадров",
    position: "Специалист по кадровому делопроизводству",
    task: [],
  },
  {
    id: 37,
    login: "shestakova37",
    status: 0,
    level: 1,
    name: "Шестакова Марьяна Рудольфовна",
    email: "shestakova@example.com",
    phone: "299807635",
    department: "Отдел кадров",
    position: "Специалист по кадровому делопроизводству",
    task: [],
  },
  {
    id: 38,
    login: "gorbacheva38",
    status: 0,
    level: 1,
    name: "Горбачёва Харита Георгиевна",
    email: "gorbacheva@example.com",
    phone: "293307893",
    department: "Отдел кадров",
    position: "Специалист по кадровому делопроизводству",
    task: [],
  },
  {
    id: 39,
    login: "mikhalova39",
    status: 0,
    level: 1,
    name: "Михалова Розалина Геласьевна",
    email: "mikhalova@example.com",
    phone: "337476633",
    department: "Отдел кадров",
    position: "Специалист по кадровому делопроизводству",
    task: [],
  },
];

export let user = {
  id: 30,
  login: "lukina30",
  status: 0,
  level: 3,
  name: "Лукина Мишель Федоровна",
  email: "lukina@example.com",
  phone: "293789200",
  department: "Бухгалтерия",
  position: "Главный бухгалтер",
  task: [],
};

test("проверка Authorization", () => {
  const component = renderer.create(
    <Authorization employes={employes} login={false} />
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
  let input = component.root.find(el => el.type == 'input')
  input.props.onChange({target:{value: 'sdfasdf'}})

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  input.props.onChange({target:{value: 'ivanov0'}})

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  input.props.onChange({target:{value: "saveliev47"}})

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  
});


test('проверка рендера кнопки при верном логине', () => {

  const component = renderer.create(
    <Authorization employes={employes} login={false} />
  ); 

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let input = component.root.find(el => el.type == 'input')
  input.props.onChange({target:{value: 'ivanov0'}})

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let button = component.root.find(el => el.props.className == 'button')
  expect(button).toBeTruthy()

})

test('проверка нажатия на кнопку войти', () => {

  const component = renderer.create(
    <Authorization employes={employes} login={false} />
  ); 

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let input = component.root.find(el => el.type == 'input')
  input.props.onChange({target:{value: 'ivanov0'}})

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let button = component.root.find(el => el.props.className == 'button');
  button.props.onPointerDown(); 

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  button.props.onPointerDown();

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

});


