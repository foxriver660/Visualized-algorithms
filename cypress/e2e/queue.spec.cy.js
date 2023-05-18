import {
  CHANGING_COLOR,
  
  CY_CIRCLE_CIRCLE,
  CY_CIRCLE_HEAD,
  CY_CIRCLE_LETTER,
  CY_CIRCLE_TAIL,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /queue", () => {
  beforeEach(() => {
    cy.visit(`/queue`);
  });

  it("должна начинаться с заблокированной кнопки", () => {
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });

  it("должна становиться активной при вводе данных", () => {
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
  });

  it("должна становиться снова заблокированной при удалении данных", () => {
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
    cy.get("input").clear();
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });
});

describe("визуализация алгоритма", () => {
  const test_arr = ["test", "this", "queu"];
  beforeEach(() => {
    cy.visit(`/queue`);
  });

  it("правильность добавления и удаления элементов в очередь", () => {
    cy.clock();
    const selectors = [
      { circle: CY_CIRCLE_CIRCLE, index: 0, alias: "1" },
      { circle: CY_CIRCLE_CIRCLE, index: 1, alias: "2" },
      { circle: CY_CIRCLE_CIRCLE, index: 2, alias: "3" }
    ];
      
    for (let i = 0; i < test_arr.length; i++) {
      const text = test_arr[i];
      const isFirstIteration = i === 0;
  
      selectors.forEach(({ circle, index, alias }) => {
        cy.get(circle).eq(index).as(alias);
      });
  
      cy.get("input").type(text);
      cy.get(CY_SUBMIT_BTN).click();
  
      if (isFirstIteration) {
        cy.get("@1").should("have.css", "border", CHANGING_COLOR).contains(text);
      } else {
        cy.get(`@${i}`).should("have.css", "border", DEFAULT_COLOR);
        cy.get(`@${i+1}`).should("have.css", "border", CHANGING_COLOR).contains(text);
      }
  
      cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
      cy.get(CY_CIRCLE_TAIL).eq(i).contains("tail");
      cy.tick(500);
    }
    cy.get("@3").should("have.css", "border", DEFAULT_COLOR);
    cy.tick(1000);
    // УДАЛЕНИЕ
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE).eq(0).should("have.css", "border", CHANGING_COLOR).contains(test_arr[0]);
    cy.get(CY_CIRCLE_CIRCLE).eq(1).should("have.css", "border", DEFAULT_COLOR).contains(test_arr[1]);
    cy.get(CY_CIRCLE_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(test_arr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.tick(500);
    cy.get(CY_CIRCLE_CIRCLE).eq(1).should("have.css", "border", DEFAULT_COLOR).contains(test_arr[1]);
    cy.get(CY_CIRCLE_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(test_arr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(1).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE).eq(1).should("have.css", "border", CHANGING_COLOR).contains(test_arr[1]);
    cy.get(CY_CIRCLE_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(test_arr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(1).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.tick(500);
    cy.get(CY_CIRCLE_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(test_arr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(2).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($el) => {
      expect($el).contain("");
    });

  });

  it("поведение кнопки «Очистить»", () => {
    cy.clock();
    cy.get(CY_RESET_BTN).should("be.disabled")
    for(let k = 0; k<test_arr.length; k++){
      cy.get("input").type(test_arr[k]);
      cy.get(CY_SUBMIT_BTN).click();
      cy.tick(500);
    }
    cy.get(CY_RESET_BTN).should("not.be.disabled").click();;
    cy.get(CY_CIRCLE_CIRCLE).each(($el) => {
      expect($el).contain("");
    });
  });
});
