/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();

    if (!currentUser) {
      return;
    }

    Account.list(currentUser, (err, response) => {      
      if (response.success) {
        const html = response.data.map(item => `<option value="${item.id}">${item.name}</option>`);

        this.element.querySelector('select').innerHTML = html.join('');
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    data.account_id = this.element.querySelector('select').value;

    Transaction.create(data, (err, response) => {
      if (response.success) { 
        if (this.element.matches('#new-income-form')) {
          App.getModal('newIncome').close();
        }
        
        if (this.element.matches('#new-expense-form')) {
          App.getModal('newExpense').close();
        }

        this.element.reset();
        App.update(); 
      }
    });
  }
}