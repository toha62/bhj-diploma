/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Element does not exist');
    }

    this.element = element; 
    this.activeAccount = null; 

    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();      

      if (event.target.matches('.create-account')) {
        App.getModal('createAccount').open();
      }

      const targetAccount = event.target.closest('.account');

      if (targetAccount) {
        this.onSelectAccount(targetAccount);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const currentUser = User.current();

    if (!currentUser) {
      return;
    }

    Account.list(currentUser, (err, response) => {
      // console.log('AccountList - ', response);
      if (response.success) {
        this.clear();
        this.renderItem(response.data);
      }
    });
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {    
    const elementList = this.element.querySelectorAll('.account');
    
    for (let element of elementList) {      
      element.remove();
    }    
    this.activeAccount = null; 
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {    
    this.setActive(element);
    App.showPage( 'transactions', { account_id: +element.dataset.id });
  }

  setActive( element ) {
    if (element.matches('.active')) {
      return;
    }

    element.classList.add('active');

    if (this.activeAccount) {
      this.activeAccount.classList.remove('active');      
    }
    this.activeAccount = element;
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum} ₽</span>
        </a>
      </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.map(item => this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item)));     
  }
}
