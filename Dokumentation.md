# Passwort Safe

The backend handles Authentication and Authorization of each individual user. It also takes care of each CRUD operation used for the records.

## **Start up**
To start this application, first navigate to the docker folder and execute ```docker compose up```. This will start the database server including **phpMyAdmin**. Afterwards, import the Springboot project onto intellij an start it from there, otherwise you can also build the artifact yourself. Make sure all environment Variables for the application are set

## **Grundkonzept**
Im unser Projekt Passwordmanager, haben wir ein Token based Authentication implementiert, wo der User sich anmeldet und dabei einen JWT token zurück bekommt, welches im Payload die User Informationen behaltet, wie User Id, username und Email. Der User kann dann die vier CRUD Operationen auf seine **eigene** Passwort liste durchführen. Das Passwort wird dann über http ans Backend gesendet und dieser entschlüsselt dies mit einer Symmetrischen Verschlüsselung.

### PROD deployment
Wenn man dieses Projekt weiterführen würde, müsste man definitiv zuerst mal einen KeyVault System einbauen, um die sensitiven Secrets richtig speichern zu können. Ich würde auch deshalb ein ganzes CI/CD System aufsetzen, wo die wichtigen Secrets speichert, wie zum Beispiel der Encryption Key. Zudem würde ich auch den JWT mit einem Server Private Key verschlüsseln, nicht mit einem Secret. Zudem würde ich noch Unit tests aufsetzen für die Services. Zudem noch ein Intergration test mit mockMvc, welches die Controller bis zu Repository als ganzes System prüft. Natürlich wären diese Test automatisiert innerhalb der CI/CD Pipelines mit Github actions. Wenn man dann an Pipelines, kommt auch dann die Cloud services im Gedanken. Z.B Könnte man ein KeyVault verwenden für die einzelnen Secrets. Zudem würde ich noch mehr Exceptions einbauen zu der bereits bestehende API, z.B AccessDeniedExceptionHandler. Natürlich müsste ich dies in der SecurityFilterChain einbauen. Um all die Secrets im Projekt überhaupt zu benutzen, müsste ich zunächst mal ein Environment variable yaml File konfigurieren und dies am Projekt anbinden. Im Frontend würde ich auch hier tests mit Jest einbauen und den Axios Client erweitern mit configurationen. Natürlich gehört auch eine ausfühlriche Dokumentation für die Users.
### Technologien

#### Backend:
- Java
- Maven
- Spring
- Spring Security

#### Frontend
- React
- Typescript

#### Datenspeicherung
- MySQL Datebank
- Dockercompose

###
Mit dem Passwort Safe ist sollte es möglich sein Passwörter sicher zu speichern. Es gibt ein Master Passwort mich welchem mach zugriff zu den weiteren gespeicherten Passwörter erhält.

---

## **Weitere Anforderungen**

###
- Das erste wo uns in den Sinn gekommen ist, ist der JWT token. In der Produktion ist es wichtig, dass der Token noch mit einem Private 
- Der JWT wird in den Cookies gespeichert

## **Nicht erledigte Tasks**
-asd
-asdasd


---

## **Arbeitsaufteilung**
Wir haben die Arbeit in drei grobe Bereiche unterteil. Das Frontend für welches Silvan gröstenteils verantwortlich war. Das Backend welches gröstenteils von Alex entwickelt wurde und die Datenbank sowie docker-compose welches Aaron übernommen hat. Wir haben uns nicht strickt and dies Aufteilung gehalten, das heisst jeder hat bei allem einwenig mitgewirkt.

---

## **Reflexion**

### Aaorn Holenstein
Einen Passwort Manager zu erstellen war eine tolle Aufgabe, die mir auch Spass gemacht hat. Leider haben wir uns zum Teil zu hohe Ziele gesetzt und konnten diese dann nicht erfüllen. Am Anfang waren wir gut in der Zeit und kamen schnell voran, doch leider hatten wir einige Ausfälle aufgrund von Krankheit, was die Entwicklung behinderte. Sehr ungünstig war, wenn man genau auf ein Feature warten musste, um selbst weiterentwickeln zu können (z.B. Model Klassen, um den Service zu bauen). Ausserdem habe ich einmal vergessen meine Changes zu pushen, und Alex hatte dann die genau gleichen Klassen wie ich implementiert, weil er dachte, sie existieren noch nicht. Diese doppelte Arbeit hätte mit besserer Kommunikation verhindert werden können, ebenso die Wartezeiten. Was wir aber gut gemacht haben ist eine saubere Vorgehensweise, denn wir haben gut geplant und auch bereits bei der Datenbankmodellierung an die Features gedacht, die wir haben wollen. Dadurch mussten wir nur eine kleine Anpassung an der Datenbank machen und konnten dort zumindest Zeit sparen. Auch haben wir den Code gut reviewed und sind auch oft zusammengesessen, und haben den Code besprochen.

### Silvan Dubach
Ich habe in diesem Projekt mithilfe von React und der MUI library das Frontend gebaut. Generell bin ich gut voran gekommen bis es einige grössere Probleme mit den API requests gab. Es gab Probleme mit dem CORS. Diese kamen von der Seite des Backends des Projektes und konnten von Alex schlussendlich gelöste werden, jedoch hat und dies relativ viel Zeit gekostet. Eine weiteres hinderniss war das Alex einmal und Aaron zweimal aussvielen, was uns im Zeitplan zurücksetzte.


### Alex Smolders
Ich konnte vieles mitnehmen aus diesem Projekt. Ich habe zum ersten mal gelernt wie man mit JWT ein Authenticationssystem baut. Gleichzeitig konnte ich auch mich mit Spring security auseinandersetzen. Was mir errors für mehrere Tage gab war CORS error. Das ist eigentlich ein einfaches Problem, welches sehr kompliziert wurde. Ich konnte sonst aber sehr gut arbeiten mit meinem Teamkollegen während der Schule. Leider fielen ein paar Schüler ein paar Tage aus und konnten nicht am Projekt abreiten, was uns relativ viel Stress kostete in den letzten Woche. Dennoch kann ich sagen, dass die Entwicklung dieser App mein Verständnis im Spring Security bereich gröber aufweitete, vor allem bei der Architektur. Ich habe nämlich mehr einen einblick bekommen, wie alles in der Spring Welt funktioniert. Im Frontend konnte ich auch gut helfen es mit der API zu verknüpfen, was mir auch sehr geholfen hat wieder Axios im Griff zu bekommen. 