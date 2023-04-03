### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
   PostgreSQL is an open-source relational database management system emphasizing extensibility and SQL compliance
- What is the difference between SQL and PostgreSQL?
  - PostgreSQL is an object-relational database, while SQL is a relational database system.PostgreSQL offers more complex data types and allows object inheritance.

- In `psql`, how do you connect to a database?
  - \c <DatabaseName>

- What is the difference between `HAVING` and `WHERE`?
  - HAVING is used to return rows that meet a specific condition. WHERE is similar to HAVING but while it is used to filter through each row, HAVING filters grouped rows. 

- What is the difference between an `INNER` and `OUTER` join?
  - INNER joins will return data that both tables you are joining have in common, while OUTER joins will also return the data that is not in common, ie all.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
  - These simply return all records of the specified join, and the matched data of the other. So for example a LEFT OUTER will return all data from the "left" table, and then the in common data from the "right."

- What is an ORM? What do they do?
  - ORM stands for Object Relational Mapping, it provides a means to easily access data from a database by generating objects from that data that then can be easily manipulated in programming.

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?
  - Client side AJAX requests include JavaScript and are useful for retrieving data from API's to quickly present information on the screen while server side requests allow data retrieval from things like forms that interact with our databases.

- What is CSRF? What is the purpose of the CSRF token?
  - CSRF stands for Cross-site request forgery, a token with this abbreviation is a secret unique value that is assigned in order to prevent cyber related attacks or hacks.

- What is the purpose of `form.hidden_tag()`?
  - This is a hidden area of an application that includes the CSRF token to prevent said cyber attacks.
