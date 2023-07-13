# Passwort Safe

The backend handles Authentication and Authorization of each individual user. It also takes care of each CRUD operation used for the records.

## **Start up**
To start this application, first navigate to the docker folder and execute ```docker compose up```. This will start the database server including **phpMyAdmin**. Afterwards, import the Springboot project onto intellij an start it from there, otherwise you can also build the artifact yourself. Make sure all environment Variables for the application are set

## **Grundkonzept**
Im unser Projekt Passwordmanager, haben wir ein Token based Authentication implementiert, wo der User sich anmeldet und dabei einen JWT token zurück bekommt, welches im Payload die User Informationen behaltet, wie User Id, username und Email. Der User kann dann die vier CRUD Operationen auf seine **eigene** Passwort liste durchführen. Das Passwort wird dann über http ans Backend gesendet und dieser entschlüsselt dies mit einer Symmetrischen Verschlüsselung.

### Do different
Wenn man dieses Projekt weiterführen würde, müsste man definitiv zuerst mal einen KeyVault System einbauen, um die sensitiven Secrets richtig speichern zu können. Ich würde auch deshalb ein ganzes CI/CD System aufsetzen, wo die wichtigen Secrets speichert, wie zum Beispiel der Encryption Key. Zudem würde ich auch den JWT mit einem Server Private Key verschlüsseln, nicht mit einem Secret. Zudem würde ich noch Unit tests aufsetzen für die Services. Zudem noch ein Intergration test mit mockMvc, welches die Controller bis zu Repository als ganzes System prüft. Natürlich wären diese Test automatisiert innerhalb der CI/CD Pipelines mit Github actions. Wenn man dann an Pipelines, kommt auch dann die Cloud services im Gedanken. Z.B Könnte man ein KeyVault verwenden für die einzelnen Secrets
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
-

---

## **Arbeitsaufteilung**
Wir haben die Arbeit in drei grobe Bereiche unterteil. Das Frontend für welches Silvan gröstenteils verantwortlich war. Das Backend welches gröstenteils von Alex entwickelt wurde und die Datenbank sowie docker-compose welches Aaron übernommen hat. Wir haben uns nicht strickt and dies Aufteilung gehalten, das heisst jeder hat bei allem einwenig mitgewirkt.

---

## **Reflexion**

### Silvan Dubach 
Ich habe in diesem Projekt mithilfe von React und der MUI library das Frontend gebaut. Generell bin ich gut voran gekommen bis es einige grössere Probleme mit den API requests gab. Es gab Probleme mit dem CORS. Diese kamen von der Seite des Backends des Projektes und konnten von Alex schlussendlich gelöste werden, jedoch hat und dies relativ viel Zeit gekostet. Eine weiteres hinderniss war das Alex einmal und Aaron zweimal aussvielen, was uns im Zeitplan zurücksetzte.


### Alex Smolders
