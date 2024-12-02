# part3
part3 tutorial

To avoid authentication issues with the password variable in index.js, we need to create a .env file by running npm install dotenv in the command line.
```js
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
```
process.argv.length < 3:

    В Node.js process.argv — это массив, который содержит аргументы командной строки, переданные при запуске скрипта.
    process.argv[0] — это путь к интерпретатору Node.js.
    process.argv[1] — это путь к исполняемому файлу скрипта.
    process.argv[2] и далее — это аргументы, которые передаются при запуске скрипта.

В данном случае проверяется, передан ли хотя бы один аргумент, который ожидается в скрипте (например, пароль). Если аргументов меньше, чем 3 (т.е. не передан обязательный аргумент), программа выводит сообщение и завершает выполнение с ошибкой.

console.log('give password as argument'):

    Если аргумент не был передан, выводится сообщение, информирующее пользователя о том, что нужно передать пароль как аргумент.

process.exit(1):

    process.exit() — это метод, который завершает выполнение программы.
    1 — это код завершения программы. В Unix-подобных системах (и в Node.js) принято использовать код 0 для успешного завершения программы и 1 или другие ненулевые коды для завершения с ошибкой.

When the code is run with the command `node mongo.js yourPassword`, Mongo will add a new document to the database.
