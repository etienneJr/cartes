# Comment contribuer ?

Merci de prendre le temps de contribuer ! 🎉

Voici une [introduction générale](https://github.com/cartesapp/cartes/issues/334) et une liste de questions sur la contribution au projet.

Aussi, n'oubliez jamais que d'autres sont passés ici avant vous : la section _[issues](https://github.com/cartesapp/cartes/issues)_ contient déjà un tas de problèmes à résoudre et d'informations utiles qui pourraient vous aider à contribuer : utilisez son moteur de recherche.

En conséquence, les instructions de ce guide de contribution ne couvrent qu'une petite partie de la documentation présente sur github via les issues. 

## Comment ajouter une catégorie de recherche de lieux ?

Copiez-collez l'un des blocs dans [categories.yaml](https://github.com/cartesapp/cartes/blob/master/app/categories.yaml) ou [moreCategories.yaml](https://github.com/cartesapp/cartes/blob/master/app/moreCategories.yaml) (les "more" apparaissent seulement au clic sur le gros bouton plus) et changez les attributs.
La partie la plus difficile, c'est l'icône : Maplibre n'accepte pas les icônes SVG, donc nous créons des PNG à la volée et ça implique quelques contraintes. Si vous galérez ou n'êtes pas dev, n'hésitez pas à proposer vos modifications même sans icônes, quelqu'un s'en chargera.

-   le format SVG Inkscape ne marchera pas, il est trop bardé d'attributs inutiles
-   le format Inkscape SVG _simple_ a plus de chances de marcher surtout en ayant converti les objets en chemins
-   encore plus de chances que ça marche en ayant converti les objets et les contours en chemins, et en ayant fusionné toutes les composantes connexes via l'outil de construction de forme booléen d'Inkscape
-  j'ai aussi remarqué que les attributs du style "fill=" dans un <path cassaient l'icône dans Cartes

### À propos de l'ordre des sous-catégories dans une  

On essaie de classer les catégories par ordre d'utilité pour l'utilisateur.

Par exemple, proposer gymnase avant surf me semble cohérent. Le surf est une activité qui concerne moins de gens et à moindre fréquence.

Autre exemple : hôpital avant clinique et avant dentiste, par ordre de priorité.

Après en effet pour ta capture de la catégorie tourisme, c’est moins évident de classer.

L’heuristique n’est pas clairement définie avec une fonction renvoyant un ordre à partir de paramètres statistiques chiffrés, c’est sûr.

À garder en tête également : l'utilité est une notion très vaste, peu définie. Étant donné les fondements du projet Cartes, qui est un **projet politique** d'alternative écologique, il serait tout à fait pertinent de décider de mettre les bornes électriques avant les stations essence, même si ces dernières sont aujourd'hui bien plus utilisées que les premières.

> Cela dit, il sera possible dans le futur de recueillir des chiffres sur l’usage, pour donner une des dimensions du classement. Mais encore une fois, ça me semble moins important que de bosser la découverte de ces catégories via la recherche. Le moteur de recherche est l’interface de base du grand public, avant le catalogue de catégories.


## Comment ajouter un réseau de transport en commun ?

Direction l'[autre dépot](https://github.com/cartesapp/serveur), côté serveur.

---
