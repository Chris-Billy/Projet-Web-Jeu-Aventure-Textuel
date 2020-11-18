const myInput = document.getElementById('commande');
myInput.onkeydown = function (event) {
    if (event.which == 13) {
        commande();
        myInput.value = '';
    }
}

const Button = document.getElementById('myBtn');
Button.addEventListener('click', commande);

const Inventory = document.getElementById('inventaire');

const crossButton = document.getElementById('crossButton');
crossButton.addEventListener('click', () => Inventory.style.display = 'none')

const room = document.getElementsByClassName('room');
console.log(room);
let position = room[0];
console.log(position);
room[0].style.display = 'block';

const clef = document.getElementById("descriptionObjet");
clef.addEventListener('click', descriptionObjet)


//Classe de Personnages
class Character {
    constructor(life, attack) {
        this.life = life;
        this.attack = attack;
    }
}

//Fonction cotenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande);

    switch (commande) {
        case 'attaquer':
            PersoPpal.attaquer(Boss);
            console.log(Boss.life);
            break;
        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            Inventory.style.display = 'block';
            break;


        case 'nord':
            switch (position) {
                case room[0]:
                    position = room[11];
                    console.log(position);
                    break;
                case room[1]:
                    position = room[0];
                    console.log(position);
                    break;
                case room[3]:
                    position = room[1];
                    console.log(position);
                    break;
                case room[6]:
                    position = room[7];
                    console.log(position);
                    break;
                case room[8]:
                    position = room[6];
                    console.log(position);
                    break;
                case room[11]:
                    position = room[10];
                    console.log(position);
                    break;
                case room[13]:
                    position = room[12];
                    console.log(position);
                    break;

                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;
        case 'sud':
            switch (position) {
                case room[0]:
                    position = room[1];
                    console.log(position);
                    break;
                case room[1]:
                    position = room[3];
                    console.log(position);
                    break;
                case room[6]:
                    position = room[8];
                    console.log(position);
                    break;
                case room[7]:
                    position = room[6];
                    console.log(position);
                    break;
                case room[9]:
                    position = room[10];
                    console.log(position);
                    break;
                case room[10]:
                    position = room[0];
                    console.log(position);
                    break;
                case room[11]:
                    position = room[0];
                    console.log(position);
                    break;
                case room[12]:
                    position = room[13];
                    console.log(position);
                    break;

                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;
            
        case 'est':
            switch (position) {
                case room[0]:
                    position = room[13];
                    console.log(position);
                    break;
                case room[1]:
                    position = room[4];
                    console.log(position);
                    break;
                case room[2]:
                    position = room[1];
                    console.log(position);
                    break;
                case room[5]:
                    position = room[6];
                    console.log(position);
                    break;
                case room[6]:
                    position = room[0];
                    console.log(position);
                    break;
                case room[13]:
                    position = room[14];
                    console.log(position);
                    break;
                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;
        case 'ouest':
            switch (position) {
                case room[13]:
                    position = room[0];
                    console.log(position);
                    break;
                case room[4]:
                    position = room[1];
                    console.log(position);
                    break;
                case room[1]:
                    position = room[2];
                    console.log(position);
                    break;
                case room[6]:
                    position = room[5];
                    console.log(position);
                    break;
                case room[0]:
                    position = room[6];
                    console.log(position);
                    break;
                case room[14]:
                    position = room[13];
                    console.log(position);
                    break;
                default:
                    window.alert('Vous ne pouvez pas aller plus loin');
                    console.log(position);
                    break;
            }
            break;
        default:
            window.alert('Veuillez rentrer une commande valide.');
            break;
    }
}

function ChangeDescrption(event){
    console.log(event.target.id)
    if(event.target.id.includes("clef") === true){
        clef.innerHTML = 'Ouvre une porte <br><br> "Non jure wallah"'
    }
    else if (event.target.id.includes("epee") === true){
        clef.innerHTML = 'Epée basique en fer <br><br> Pemettra surement de ce defendre'
    }
    else if (event.target.id.includes("master-sword") === true){
        clef.innerHTML = 'Epée légendaire'
    }
    else{
        clef.innerHTML = 'Sélectionne un objet'
    }

}