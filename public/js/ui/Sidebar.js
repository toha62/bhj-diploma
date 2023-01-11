/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.body = document.querySelector('body');
    this.toggleButton = document.querySelector('.sidebar-toggle');
    this.loginMenuItem = document.querySelector('.menu-item_login');
    this.logoutMenuItem = document.querySelector('.menu-item_logout');
    this.registerMenuItem = document.querySelector('.menu-item_register');

    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    this.toggleButton.addEventListener('click', (event) => {
      event.preventDefault();

      this.body.classList.toggle('sidebar-open');
      this.body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    this.registerMenuItem.addEventListener('click', () => {
      (App.getModal('register')).open();
    });

    this.loginMenuItem.addEventListener('click', () => {
      (App.getModal('login')).open();
    });

    this.logoutMenuItem.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response.success) {
          App.setState('init');
        }
      });
    });
  }
}