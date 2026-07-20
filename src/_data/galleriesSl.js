const galleries = require("./galleries");

const categoryCopy = {
  "award-winning": {
    label: "Nagrajene fotografije",
    description: "Skupni zmagovalki fotografskega natečaja National Geographic Slovenija: Cerkniško polje leta 2022 in Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan) leta 2023."
  },
  "from-above": {
    label: "Iz zraka",
    description: "Kraška polja, gozdovi, mesta in vode iz zračne perspektive."
  },
  "below-ground": {
    label: "Pod zemljo",
    description: "Jame, podzemne reke in svetloba, oblikovana z ekipo."
  },
  "in-flight": {
    label: "Med poletom",
    description: "Jadralno padalstvo, daljni razgledi in gibanje nad pokrajino."
  },
  "after-dark": {
    label: "Po temi",
    description: "Rimska cesta, nevihte, severni sij in pokrajine po sončnem zahodu."
  },
  "water-and-ice": {
    label: "Voda in led",
    description: "Poplavljena kraška polja, reke, sneg in led."
  },
  "land-and-life": {
    label: "Pokrajina in življenje",
    description: "Pokrajine, drevesa, živali in življenje na prostem."
  }
};

const selectedCopy = {
  "Cerkniško polje": { title: "Cerkniško polje", type: "National Geographic Slovenija · 2022" },
  "Enlightened (All Milky Ways Lead to Rakov Škocjan)": { title: "Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan)", type: "National Geographic Slovenija · 2023" },
  "From Above": { title: "Iz zraka", type: "Pogledi iz višin" },
  "Below Ground": { title: "Pod zemljo", type: "Jame in podzemne reke" },
  "In Flight": { title: "Med poletom", type: "Jadralno padalstvo in gibanje" },
  "After Dark": { title: "Po temi", type: "Nočno nebo in nevihte" },
  "Water & Ice": { title: "Voda in led", type: "Poplavljena polja in zima" },
  "Land & Life": { title: "Pokrajina in življenje", type: "Narava in življenje na prostem" }
};

const awardCopy = {
  "20210810-IMG_1621": {
    title: "Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan)",
    titleSl: null,
    award: {
      label: "National Geographic Slovenija · Zmagovalka kategorije Pokrajina in skupna zmagovalka, 2023",
      description: "Fotografija je nastala med meteorskim rojem Perzeidov pri vhodu v Zelške jame pod Malim naravnim mostom v Rakovem Škocjanu. Zmagala je v kategoriji Pokrajina, strokovna žirija pa jo je izbrala tudi za skupno zmagovalko natečaja.",
      archiveUrl: "https://kafol.net/ng/2023.html"
    }
  },
  "20210228-DJI_0270-Pano": {
    title: "Cerkniško polje",
    titleSl: null,
    award: {
      label: "National Geographic Slovenija · Zmagovalka kategorije Od zgoraj in skupna zmagovalka, 2022",
      description: "Zračni posnetek je zmagal v kategoriji Od zgoraj, žirija pa ga je izbrala tudi za skupnega zmagovalca fotografskega natečaja National Geographic Slovenija 2022.",
      story: "Presihajoče Cerkniško jezero je fenomen kraških pojavov, saj voda na krasu običajno ne zastaja. Presihanje je začel preučevati že Valvasor, ki si je zamislil sistem podzemnih jezer. Kot dobra znanstvena fantastika je njegova razlaga začinjena z delčki resnice.",
      archiveUrl: "https://kafol.net/ng/2022.html"
    }
  }
};

const categories = galleries.categories.map((category) => {
  const copy = categoryCopy[category.id];
  return {
    ...category,
    label: copy.label,
    description: copy.description,
    photoCountLabel: category.images.length === 2 ? "2 fotografiji" : `${category.images.length} fotografij`,
    images: category.images.map((image) => {
      const award = awardCopy[image.id];
      const title = award?.title || image.title;
      return {
        ...image,
        ...(award || {}),
        alt: title
          ? `${title}, fotografija Žana Kafola${image.year ? `, ${image.year}` : ""}`
          : `${copy.label}, fotografija Žana Kafola${image.year ? `, ${image.year}` : ""}`
      };
    })
  };
});

const selected = galleries.selected.map((work) => ({
  ...work,
  ...selectedCopy[work.title],
  url: `/sl${work.url}`
}));

module.exports = { categories, selected };
