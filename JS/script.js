const myInput = document.getElementById('commande');

const Button = document.getElementById('myBtn');
Button.addEventListener('click', commande);

const Inventory = document.getElementById('inventaire');

const crossButton = document.getElementById('crossButton');
crossButton.addEventListener('click', () => Inventory.style.display = 'none')

//Variables de déplacements
let x = 0;
localStorage.setItem('x', x);
let y = 0;
localStorage.setItem('y', y);

//Classe de Personnages
class Character{
    constructor(life, attack){
       this.life = life;
       this.attack = attack; 
    }
}




//Fonction cotenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande)

    switch (commande) {

        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            Inventory.style.display = 'block';
            break;

        case 'est':
            window.alert('Vous allez tourner à droite !');
            x++;
            if (x > 2) {
                window.alert("Vous ne pouvez pas aller plus loin.");
                x = 2;
            }
            localStorage.setItem('x', x);
            roomScripts();
            break;
        case 'ouest':
            window.alert('Vous allez tourner à gauche !')
            x--;
            if (x < -2) {
                window.alert("Vous ne pouvez pas aller plus loin.");
                x = -2;
            }
            localStorage.setItem('x', x);
            roomScripts();
            break;
        case 'nord':
            window.alert('Vous allez avancer !');
            y++;
            if (y > 2) {
                window.alert("Vous ne pouvez pas aller plus loin");
                y = 2;
            }
            localStorage.setItem('y', y);
            roomScripts();
            break;

        case 'sud':
            window.alert('Vous allez reculez !')
            y--;
            if (y < -2) {
                window.alert("Vous ne pouvez pas aller plus loin.");
                y = -2;
            }
            localStorage.setItem('y', y)
            roomScripts();
            break;
        default:
            window.alert('Veuillez rentrer une commande valide.');
            break;
    }

}