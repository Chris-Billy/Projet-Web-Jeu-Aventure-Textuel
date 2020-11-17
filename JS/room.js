//Fonction cotenant le switch de toutes les commandes disponibles avec l'input
function commande() {
    let commande = myInput.value;
    console.log(commande)

    switch (commande) {

        //Permet d'ouvrir l'inventaire
        case 'inventaire':
            Inventory.style.display = 'block';
            break;
        default:
            window.alert('Veuillez rentrer une commande valide.');
            break;
    }
}

function roomScripts() {


    switch (position) {


        case room[0]:
            window.alert('vous etes au debut')
            Button.addEventListener('click', commande)
            function commande() {
                let commande = myInput.value;
                console.log(commande)

                switch (commande) {

                    //Permet d'ouvrir l'inventaire
                    case 'inventaire':
                        Inventory.style.display = 'block';
                        break;
                    default:
                        window.alert('Veuillez rentrer une commande valide.');
                        break;
                }
            }
            break;
        case room[1]:
            window.alert('Vous êtes dans la salle couloir piégé 1')
            break;

        default:
            break;
    }
}