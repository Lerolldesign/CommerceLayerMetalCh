type Locale = {
  [lang: string]: {
    [key: string]: string | { [key: string]: string } | any;
  };
};

const locale: Locale = {
  "en-us": {
    welcomeTo: "Welcome to the",
    addToCart: "Add to cart",
    available: "available",
    notAvailable: "Not available",
    categories: "categories",
    startShopping: "Start shopping",
    learnMore: "Learn more",
    continueShopping: "Continue shopping",
    shoppingBag: "Cart",
    days: "days",
    freeOver: "free over",
    language: "language",
    languages: {
      "en-us": "english",
      "it-it": "italian",
      "fr-fr": "french"
    },
    method: "method",
    outOfStock: "The requested quantity is not available",
    price: "price",
    proceedToCheckout: "Proceed to checkout",
    selectSize: "Select your size",
    shippingTo: "Shipping to",
    yourShoppingCart: "Your shopping cart contains",
    searchTitle: "Find everything instantly",
    sortBy: "Sort by",
    featured: "Featured",
    highestPrice: "Highest price",
    lowestPrice: "Lowest price",
    searchPlaceholder: "Search here...",
    backToAllProducts: "Back to all products",
    reviews: "Reviews",
    total: "Total",
    subTotal: "Subtotal",
    discount: "Discount",
    taxes: "Taxes",
    giftCard: "Gift Card",
    items: "items",
    viewMore: "view more",
    emptyProducts: "No products",
    emptyFilters: "No results found",
    shipping: "Shipping",
    algoliaCategory: "Algolia category"
  },
  "it-it": {
    welcomeTo: "Benvenuto a",
    addToCart: "Aggiungi al carrello",
    available: "disponibile",
    notAvailable: "non disponibile",
    categories: "categorie",
    startShopping: "Inizia a fare acquisti",
    learnMore: "Saperne di più",
    continueShopping: "Continua lo shopping",
    shoppingBag: "Cart",
    days: "giorni",
    freeOver: "gratis oltre",
    language: "lingua",
    languages: {
      "en-us": "inglese",
      "it-it": "italiano",
      "fr-fr": "francese"
    },
    method: "metodo",
    outOfStock: "La quantità richiesta non è disponibile",
    price: "prezzo",
    proceedToCheckout: "Vai al checkout",
    selectSize: "Seleziona la tua taglia",
    shippingTo: "Spedizione",
    yourShoppingCart: "Il tuo carrello contiene",
    searchTitle: "Trova tutto all'istante",
    sortBy: "Ordina per",
    featured: "In evidenza",
    highestPrice: "Prezzo più alto",
    lowestPrice: "Prezzo più basso",
    searchPlaceholder: "Cerca qui...",
    backToAllProducts: "Torna a tutti i prodotti",
    reviews: "Recensioni",
    total: "Totale",
    subTotal: "Totale parziale",
    discount: "Sconto",
    taxes: "Tasse",
    giftCard: "Gift Card",
    items: "prodotti",
    viewMore: "view more",
    shipping: "Spedizione",
    emptyProducts: "Nessun prodotto",
    emptyFilters: "Nessun risultato trovato",
    algoliaCategory: "Algolia categoria"
  },
  "fr-fr": {
    welcomeTo: "Bienvenue à la",
    addToCart: "Ajouter au panier",
    available: "disponible",
    notAvailable: "Pas disponible",
    categories: "catégories",
    startShopping: "Commencer à magasiner",
    learnMore: "Apprendre encore plus",
    continueShopping: "Continuer vos achats",
    shoppingBag: "cart",
    days: "jours",
    freeOver: "libre sur",
    language: "langue",
    languages: {
      "en-us": "anglais",
      "it-it": "italian",
      "fr-fr": "français"
    },
    method: "méthode",
    outOfStock: "La quantité demandée n'est pas disponible",
    price: "prix",
    proceedToCheckout: "Passer à la caisse",
    selectSize: "Select your size",
    shippingTo: "Sélectionnez votre taille",
    yourShoppingCart: "Votre panier contient",
    searchTitle: "Trouvez tout instantanément",
    sortBy: "Trier par",
    featured: "Mis en exergue",
    highestPrice: "Prix le plus élevé",
    lowestPrice: "Prix le plus bas",
    searchPlaceholder: "Cherche ici...",
    backToAllProducts: "Retour à tous les produits",
    reviews: "Commentaires",
    total: "Total",
    subTotal: "Subtotal",
    discount: "Rabais",
    taxes: "Impôts",
    giftCard: "Carte cadeau",
    items: "articles",
    viewMore: "voir plus",
    emptyProducts: "Aucun produit",
    emptyFilters: "Aucun résultat trouvé",
    shipping: "Expédition",
    algoliaCategory: "Algolia catégorie"
  }
};

export default locale;
