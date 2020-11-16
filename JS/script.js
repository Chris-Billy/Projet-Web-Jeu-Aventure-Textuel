const myInput = document.getElementById('commande');

const Button = document.getElementById('myBtn');
Button.addEventListener('click', commande);

const Inventory = document.getElementById('inventaire');

const crossButton = document.getElementById('crossButton');
crossButton.addEventListener('click', () => Inventory.style.display ='none')

//Fonction cotenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande)

    switch (commande) {

        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            Inventory.style.display ='block';
            break;

            
        default:
            break;
    }

}