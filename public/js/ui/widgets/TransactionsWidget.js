/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Element does not exist');
    }

    this.element = element;   

    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const pressedButton = event.target.closest('button');
      
      if (pressedButton.matches('.create-income-button')) {
        App.getModal('newIncome').open();
      }

      if (pressedButton.matches('.create-expense-button')) {
        App.getModal('newExpense').open();
      }
    });
  }
}
