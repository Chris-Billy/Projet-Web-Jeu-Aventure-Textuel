function roomScripts() {
    let x = localStorage.getItem('x');
    let y = localStorage.getItem('y');

    if (x == 1 && y == 1) {
        window.alert("CA MARCHE, tu es en " + x + ", " + y);
    }
}