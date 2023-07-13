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
Das erste wo uns in den Sinn gekommen ist, ist der JWT token. In der Produktion ist es wichtig, dass der Token noch mit einem Private

## **Nicht erledigte Tasks**
-asd
-asdasd


---

## **Reflexion**

### Silvan Dubach

###


### Alex Smolders
Ich konnte vieles mitnehmen aus diesem Projekt. Ich habe zum erstenmal gelernt wie man mit JWT ein Authenticationssystem baut. Gleichzeitig konnte ich auch mich mit Spring security ausseinandersetzen. Was mir errors für mehrere Tage gab war CORS error. Das ist eigentlich ein einfaches Problem, welches