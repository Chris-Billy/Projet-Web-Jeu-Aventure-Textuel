// Valide l'input si on appuie sur la touche "entrée"
const myInput = document.getElementById('commande');
myInput.onkeydown = function (event) {
    if (event.which == 13) {
        commande();
        myInput.value = '';
    }
}

const Inventory = document.getElementById('inventaire-page');
const gameOverScreen = document.getElementById('gameOver');

const crossButton = document.getElementById('crossButton');
crossButton.addEventListener('click', () => Inventory.style.display = 'none');

const room = document.getElementsByClassName('room');
console.log(room);
let position = room[0];
console.log(position);
RoomText();


const key = document.getElementsByClassName('key');


const clef = document.getElementById("descriptionObjet");
clef.addEventListener('click', descriptionObjet);

//Classe de Personnages
class Character {
    constructor(life, attack) {
        this.life = life;
        this.attack = attack;
    }
    attaquer(object1, object2) {
        object2.life = object2.life - this.randomAttaque(this.attack);
        //this.gameOverMethod(object2.life)
    }
    /*
    gameOverMethod(object2) {
        if (object2 <= 0) {
            window.alert('lennemie est mort');
        }
    } */

     randomAttaque(atq) {
         let min = atq - 2;
         let max = atq + 1;
         if (min <= 0) {
             min = 1;
         }
        return Math.floor(Math.random(min) * Math.floor(max));
      }
}
let PersoPpal = new Character(55, 5);
let Boss = new Character(50, 5);
let Gobelin = new Character(25, 2);
let Garde = new Character(35, 55);

//Variables relatives à la dague
let daguePossessed = new Boolean(false);

//Variables relatives à la clef
let clef2 = new Boolean(false);
let porteNordUnlocked = new Boolean(false);
let porteDeCelluleUnlocked = new Boolean(false);

//Variables relatives à l'énigme
let enigme = new Boolean(false);
let indice = new Boolean(false);

//Variables relatives aux combats
let deadGobelin = new Boolean(false);
let deadGarde = new Boolean(false);
let deadBoss = new Boolean(false);
let deadPersoPpal = new Boolean(false);

//Variables relatives à la salle piégée 2
let trapActivated = new Boolean(false);
let trapSeen = new Boolean(false);

