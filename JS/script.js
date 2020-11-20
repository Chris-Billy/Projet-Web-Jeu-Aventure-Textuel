// Valide l'input si on appuie sur la touche "entrée"
let stockage;
const myInput = document.getElementById('commande');
myInput.onkeydown = function (event) {
    // Si touche "Entrée" est appuyé : valide l'input
    if (event.which == 13) {
        stockage = myInput.value;
        commande();
        myInput.value = '';
    }
    // Si touche "flêche du haut" est appuyé : rappelle l'ancienne valeur dans l'input
    if (event.which == 38) {
        myInput.value = stockage;
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
const objects = document.getElementsByClassName('objets');

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
let PersoPpal = new Character(55, 10);
let Boss = new Character(50, 5);
let Gobelin = new Character(25, 2);
let Garde = new Character(35, 4);

// On récupère la vie du joueur
document.getElementById('player').max = PersoPpal.life;
document.getElementById('player').value = PersoPpal.life;

//Variables relatives à la dague
let daguePossessed = new Boolean(false);
let swordPossessed = new Boolean(false);
let masterSwordPossessed = new Boolean(false);
let swordIsUnlocked = new Boolean(false);

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
let trapActivated2 = new Boolean(false);
let trapSeen2 = new Boolean(false);

//Fonction contenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande);
    //Effacer les précédentes commandes
    for (let i = 0; i < key.length; i++) {
        if (key[i].style.display !== 'none') {
            key[i].style.display = 'none';
        }
    }

    switch (commande) {
        case 'piege': case 'piège':
            switch (position) {
                case room[13]:
                    if (trapActivated == true) {
                        document.getElementById("piegeNeutralized").style.display = "block";
                        console.log(PersoPpal);
                    } else if (trapSeen == true) {
                        document.getElementById("piegeNeutralizing").style.display = "block";
                        let trapTry = getRandomInt(3);
                        console.log(trapTry);
                        console.log(PersoPpal);
                        if (trapTry == 3 || trapTry == 0) {
                            trapActivated = true;
                            document.getElementById("piegeSucces").style.display = "block";
                            console.log(PersoPpal);
                        } else {
                            document.getElementById("piegeFailure").style.display = "block";
                            PersoPpal.life = PersoPpal.life - 15;
                            trapActivated = true;
                            console.log(PersoPpal);
                        }
                    } else {
                        document.getElementById("piegeNone").style.display = "block";
                        console.log(PersoPpal);
                    }
                    break;
                case room[1]:
                    if (trapActivated2 == true) {
                        document.getElementById("piegeNeutralized").style.display = "block";
                        console.log(PersoPpal);
                    } else if (trapSeen2 == true) {
                        document.getElementById("piegeNeutralizing").style.display = "block";
                        let trapTry = getRandomInt(3);
                        console.log(trapTry);
                        console.log(PersoPpal);
                        if (trapTry == 3 || trapTry == 0) {
                            trapActivated2 = true;
                            document.getElementById("piegeSucces").style.display = "block";
                            console.log(PersoPpal);
                        } else {
                            document.getElementById("piegeFailure").style.display = "block";
                            PersoPpal.life = PersoPpal.life - 15;
                            trapActivated2 = true;
                            console.log(PersoPpal);
                        }
                    } else {
                        document.getElementById("checkTrapFailed").style.display = "block";
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
                        document.getElementById("daggerPossesed").style.display = "block";
                    } else {
                        daguePossessed = true;
                        document.getElementById("daggerGet").style.display = "block";
                        PersoPpal.attack = 7;

                    }
                    break;

                default:
                    if (daguePossessed === true) {
                        document.getElementById("daggerTrue").style.display = "block";
                    } else {
                        document.getElementById("daggerFalse").style.display = "block";
                    }
                    break;
            }
            break;

        case 'epee': case 'épée':
            switch (position) {
                case room[2]:
                    if (deadGarde == true) {
                        if (swordPossessed === true) {
                            document.getElementById("swordAllready").style.display = "block";
                        } else {
                            swordPossessed = true;
                            document.getElementById("swordGrab").style.display = "block";
                            console.log("votre attack avant : " + PersoPpal.attack);
                            PersoPpal.attack += 4;
                            console.log("votre attack après : " + PersoPpal.attack);
                        }
                    } else {
                        document.getElementById("swordFight").style.display = "block";
                    }
                    break;
                case room[8]:
                    document.getElementById("swordCheh").style.display = "block";
                    break;

                default:
                    document.getElementById("swordNone").style.display = "block";
                    break;
            }
            break;

        //Permet d'indiquer ce que l'on peut ramasser
        case 'fouiller':
        case 'chercher':
        case 'looter':
        case 'chiner':
        case 'farfouiller':
            switch (position) {
                case room[1]:
                    document.getElementById("checkTrapSucces").style.display = "block";
                    trapSeen2 = true;
                    break;
                case room[2]:
                    if (swordIsUnlocked == true) {
                        document.getElementById("findSword").style.display = "block";
                    } else {
                        document.getElementById("findSwordFight").style.display = "block";
                    }
                    break;
                case room[4]:
                    document.getElementById("searchCagibi").style.display = "block";
                    break;
                case room[8]:
                    document.getElementById("searchSecret").style.display = "block";

                    break;
                case room[12]:
                    document.getElementById("searchSecondCagibiWin").style.display = "block";
                    break;
                case room[13]:
                    document.getElementById("searchTrap").style.display = "block";
                    trapSeen = true;
                    break;

                default:
                    let random = getRandomInt(2);
                    switch (random) {
                        case 0:
                            document.getElementById("searchSecondCagibiWin").style.display = "block";
                            break;

                        case 1:
                            document.getElementById("searchSecondCagibiLoose").style.display = "block";
                            break

                        default:
                            document.getElementById("searchRandom").style.display = "block";
                            window.alert("Rien");
                            console.log(random);
                            break;
                    }
                    break;
            }
            break;

        //Permet d'attaquer la cible actuelle
        case 'attaquer':
        case 'combattre':
        case 'casser la gueule':
        case 'goumer':
        case 'défoncer':
        case 'affronter':
        case 'aggresser':
        case 'attaque':
        case 'frapper':
        case 'assaillir':
        case 'prendre à partie':

            switch (position) {
                case room[2]:
                    if (deadGarde == false) {
                        console.log(PersoPpal);
                        console.log(Garde);
                        fight(PersoPpal, Garde);
                        if (Garde.life <= 0) {
                            deadGarde = true;
                            swordIsUnlocked = true;
                            document.getElementById("gardeDead").style.display = "block";
                        }
                        if (PersoPpal.life <= 0) {
                            gameOverScreen.style.display = 'block';
                        }
                    } else {
                        document.getElementById("swordDrop").style.display = "block";
                        break;
                    }

                    break;
                case room[7]:
                    if (deadGobelin == false) {
                        fight(PersoPpal, Gobelin);
                        if (Gobelin.life <= 0) {
                            deadGobelin = true;
                            document.getElementById("gobelinDead").style.display = "block";
                        }
                        if (PersoPpal.life <= 0) {
                            gameOverScreen.style.display = 'block'
                        }
                    } else {
                        document.getElementById("gobelinDeadAllready").style.display = "block";
                        break;
                    }

                    break;
                case room[9]:
                    if (deadBoss == false) {
                        fight(PersoPpal, Boss);
                        if (Boss.life <= 0) {
                            deadBoss = true;
                            document.getElementById("bossDead").style.display = "block";
                            window.location.href = "end.html";
                        }
                        if (PersoPpal.life <= 0) {
                            gameOverScreen.style.display = 'block'
                        }
                    } else {
                        document.getElementById("bossDeadAllready").style.display = "block";
                        break;
                    }

                    break;

                default:
                    document.getElementById("fightNoOne").style.display = "block";
                    break;
            }
            break;

        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            DisplayObjects();
            Inventory.style.display = 'block';
            break;

        //Permet de lire l'indice de l'énigme
        case 'lire':
        case 'livre':
            switch (position) {
                case room[14]:
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
        case 'discuter':
        case 'dire':
        case 'bavarder':
        case 'causer':
        case 'converser':
        case 'deviser':
        case 'dialoguer':
        case 'jaser':
        case 'palabrer':
        case 'pérorer':
        case 'tailler le bout de gras':
            switch (position) {
                case room[3]:
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
                case room[2]:
                    position = room[2];
                    if (deadGarde === true) {
                        document.getElementById("dialGardeDead").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("dialGarde").style.display = "block";
                        break;
                    }
                case room[7]:
                    position = room[7];
                    if (deadGobelin === true) {
                        document.getElementById("dialGobelinDead").style.display = "block";
                        break;
                    }
                    else {
                        document.getElementById("dialGobelin").style.display = "block";
                        break;
                    }
                case room[9]:
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
        case 'ouvrir':
        case 'délivrer':
        case 'libérer':
        case 'déverrouiller':
        case 'clef':
        case 'clé':
        case 'cle':
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
        case 'au nord':
        case 'aller au nord':
        case 'aller nord':
        case 'se diriger au nord':
        case 'se diriger vers le nord':
        case 'au nord aller':
        case 'nord aller':
        case 'nord aller au':
        case 'au aller nord':
        case 'nord au aller':
            switch (position) {
                case room[0]:
                    if (porteNordUnlocked === true) {
                        position = room[11];
                        console.log(position);
                        RoomText();
                        break;
                    }
                    else {
                        position = room[0];
                        document.getElementById("gateLocked").style.display = "block";
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
                    document.getElementById("roomWrong").style.display = "block";
                    console.log(position);
                    RoomText();
                    break;
            }
            break;

        // Gestion des déplacements vers le sud
        case 'sud':
        case 'au sud':
        case 'aller au sud':
        case 'aller sud':
        case 'se diriger au sud':
        case 'se diriger vers le sud':
        case 'au sud aller':
        case 'sud aller':
        case 'sud aller au':
        case 'au aller sud':
        case 'sud au aller':
        case 'je viens du sud et par tous les chemins j\'y reviendrai':
            switch (position) {
                case room[0]:
                    position = room[1];
                    console.log(position);
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
                    LifeBarEnemyDisplay();
                    break;
                case room[9]:
                    position = room[10];
                    console.log(position);
                    RoomText();
                    break;
                case room[10]:
                    position = room[11];
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
                    document.getElementById("roomWrong").style.display = "block";
                    console.log(position);
                    break;
            }
            break;

        // Gestion des déplacements vers l'est
        case 'est':
        case 'à l\'est':
        case 'aller à l’est':
        case 'aller est':
        case 'se diriger à l\'est':
        case 'se diriger vers l\'est':
        case 'à l\'est aller':
        case 'est aller':
        case 'est aller à':
        case 'à aller l\'est':
        case 'est à l\' aller':
            switch (position) {
                case room[0]:
                    position = room[13];
                    console.log(position);
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
                    LifeBarEnemyDisplay();
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
                        document.getElementById("trapActivated").style.display = "block";
                        PersoPpal.life = PersoPpal.life - 15;
                        console.log(PersoPpal)
                        trapActivated = true;
                    }
                    position = room[14];
                    console.log(position);
                    RoomText();
                    break;
                default:
                    document.getElementById("roomWrong").style.display = "block";
                    console.log(position);
                    break;
            }
            break;

        // Gestion des déplacements vers l'ouest
        case 'ouest':
        case 'à l\'ouest':
        case 'aller à l’ouest':
        case 'aller ouest':
        case 'se diriger à l\'ouest':
        case 'se diriger vers l\'ouest':
        case 'à l\'ouest aller':
        case 'ouest aller':
        case 'ouest aller à':
        case 'à aller l\'ouest':
        case 'ouest à l\' aller':
            switch (position) {
                case room[13]:
                    position = room[0];
                    console.log(position);
                    RoomText();
                    break;
                case room[4]:
                    position = room[1];
                    console.log(position);
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
                    RoomText();
                    break;
                case room[14]:
                    position = room[13];
                    console.log(position);
                    RoomText();
                    break;
                default:
                    document.getElementById("roomWrong").style.display = "block";
                    console.log(position);
                    break;
            }
            break;

        // Permet de quitter la partie
        case 'quitter':
            window.location.href = 'main.html';
            break;

        default:
            document.getElementById("invalidCommand").style.display = "block";
            break;
    }
}

//Permet d'avoir un int aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Desscription des objets de l'inventaire
function ChangeDescrption(event) {
    console.log(event.target.id);
    if (event.target.id.includes("clef") === true) {
        clef.innerHTML = 'Ouvre une porte <br><br> "Non jure wallah"';
    }
    else if (event.target.id.includes("epee") === true) {
        clef.innerHTML = 'Epée basique en fer <br><br> Vous gagnez pas mal d\'attaque avec cette arme';
    }
    else if (event.target.id.includes("master-sword") === true) {
        clef.innerHTML = 'Epée légendaire <br><br> Vous gagnez beaucoup d\'attaque avec cette arme';
    }
    else if (event.target.id.includes("dague") === true) {
        clef.innerHTML = 'Simple dague <br><br> Vous gagnez quelques points d\'attaque avec cette arme';
    }
    else {
        clef.innerHTML = 'Sélectionne un objet';
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

//fonction combats
function fight(object1, object2) {
    // On récupère le niveau des barres de vie
    if (object2 == Gobelin && Gobelin.life === 25) {
        document.getElementById('enemy').max = object2.life;
        document.getElementById('enemy').value = object2.life;
    }
    if (object2 == Garde && Garde.life === 35) {
        document.getElementById('enemy').max = object2.life;
        document.getElementById('enemy').value = object2.life;
    }
    if (object2 == Boss && Boss.life === 50) {
        document.getElementById('enemy').max = object2.life;
        document.getElementById('enemy').value = object2.life;
    }
    // On affiche récupère l'état des barres de vie et affiche celle de l'ennemi
    document.getElementById('player').value = object1.life;
    document.getElementById('enemy').value = object2.life;
    document.getElementById('enemy-life').style.display = 'block';

    document.getElementById("fightInitialized").style.display = "block";
    object1.attaquer(object1, object2);
    document.getElementById('stats-combat').style.display = "block";
    document.getElementById('enemy').value = object2.life;
    document.getElementById('vie').innerHTML = 'Vous attaquez l\'ennemie, il lui reste ' + object2.life + 'PV';

    if (object2.life > 0) {
        object2.attaquer(object2, object1);
        document.getElementById('player').value = object1.life;
        document.getElementById('vie').innerHTML += '<br><br> L\'ennemie vous attaque, il vous reste ' + object1.life + 'PV';
    }
    console.log("nouveaux PV main : " + object1.life);
    console.log("nouveaux PV ennemy : " + object2.life);
}

// Afficher les objets dans l'inventaire
function DisplayObjects() {
    if (clef2 === true) {
        objects[0].style.display = 'block';
    }
    if (swordPossessed === true) {
        objects[1].style.display = 'block';
    }
    if (masterSwordPossessed === true) {
        objects[2].style.display = 'block';
    }
    if (daguePossessed === true) {
        objects[3].style.display = 'block';
    }
}

function LifeBarEnemyDisplay () {
    if (document.getElementById('enemy-life').style.display === 'block') {
        document.getElementById('enemy-life').style.display = 'none';
    }
}