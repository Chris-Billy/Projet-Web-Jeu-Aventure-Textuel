const myInput = document.getElementById('commande');

const Button = document.getElementById('myBtn');
Button.addEventListener('click', commande);

const Inventory = document.getElementById('inventaire');

const crossButton = document.getElementById('crossButton');
crossButton.addEventListener('click', () => Inventory.style.display = 'none')

const room = document.getElementsByClassName('room');
console.log(room);
let position = room[0];
console.log(position);


//Classe de Personnages
class Character {
    constructor(life, attack) {
        this.life = life;
        this.attack = attack;
    }
}
//----------------------------------------
function commande() {
    let commande = myInput.value;
    console.log(commande)

    switch (commande) {

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