//Fonction cotenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande);
//Effacer les précédentes commandes
    let x = document.getElementsByClassName("key");
        let i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'none';
        }

    switch (commande) {
        case 'piege': case 'piège':
            switch (position) {
                case room[13]:
                    if (trapActivated == true) {
                        window.alert("Le piège est déja désactivé")
                        console.log(PersoPpal);
                    }else if (trapSeen == true) {
                        window.alert('Vous désarmez le piège')
                        let trapTry = getRandomInt(3);
                        console.log(trapTry);
                        console.log(PersoPpal);
                        if (trapTry == 3 || trapTry == 0) {
                            trapActivated = true;
                            window.alert("Le piège est désarmé")
                            console.log(PersoPpal);
                        }else{
                            window.alert("Vous n'avez pas réussi à désarmer le piège")
                            PersoPpal.life=PersoPpal.life-15;
                            trapActivated=true;
                            console.log(PersoPpal);
                        }   
                    }else{
                        window.alert("Vous n'avez pas vu de piège")
                        console.log(PersoPpal);
                    }
                    break;
            
                default:
                    break;
            }
            break;

        //Gestion de la dague
        case 'dague':
            switch (position) {
                case room[12]:
                    if (daguePossessed === true) {
                        window.alert("Vous avez déja rammassé la dague")
                    } else {
                        daguePossessed = true;
                        window.alert('Vous avez ramassé la dague')
                        PersoPpal.attack=7;

                    }
                    break;
            
                default:
                    if (daguePossessed === true) {
                        window.alert("La dague est dans votre main, elle ne vous servira à rien ici")
                    } else {
                        window.alert("Vous n'avez pas la dague.")
                    }
                    break;
            }
            break;

        //Permet d'indiquer ce que l'on peut ramasser
        case 'fouiller':
            switch (position) {
                case room[4]:
                    window.alert('Lors de la fouille du débaras, vous remarquez une clef');
                    break;
                case room[8]:
                    window.alert('Vous decidez de fouiller la salle secrète, il s\'y trouve une épée assez particulière.\n Bon c\'est l\'épée légendaire fait pas genre t\'as pas compris');

                    break;
                case room[12]:
                    window.alert('Lors de la fouille du débarras, vous notez qu\'il n\'y a rien d\'intéressant, hormis une petite dague.');
                    break;
                case room[13]:
                    window.alert("Vous remarquez un piège près du côté est")
                    trapSeen = true;
                    break;

                default:
                    let random = getRandomInt(2);
                    switch (random) {
                        case 0:
                            window.alert("Vous ne trouvez rien d'intéréssant");
                            break;

                        case 1 :
                            window.alert("Malgré la fouille, il n'y a rien qui sucite votre intérêt");
                            break

                        default:
                            window.alert("Cette fouille vous à menez à quelque chose");
                            window.alert("Rien");
                            console.log(random);
                            break;
                    }
                    break;
            }
            break;
        //Permet d'attaquer la cible actuelle
        case 'attaquer':
            switch (position) {
                case room[2]:

                    console.log(PersoPpal);
                    console.log(Garde);
                    fight(PersoPpal, Garde);
                    if (Garde.life <= 0) {
                        deadGarde = true;
                    }
                    if (PersoPpal.life <= 0){
                        gameOverScreen.style.display = 'block'
                    }
                    if (deadGarde == true) {
                        window.alert('Le garde est déja mort');
                        break;
                    }

                    break;
                case room[7]:
                    if (Gobelin.life<=0) {
                        deadGobelin = true;
                    }
                    if (PersoPpal.life <= 0){
                        gameOverScreen.style.display = 'block'
                    }
                    if (deadGobelin == true) {
                        window.alert('Le gobelin est déja mort');
                        break;
                    }
                    fight(PersoPpal, Gobelin);
                    
                    break;
                case room[9]:
                    if (Boss.life<=0) {
                        deadBoss = true;
                    }
                    if (PersoPpal.life <= 0){
                        gameOverScreen.style.display = 'block'
                    }
                    if (deadBoss == true) {
                        window.alert('Le Boss est déja mort');
                        break;
                    }
                    fight(PersoPpal, Boss);
                    break;

                default:
                    window.alert('Tu veux ataquer qui ? Le mur ?');
                    break;
            }
            break;

        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            Inventory.style.display = 'block';
            break;

        //Permet de lire l'indice de l'énigme
        case 'lire':
            switch (position) {
                case room [14]:
                    position = room[14];
                    document.getElementById("indiceEnigme").style.display = "block";
                    indice = true;
                    break;
                default:
                    position = position;
                    document.getElementById("readNone").style.display = "block";
                    break;
            }
            break;

        //Permet de parler aux PNJs
        case 'parler':
            switch(position) {
                case room [3]:
                    position = room[3];
                    if (porteDeCelluleUnlocked === true) {
                        if (indice === true) {
                            document.getElementById("dialPrisonnier1").style.display = "block";
                            break;
                        }
                        else {
                            document.getElementById("dialPrisonnier2").style.display = "block";
                            break;
                        }
                    }
                    else {
                        document.getElementById("dialPrisonnier3").style.display = "block";
                        break;
                    }
                case room [2]:
                    position = room[2];
                    if (deadGarde === true) {
                        document.getElementById("dialGardeDead").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("dialGarde").style.display = "block";
                        break;
                    }
                case room [7]:
                    position = room[7];
                    if (deadGobelin === true) {
                        document.getElementById("dialGobelinDead").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("dialGobelin").style.display = "block";
                        break;
                    }
                case room [9]:
                    position = room[9];
                    if (deadBoss === true) {
                        document.getElementById("dialBossDead").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("dialBoss").style.display = "block";
                        break;
                    }
                default:
                    position = position;
                    document.getElementById("dialNone").style.display = "block";
                    break;
            }
            break;

        //Permet de gérer l'entrée de l'énigme
        case '1793':
            switch (position) {
                case room[10]:
                    enigme = true;
                    document.getElementById("enigmeGood").style.display = "block";
                    break;
                default:
                    document.getElementById("enigmeBad").style.display = "block";
                    break;
            }
            break;

        // Gestion de la clef
        case 'clef':
            switch (position) {
                case room[0]:
                    if (clef2 === true) {
                        porteNordUnlocked = true;
                        document.getElementById("room0Unlock").style.display = "block";
                        console.log(clef2);
                        break;
                    }
                    else {
                        document.getElementById("room0UnlockNoKey").style.display = "block";
                        break;
                    }
                case room[3]:
                    if (clef2 === true) {
                        porteDeCelluleUnlocked = true;
                        document.getElementById("cellUnlock").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("cellUnlockNoKey").style.display = "block";
                        break;
                    }
                case room[4]:
                    if (clef2 === true) {
                        document.getElementById("storageKeyNo").style.display = "block";
                        break;
                    }
                    else {
                        clef2 = true;
                        document.getElementById("storageKey").style.display = "block";
                        break;
                    }
                default:
                    if (clef2 === true) {
                        document.getElementById("keyUseless").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("generalNoKey").style.display = "block";
                        break;
                    }
            }
            break;

        // Gestion des déplacements vers le nord
        case 'nord':
            switch (position) {
                case room[0]:
                    if (porteNordUnlocked === true) {
                        position = room[11];
                        console.log(position);
                        TextKeyNone();
                        RoomText();
                        break;
                    }
                    else {
                        position = room[0];
                        window.alert("La porte est verrouillée");
                        RoomText();
                        break;
                    }
                case room[1]:
                    position = room[0];
                    console.log(position);
                    RoomText();
                    break;
                case room[3]:
                    position = room[1];
                    console.log(position);
                    TextKeyNone();
                    RoomText();
                    break;
                case room[6]:
                    position = room[7];
                    console.log(position);
                    RoomText();
                    break;
                case room[8]:
                    position = room[6];
                    console.log(position);
                    RoomText();
                    break;
                case room[11]:
                    position = room[10];
                    console.log(position);
                    RoomText();
                    break;
                case room[13]:
                    position = room[12];
                    console.log(position);
                    RoomText();
                    break;

                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    RoomText();
                    break;
            }
            break;

        // Gestion des déplacements vers le sud
        case 'sud':
            switch (position) {
                case room[0]:
                    position = room[1];
                    console.log(position);
                    TextKeyNone();
                    RoomText();
                    break;
                case room[1]:
                    position = room[3];
                    console.log(position);
                    RoomText();
                    break;
                case room[6]:
                    position = room[8];
                    console.log(position);
                    RoomText();
                    break;
                case room[7]:
                    position = room[6];
                    console.log(position);
                    RoomText();
                    break;
                case room[9]:
                    position = room[10];
                    console.log(position);
                    RoomText();
                    break;
                case room[10]:
                    position = room[0];
                    console.log(position);
                    RoomText();
                    break;
                case room[11]:
                    position = room[0];
                    console.log(position);
                    RoomText();
                    break;
                case room[12]:
                    position = room[13];
                    console.log(position);
                    RoomText();
                    break;

                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;

        // Gestion des déplacements vers l'est
        case 'est':
            switch (position) {
                case room[0]:
                    position = room[13];
                    console.log(position);
                    TextKeyNone();
                    RoomText();
                    break;
                case room[1]:
                    position = room[4];
                    console.log(position);
                    RoomText();
                    break;
                case room[2]:
                    position = room[1];
                    console.log(position);
                    RoomText();
                    break;
                case room[5]:
                    position = room[6];
                    console.log(position);
                    RoomText();
                    break;
                case room[6]:
                    position = room[0];
                    console.log(position);
                    RoomText();
                    break;
                case room[10]:
                    console.log(enigme);
                    if (enigme == false) {
                        position = room[10];
                        document.getElementById("bossWrong").style.display = "block";
                        break;
                    }
                    else {
                        position = room[9];
                        console.log(position);
                        RoomText();
                        break;
                    }
                case room[13]:
                    if (trapActivated == false) {
                        window.alert('Tu as activé un piège');
                        PersoPpal.life=PersoPpal.life-15;
                        console.log(PersoPpal)
                        trapActivated = true;
                    }
                    position = room[14];
                    console.log(position);
                    RoomText();
                    break;
                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;

        // Gestion des déplacements vers l'ouest
        case 'ouest':
            switch (position) {
                case room[13]:
                    position = room[0];
                    console.log(position);
                    RoomText();
                    break;
                case room[4]:
                    position = room[1];
                    console.log(position);
                    TextKeyNone();
                    RoomText();
                    break;
                case room[1]:
                    position = room[2];
                    console.log(position);
                    RoomText();
                    break;
                case room[6]:
                    position = room[5];
                    console.log(position);
                    RoomText();
                    break;
                case room[0]:
                    position = room[6];
                    console.log(position);
                    TextKeyNone();
                    RoomText();
                    break;
                case room[9]:
                    position = room[10];
                    console.log(position);
                    RoomText();
                    break;
                case room[14]:
                    position = room[13];
                    console.log(position);
                    RoomText();
                    break;
                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;
        
        // Permet de quitter la partie
        case'quitter':
            window.location.href ='main.html';
            break;

        default:
            window.alert('Veuillez rentrer une commande valide.');
            break;
    }
}
//Permet d'avoir un int aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

//Desscription des objets de l'inventaire
function ChangeDescrption(event) {
    console.log(event.target.id)
    if (event.target.id.includes("clef") === true) {
        clef.innerHTML = 'Ouvre une porte <br><br> "Non jure wallah"'
    }
    else if (event.target.id.includes("epee") === true) {
        clef.innerHTML = 'Epée basique en fer <br><br> Pemettra surement de ce defendre'
    }
    else if (event.target.id.includes("master-sword") === true) {
        clef.innerHTML = 'Epée légendaire'
    }
    else {
        clef.innerHTML = 'Sélectionne un objet'
    }

}

//GameOver t'as capté
function verifLife(object) {
    if (object.life <= 0) {
        gameOverScreen.style.display = 'block'
    }
}

// Afficher le texte de la salle correspondante
function RoomText() {
    for (let i = 0; i < room.length; i++) {
        if (position === room[i]) {
            room[i].style.display = 'block';
        }
        else {
            if (room[i].style.display !== 'none') {
                room[i].style.display = 'none';
            }
        }
    }
}

// Vérifie si les textes liés à la clef sont bien sur none
function TextKeyNone() {
    for (let i = 0; i < key.length; i++) {
        if (key[i].style.display !== 'none')
        key[i].style.display = 'none';
    }
}

//fonction combats
function fight(object1, object2) {

    window.alert('Combat engagé')
    object1.attaquer(object1, object2);
    if (object2.life>0) {
        object2.attaquer(object2, object1);
    
    }
    console.log(object1);
    console.log(object2);
}
