// Récupère le formulaire de recherche grâce à son identifiant.
const formulaire = document.getElementById("form-recherche");

// Récupère le champ dans lequel l’utilisateur saisit son budget.
const champBudget = document.getElementById("budget");

// Récupère la liste déroulante des zones.
const champZone = document.getElementById("zone");

// Récupère tous les éléments qui possèdent la classe "logement".
const logements = document.querySelectorAll(".logement");

// Récupère le titre qui indique le nombre de résultats.
const titreResultats = document.getElementById("titre-resultats");

// Récupère le message à afficher lorsqu’aucun logement ne correspond.
const messageVide = document.getElementById("aucun-resultat");

// Récupère le bouton permettant d’effacer les filtres.
const boutonEffacer = document.getElementById("bouton-effacer");

// Déclare une fonction qui recherche les logements correspondants.
function rechercherLogements() {
    // Lit le budget saisi et le convertit en nombre.
    const budget = Number(champBudget.value);

    // Vérifie si l’utilisateur a laissé le budget vide.
    const budgetVide = champBudget.value === "";

    // Lit la valeur de la zone sélectionnée.
    const zone = champZone.value;

    // Commence le compteur de résultats à zéro.
    let nombreResultats = 0;

    // Parcourt les logements un par un.
    for (const logement of logements) {
        // Lit le prix mensuel enregistré dans l’attribut data-prix.
        const prix = Number(logement.dataset.prix);

        // Lit la zone enregistrée dans l’attribut data-zone.
        const zoneLogement = logement.dataset.zone;

        // Accepte le prix si le budget est vide ou suffisamment élevé.
        const budgetRespecte = budgetVide || prix <= budget;

        // Accepte la zone si "Toutes les zones" est choisi ou si elle correspond.
        const zoneRespectee = zone === "" || zoneLogement === zone;

        // Vérifie que le logement respecte les deux critères.
        if (budgetRespecte && zoneRespectee) {
            // Affiche le logement.
            logement.hidden = false;

            // Ajoute un logement au compteur de résultats.
            nombreResultats = nombreResultats + 1;
        } else {
            // Masque le logement lorsqu’un critère n’est pas respecté.
            logement.hidden = true;
        } // Termine la condition.
    } // Termine la boucle sur les logements.

    // Utilise le singulier lorsqu’un seul logement correspond.
    if (nombreResultats === 1) {
        // Met à jour le titre au singulier.
        titreResultats.textContent = "1 logement trouvé";
    } else {
        // Met à jour le titre pour zéro ou plusieurs logements.
        titreResultats.textContent = nombreResultats + " logements trouvés";
    } // Termine la mise à jour du titre.

    // Masque le message d’absence de résultat lorsqu’il existe des résultats.
    messageVide.hidden = nombreResultats > 0;
} // Termine la fonction de recherche.

// Attend que l’utilisateur soumette le formulaire avec le bouton ou la touche Entrée.
formulaire.addEventListener("submit", function (evenement) {
    // Empêche le formulaire de recharger la page.
    evenement.preventDefault();

    // Lance la recherche avec les critères saisis.
    rechercherLogements();
}); // Termine le traitement de la soumission.

// Attend un clic sur le bouton "Effacer les filtres".
boutonEffacer.addEventListener("click", function () {
    // Rétablit les valeurs initiales du formulaire.
    formulaire.reset();

    // Relance la recherche pour afficher tous les logements.
    rechercherLogements();
}); // Termine le traitement du bouton.