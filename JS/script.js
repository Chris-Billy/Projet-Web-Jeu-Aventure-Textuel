const myInput = document.getElementById('commande');

const Button = document.getElementById('myBtn');
Button.addEventListener('click', commande);

const Inventory = document.getElementById('inventaire');

const crossButton = document.getElementById('crossButton');
crossButton.addEventListener('click', () => Inventory.style.display = 'none')

//Variables de déplacements
let x = 0;
let y = 0;

//Fonction cotenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande)

    switch (commande) {

        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            Inventory.style.display = 'block';
            break;

        case 'droite':
            window.alert('Vous allez tourner à droite !')
            x++;
            localStorage.setItem('x', x);
            break;
        case 'gauche':
            window.alert('Vous allez tourner à gauche !')
            x--;
            localStorage.setItem('x', x);
            break;
        default:
            window.alert('Veuillez rentrer une commande valide.')
            break;
    }

}