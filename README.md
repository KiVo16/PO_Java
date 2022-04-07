## Projekt Programowanie objektowe
Autor: Jakub Kurek

Projekt składa się z aplikacji Spring Boot, która jako GUI serwuje aplikację napisaną w React.js, SCSS i Typescript. Cała obsługa baz danych i REST jest napisana w Javie. Całość opiera się na modelu projektowym MVC.

Sama aplikacja umożliwia wysyłanie wiadomości w czasie rzeczywistym do wielu chatów grupowych. Pokoje można tworzyć i do nich dołączać, a także każdy pokój zawiera statystyki użytkowników dla danego pokoju.

Wstępny design aplikacji: https://www.figma.com/proto/TLts4s0rkzRIxE4tG9lTPW/Chat---PO?node-id=0%3A1&scaling=min-zoom&page-id=0%3A1

Po uruchomieniu aplikacji (instrukcja na dole), sam interfejs będzie dostępny na http://localhost:8080/.
GUI było testowane w Google Chrome, dlatego też zalecam jego użycie.

## Struktura katalogów
Struktura katalogów to domyśly układ Javy. Dodatkowo w głównym folderze znajdują się katalogi:

 - docs - dokumentacja Javadoc
 - frontend - aplikacja Reactowa

## Serwowanie aplikacji webowej
Po dokonanu jakiej kolwiek zmiany w aplikacji Reactowej należy ją od nowa zbudowąć poprzed polecenie `yarn build` i zawartość katalogu `/frontend/build` przekopiować do katalogu `/target/classes/public`. 

Oczywiście można użyć do tego pluginu. W projekcie po wywołaniu `mvn install` katalog `build` sam się przekopiuje do `target`

## Dostęp do aplikacji
Aplikacja nie posiada, żadnej autoryzacji. Aby odzyskać zmiany po np. odświeżeniu przeglądarki, należy podać po prostu wcześniej używany login użytkownika. Jeżeli użytkownik poda login, którego nie ma w bazie, to użytkownik o takim loginie automatycznie zostanie utworzony.
#### Login jest Case Sensitive


## API
API jest RESTowe.
**Całe api dostępne jest pod prefixem `/api`**
Dostępne endpointy:
| Path | Method |Opis|
|--|--|--|
| /messages| `GET`|List wszystkich wiadomości|
| /messages/`:id` | `GET` |Pobranie pojedynczej wiadomości|
| /users` | `GET` |Lista wszystkich użytkowników|
| /users/`:id` | `GET` |Pobranie pojedynczego użytkownika|
| /users| `POST` |Utworzenie użytkownika lub jego pobranie jeżeli już taki istnieje|
| /login | `POST`|Alias. Wewnętrzne wywołuje handler z `/users POST`|
|/topics | `GET`|  List wszystkich pokoi |
|/topics | `POST`|  Utworzenie nowego pokoju |
| /topics/`:id` | `GET`|Pobranie pojedynczego pokoju|
| /topics/`:id`/messages| `GET`|Pobranie wszystkich wiadomości z danego pokoju|
| /topics/`:id`/users| `GET`|Pobranie członków danego pokoju|
| /topics/`:id`/users| `POST`| Dodanie istniejącego użytkownika do pokoju|
| /topics/`:id`/users/`:userId`| `POST`| Wysłanie wiadomości przez użytkownika w danym pokoju|
| /websocket| `-`| Websocket do komunikacji live|

## Baza danych
W projekcie wykorzystana jest baza plikowa SQLite. Jeżeli plik bazy nie istnieje to zostaje on automatycznie stworzony. 
Przykładowa baza danych znajduje się w `/sqlite.db`.
Do przeglądu bazy danych polecema program https://sqlitebrowser.org/

## Uruchomienie

**Uruchomienie lokalne**
Minimalne wymagania: `JAVA JDK 11` (na takiej uruchamiałem plik `.jar`)
 1. Pobrać repozytorium i przejść do katalogu głownego
 2. Uruchomienie pliku jar komendą `java -jar .\target\app-0.0.1-SNAPSHOT.jar` - jak widać plik `.jar` znajduje się w folderze `target`. W tym przykładzie zostanie załadowana przykładowa baza danych. Po wpisaniu loginu `Kuba` można przejść i zobaczyć działanie aplikacji. Dostepne loginy: `Kuba`, `Daniel` i `Maja`.

Aplikacje oczywiście można odpalać w innym miejscu. Baza zostanie automatycznie utworzona jeżeli plik sqlite.db nie istnieje.

